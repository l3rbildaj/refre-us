import Link from "next/link";
import { site } from "@/data/site";

/**
 * Type-only wordmark, standing in until the real logo asset is supplied.
 * Swap the inner markup for an <Image> and the rest of the site keeps working.
 */
const sizes = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-3xl",
  xl: "text-4xl",
};

export function Wordmark({ size = "md", tone = "dark", className = "" }) {
  const lead = tone === "light" ? "text-white" : "text-brand-navy";
  const trail = tone === "light" ? "text-brand-ice" : "text-brand-cyan";

  return (
    <span
      className={`font-display inline-flex items-baseline gap-1.5 leading-none uppercase ${sizes[size]} ${className}`}
    >
      <span className={`font-extrabold tracking-tight ${lead}`}>
        {site.wordmark.lead}
      </span>
      <span className={`font-medium tracking-[0.2em] ${trail}`}>
        {site.wordmark.trail}
      </span>
    </span>
  );
}

export default function Logo({ size = "md", tone = "dark", className = "" }) {
  return (
    <Link href="/" aria-label={`${site.name} — home`} className={className}>
      <Wordmark size={size} tone={tone} />
    </Link>
  );
}
