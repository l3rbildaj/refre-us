import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/**
 * Shared shell for legal/policy pages. Server component — nothing here needs
 * client interactivity, so it doesn't ship JS to the browser.
 */
export default function PolicyLayout({ title, updated, children }) {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="mx-auto max-w-3xl px-4 pt-8 sm:px-6">
        <Link
          href="/"
          className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-brand-navy"
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-1"
          />
          Back to home
        </Link>

        <div className="rounded-2xl border border-gray-200 bg-white p-8 sm:p-12">
          <header className="mb-10 border-b border-gray-100 pb-8">
            <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight text-brand-navy sm:text-4xl">
              {title}
            </h1>
            {updated && (
              <p className="mt-3 text-sm text-gray-500">
                Last updated {updated}
              </p>
            )}
          </header>

          <div className="policy-content">{children}</div>
        </div>
      </div>
    </div>
  );
}
