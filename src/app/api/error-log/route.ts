import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export function GET() {
  const logFile = path.join("/tmp", "admin-error.json");
  try {
    const data = fs.readFileSync(logFile, "utf8");
    return NextResponse.json(JSON.parse(data));
  } catch {
    return NextResponse.json({ error: "No error log found yet. Visit /admin to trigger a crash first." });
  }
}
