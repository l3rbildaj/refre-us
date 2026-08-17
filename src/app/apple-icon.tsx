import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// No border-radius: iOS applies its own corner mask to apple-touch-icons,
// so a solid square renders correctly on every home-screen icon shape.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b2a4a",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 92,
            fontWeight: 800,
            letterSpacing: -3,
          }}
        >
          <span style={{ color: "#ffffff" }}>T</span>
          <span style={{ color: "#00a8e8" }}>C</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
