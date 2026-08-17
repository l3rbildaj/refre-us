import { ImageResponse } from "next/og";
import OgImage from "@/components/OgImage";
import { site } from "@/data/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(<OgImage />, { ...size });
}
