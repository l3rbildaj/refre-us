"use client";
import { ProductInfoCard } from "@/components/ProductSection";
import ProductGallery from "@/components/ProductSection";

/**
 * ProductSectionVariant – renders the full ProductSection layout
 * but overrides bundles + checkout URLs for split testing.
 */
export default function ProductSectionVariant({ bundleConfig, checkoutUrls }) {
  // We re-export the default export (ProductSection) and inject props into
  // the inner ProductInfoCard via context trick isn't needed — instead
  // we directly render the named export ProductInfoCard with props.
  // The gallery stays the same.
  return <ProductInfoCard bundleConfig={bundleConfig} checkoutUrls={checkoutUrls} />;
}
