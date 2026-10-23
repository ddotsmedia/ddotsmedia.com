import fs from "fs";
import path from "path";

export async function register() {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const onRequestError = async (err: any, request: any, context: any) => {
  // Capture ALL errors (no URL filter — request.path/url varies by Next.js version)
  const entry = {
    ts: new Date().toISOString(),
    path: request?.path ?? request?.url ?? "(unknown)",
    method: request?.method,
    digest: err?.digest,
    name: err?.name,
    message: err?.message,
    stack: err?.stack,
    context,
  };
  const logFile = path.join("/tmp", "admin-error.json");
  try {
    fs.writeFileSync(logFile, JSON.stringify(entry, null, 2));
  } catch {
    // no-op if /tmp not writable
  }
};
