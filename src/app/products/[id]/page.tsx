import ProductDetailClient from './client';
import { mockProducts } from '@/data/mock/products';

/**
 * Generate static paths for all product IDs
 */
export function generateStaticParams() {
  // Return an array of objects with the id parameter
  return mockProducts.map((product) => ({
    id: product.id.toString(),
  }));
}

/**
 * Server component that renders the client component
 */
export default function ProductPage() {
  return <ProductDetailClient />;
}