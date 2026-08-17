import { site } from "@/data/site";

/**
 * Shared JSX for the Open Graph / Twitter share-card images, rendered through
 * Satori (via `next/og`'s ImageResponse) in `opengraph-image.tsx` and
 * `twitter-image.tsx`. Kept as a plain component, not a route file itself, so
 * both routes can reuse one markup tree instead of duplicating it.
 */
export default function OgImage() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#0b2a4a",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 14,
          fontSize: 96,
          fontWeight: 800,
          letterSpacing: -2,
          textTransform: "uppercase",
        }}
      >
        <span style={{ color: "#ffffff" }}>{site.wordmark.lead}</span>
        <span style={{ color: "#00a8e8", fontWeight: 500, letterSpacing: 6 }}>
          {site.wordmark.trail}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          marginTop: 28,
          fontSize: 32,
          color: "rgba(255,255,255,0.7)",
        }}
      >
        {site.tagline}
      </div>

      <div
        style={{
          display: "flex",
          marginTop: 44,
          height: 4,
          width: 140,
          background: "#00a8e8",
          borderRadius: 2,
        }}
      />
    </div>
  );
}
