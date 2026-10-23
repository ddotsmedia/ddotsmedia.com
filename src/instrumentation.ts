import fs from "fs";
import path from "path";

export async function register() {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const onRequestError = async (err: any, request: any, context: any) => {
  const url: string = request?.url ?? "";
  if (!url.includes("/admin")) return;
  const entry = {
    ts: new Date().toISOString(),
    url,
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
