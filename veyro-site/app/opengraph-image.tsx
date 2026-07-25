import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social share card, rendered at build time.
 * Drawn with primitives only — no webfont fetch, so it can never fail
 * to render because a font server was slow.
 */
export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FBF7F0",
          padding: 72,
          fontFamily: "Segoe UI, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -140,
            right: -80,
            width: 640,
            height: 460,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(217,130,43,0.35) 0%, rgba(217,130,43,0) 70%)",
          }}
        />

        <svg width="76" height="76" viewBox="0 0 100 100" fill="none">
          <path d="M10 22 L44 76 L90 10" stroke="#13223A" strokeWidth="11" />
          <path d="M74.8 31.8 L90 10" stroke="#D9822B" strokeWidth="11" />
        </svg>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              color: "#13223A",
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            Websites for local businesses,
          </div>
          <div
            style={{
              display: "flex",
              gap: 16,
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            <span style={{ color: "#13223A" }}>from</span>
            <span style={{ color: "#8F5210" }}>£99 a month.</span>
          </div>
          <div style={{ marginTop: 22, fontSize: 27, color: "#4C5F7D" }}>
            No big bill upfront. Live in about two weeks.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "2px solid #E2D8C6",
            paddingTop: 26,
            fontSize: 23,
            color: "#566A88",
          }}
        >
          <span style={{ fontWeight: 700, color: "#13223A" }}>{site.name}</span>
          <span>Wideopen · Gosforth · Killingworth</span>
          <span>{site.phone}</span>
        </div>
      </div>
    ),
    size
  );
}
