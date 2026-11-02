"use client";

import { useEffect } from "react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin error:", error);
  }, [error]);

  return (
    <div style={{ fontFamily: "monospace", padding: "2rem", background: "#1a1a2e", color: "#e94560", minHeight: "100vh" }}>
      <h1>⚠ Admin Error (Debug Mode)</h1>
      <p style={{ color: "#ccc" }}>Digest: {error.digest}</p>
      <pre style={{
        background: "#16213e",
        padding: "1rem",
        borderRadius: "8px",
        whiteSpace: "pre-wrap",
        wordBreak: "break-all",
        fontSize: "12px",
        color: "#a8dadc",
      }}>
        {error.name}: {error.message}
        {"\n\n"}
        {error.stack}
      </pre>
      <button onClick={reset} style={{ marginTop: "1rem", padding: "0.5rem 1rem", cursor: "pointer" }}>
        Try again
      </button>
    </div>
  );
}
