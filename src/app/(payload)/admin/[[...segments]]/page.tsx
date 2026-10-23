import type { Metadata } from "next";
import config from "@payload-config";
import { RootPage, generatePageMetadata } from "@payloadcms/next/views";
import { importMap } from "../importMap.js";

type Args = {
  params: Promise<{ segments: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] }>;
};

export const generateMetadata = ({ params, searchParams }: Args): Promise<Metadata> =>
  generatePageMetadata({ config, params, searchParams });

async function Page({ params, searchParams }: Args) {
  try {
    return await RootPage({ config, params, searchParams, importMap });
  } catch (err) {
    const e = err as Error;
    // Expose full server-side error in dev-style panel so we can diagnose
    return (
      <html>
        <body style={{ fontFamily: "monospace", background: "#0d0d0d", color: "#ff6b6b", padding: "2rem" }}>
          <h1>🔴 Admin RSC Crash (Server-Side)</h1>
          <p><strong>Name:</strong> {e.name}</p>
          <p><strong>Message:</strong> {e.message}</p>
          <pre style={{ background: "#1a1a1a", padding: "1rem", whiteSpace: "pre-wrap", wordBreak: "break-all", fontSize: "12px", color: "#ffd700" }}>
            {e.stack}
          </pre>
          <h2>Env</h2>
          <pre style={{ background: "#1a1a1a", padding: "1rem", fontSize: "12px", color: "#98fb98" }}>
            {JSON.stringify({
              NODE_ENV: process.env.NODE_ENV,
              DATABASE_URL: process.env.DATABASE_URL ? "SET" : "MISSING",
              PAYLOAD_SECRET: process.env.PAYLOAD_SECRET ? "SET" : "MISSING",
              NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL || "(not set)",
              PAYLOAD_PUBLIC_SERVER_URL: process.env.PAYLOAD_PUBLIC_SERVER_URL || "(not set)",
            }, null, 2)}
          </pre>
        </body>
      </html>
    );
  }
}

export default Page;
