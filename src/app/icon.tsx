import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// "TC" monogram, standing in for the real logo mark the same way the header
// wordmark does — swap this for an image-file `icon.png` once the brand
// logo lands, no other metadata wiring needs to change.
export default function Icon() {
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
          borderRadius: 7,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: -0.5,
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
