import { Resend } from "resend";

export type ContactSubmission = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

/** Minimal HTML escape so user input can't break/inject into the email markup. */
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Send a contact-form submission via Resend.
 * Safe fallback: if RESEND_API_KEY is unset, log the submission and report
 * success (dev/unconfigured) — never throws, never crashes the request.
 */
export async function sendContactEmail(data: ContactSubmission): Promise<{ success: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("[contact] RESEND_API_KEY unset — submission logged (not emailed):", data);
    return { success: true };
  }

  const to = process.env.ADMIN_EMAIL || "hello@ddotsmedia.com";
  const from = process.env.RESEND_FROM || "Ddotsmedia <noreply@ddotsmedia.com>";

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `New enquiry — ${data.service || "General"} — ${data.name}`,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${esc(data.name)}</p>
        <p><strong>Email:</strong> ${esc(data.email)}</p>
        <p><strong>Phone:</strong> ${esc(data.phone) || "—"}</p>
        <p><strong>Service:</strong> ${esc(data.service) || "—"}</p>
        <p><strong>Message:</strong></p>
        <p>${esc(data.message).replace(/\n/g, "<br/>")}</p>
      `,
    });
    if (error) {
      console.error("[contact] Resend error:", error);
      return { success: false };
    }
    return { success: true };
  } catch (err) {
    console.error("[contact] Resend threw:", err);
    return { success: false };
  }
}
