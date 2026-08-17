"use client";

import { useState, useCallback } from "react";
import ProductGallery from "@/components/product/ProductGallery";
import ProductBuyBox from "@/components/product/ProductBuyBox";
import GuaranteeBanner from "@/components/product/GuaranteeBanner";
import ProductDescription from "@/components/product/ProductDescription";
import WhatsIncluded from "@/components/product/WhatsIncluded";
import CompatibleSystems from "@/components/product/CompatibleSystems";
import SpecsTable from "@/components/product/SpecsTable";
import ShippingReturns from "@/components/product/ShippingReturns";
import CompareGrades from "@/components/product/CompareGrades";
import HowItWorks from "@/components/product/HowItWorks";
import ProductFaq from "@/components/product/ProductFaq";
import BulkCta from "@/components/product/BulkCta";
import RelatedProducts from "@/components/product/RelatedProducts";
import StickyBuyBar from "@/components/product/StickyBuyBar";

export default function ProductSection({ product }) {
  // Selected tier is lifted here so the sticky bar mirrors the buy box exactly.
  const [tier, setTier] = useState(null);
  const handleQtyChange = useCallback((next) => setTier(next), []);

  if (!product) return null;

  return (
    <section className="w-full bg-gray-50 pb-24 lg:pb-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:gap-10 lg:py-10">
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-10">
          <div className="lg:sticky lg:top-24">
            <ProductGallery product={product} />
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white">
            <ProductBuyBox product={product} onQtyChange={handleQtyChange} />
          </div>
        </div>

        <GuaranteeBanner />

        <ProductDescription product={product} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <CompatibleSystems product={product} />
          <WhatsIncluded product={product} />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <SpecsTable product={product} />
          <ShippingReturns product={product} />
        </div>

        <CompareGrades product={product} />
        <HowItWorks />
        <ProductFaq product={product} />
        <BulkCta />
        <RelatedProducts product={product} />
      </div>

      <StickyBuyBar product={product} tier={tier} />
    </section>
  );
}
