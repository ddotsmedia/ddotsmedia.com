import fs from "fs";
import path from "path";

export const onRequestError: import("next").Instrumentation["onRequestError"] =
  async (err, request, context) => {
    // Only capture admin route errors
    const url = (request as unknown as { url?: string }).url ?? "";
    if (!url.includes("/admin")) return;

    const entry = {
      ts: new Date().toISOString(),
      url,
      digest: (err as unknown as { digest?: string }).digest,
      name: (err as Error).name,
      message: (err as Error).message,
      stack: (err as Error).stack,
      context,
    };

    const logFile = path.join("/tmp", "admin-error.json");
    try {
      fs.writeFileSync(logFile, JSON.stringify(entry, null, 2));
    } catch {
      // no-op if /tmp not writable
    }
  };

export async function register() {}
