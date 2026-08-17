import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import productsData from '@/data/products.json';
import ProductSection from '@/components/ProductSection';
import { refrigerantMeta } from '@/data/refrigerant-meta';

export async function generateStaticParams() {
  return productsData.map((product) => ({
    slug: product.slug,
  }));
}

const findProduct = (slug: string) =>
  productsData.find((p) => p.slug === slug);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = findProduct(slug);

  if (!product) return { title: 'Product not found' };

  const meta = refrigerantMeta[slug as keyof typeof refrigerantMeta];

  // Lead the meta description with the product's own copy (trimmed to a
  // sensible SERP length) rather than a template, so each page reads distinctly.
  const lead = meta?.description
    ? meta.description.split(". ").slice(0, 2).join(". ")
    : meta?.application;
  const description = lead
    ? `${lead} Factory-direct with free US shipping and volume pricing up to 20% off.`
    : `${product.product_name} — factory-direct refrigerant with free US shipping.`;

  return {
    title: product.product_name,
    description,
    openGraph: {
      title: product.product_name,
      description,
      images: [{ url: product.local_image }],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = findProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <ProductSection product={product} />
    </main>
  );
}
