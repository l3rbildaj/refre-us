'use client';

import { usePathname } from 'next/navigation';
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CrispChat from "@/components/CrispChat";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const isCheckout = pathname === '/checkout';
  const isSuccess = pathname === '/success';

  if (isCheckout || isSuccess) {
    return (
      <>
        {/* On checkout, just render the main content without header/footer */}
        <main className="flex-1">{children}</main>
      </>
    );
  }

  return (
    <>
      <CrispChat />
      <AnnouncementBar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
