"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function RouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== "undefined" && window.ttq) {
      // Small delay to ensure the pixel base code has initialized
      setTimeout(() => {
        window.ttq.page();
      }, 100);
    }
  }, [pathname, searchParams]);

  return null;
}

export default function TiktokRouteChange() {
  return (
    <Suspense fallback={null}>
      <RouteTracker />
    </Suspense>
  );
}
