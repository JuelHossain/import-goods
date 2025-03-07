import ProductDetailClient, { products } from './ProductDetailClient';

/**
 * Generate static paths for all product IDs
 */
export function generateStaticParams() {
  // Return an array of objects with the id parameter
  return products.map((product) => ({
    id: product.id,
  }));
}

/**
 * Server component that renders the client component
 */
export default function ProductPage() {
  return <ProductDetailClient />;
}
