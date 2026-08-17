import Image from "next/image";
import { ShieldCheck, Truck, PackageCheck } from "lucide-react";
import { refrigerantMeta } from "@/data/refrigerant-meta";

const strip = [
  { icon: Truck, label: "Free US shipping" },
  { icon: ShieldCheck, label: "90-day guarantee" },
  { icon: PackageCheck, label: "DOT-certified" },
];

export default function ProductGallery({ product }) {
  const meta = refrigerantMeta[product.slug] ?? {};

  return (
    <div className="flex flex-col gap-4">
      <div className="relative flex items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 sm:p-12">
        {product.discount && (
          <span className="absolute left-4 top-4 rounded-md bg-brand-amber px-2.5 py-1.5 text-xs font-bold text-white">
            −{product.discount}
          </span>
        )}
        {meta.safety && (
          <span
            className={`absolute right-4 top-4 rounded-md px-2.5 py-1.5 text-xs font-bold ${
              meta.safety === "A2L"
                ? "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {meta.safety}
          </span>
        )}

        <Image
          src={product.local_image}
          alt={product.product_name}
          width={560}
          height={560}
          priority
          className="h-auto w-full max-w-[380px] object-contain"
        />
      </div>

      <div className="grid grid-cols-3 gap-2">
        {strip.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-2 py-3 text-center"
          >
            <Icon size={17} className="text-brand-cyan" />
            <span className="text-[11px] font-semibold leading-tight text-gray-600">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
