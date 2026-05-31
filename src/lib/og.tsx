import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/** Shared branded OG image. Used by project + post opengraph-image routes. */
export function renderOg(opts: { eyebrow: string; title: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a1626",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ width: 28, height: 28, borderRadius: 999, background: "#2a9aa4" }} />
          <div style={{ width: 28, height: 28, borderRadius: 999, background: "#f5c842" }} />
          <div style={{ width: 28, height: 28, borderRadius: 999, background: "#f07c3a" }} />
          <div style={{ width: 28, height: 28, borderRadius: 999, background: "#4caf7d" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#2a9aa4", fontSize: 28, fontWeight: 600, letterSpacing: 4, textTransform: "uppercase" }}>
            {opts.eyebrow}
          </div>
          <div style={{ color: "white", fontSize: 64, fontWeight: 700, marginTop: 16, lineHeight: 1.1 }}>
            {opts.title}
          </div>
        </div>
        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 28 }}>Ddotsmedia IT Solutions</div>
      </div>
    ),
    ogSize,
  );
}
