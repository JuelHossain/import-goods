/**
 * Service layer for product-related operations
 * Acts as a bridge between UI components and data sources (Supabase or mock data)
 */

import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { 
  mockProducts, 
  getProductById, 
  getProductsByCategory,
  getFeaturedProducts
} from '@/data/mock/products';
import { Product } from '@/data/mock/products';

/**
 * Fetch all products
 */
export async function getAllProducts(): Promise<Product[]> {
  try {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('products')
        .select('*');
      
      if (error) throw error;
      return data as unknown as Product[];
    } else {
      // Use mock data when Supabase is not configured
      return mockProducts;
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    // Fallback to mock data in case of error
    return mockProducts;
  }
}

/**
 * Fetch product by ID
 */
export async function fetchProductById(id: string | number): Promise<Product | null> {
  try {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as unknown as Product;
    } else {
      // Use mock data when Supabase is not configured
      return getProductById(id) || null;
    }
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    // Fallback to mock data in case of error
    return getProductById(id) || null;
  }
}

/**
 * Fetch products by category
 */
export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  try {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category);
      
      if (error) throw error;
      return data as unknown as Product[];
    } else {
      // Use mock data when Supabase is not configured
      return getProductsByCategory(category);
    }
  } catch (error) {
    console.error(`Error fetching products in category ${category}:`, error);
    // Fallback to mock data in case of error
    return getProductsByCategory(category);
  }
}

/**
 * Fetch featured products
 */
export async function fetchFeaturedProducts(): Promise<Product[]> {
  try {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('featured', true);
      
      if (error) throw error;
      return data as unknown as Product[];
    } else {
      // Use mock data when Supabase is not configured
      return getFeaturedProducts();
    }
  } catch (error) {
    console.error('Error fetching featured products:', error);
    // Fallback to mock data in case of error
    return getFeaturedProducts();
  }
}

/**
 * Create a new product
 */
export async function createProduct(product: Omit<Product, 'id'>): Promise<Product | null> {
  try {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select()
        .single();
      
      if (error) throw error;
      return data as unknown as Product;
    } else {
      // In mock mode, we would normally add to the mock array
      // But since we can't mutate the imports, we'll just return the product with a mock ID
      const mockId = (Math.max(...mockProducts.map(p => Number(p.id))) + 1).toString();
      return { ...product, id: mockId } as Product;
    }
  } catch (error) {
    console.error('Error creating product:', error);
    return null;
  }
}

/**
 * Update an existing product
 */
export async function updateProduct(id: string | number, updates: Partial<Product>): Promise<Product | null> {
  try {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as unknown as Product;
    } else {
      // In mock mode, we would normally update the mock array
      // But since we can't mutate the imports, we'll just return the updated product
      const product = getProductById(id);
      if (!product) return null;
      return { ...product, ...updates };
    }
  } catch (error) {
    console.error(`Error updating product ${id}:`, error);
    return null;
  }
}

/**
 * Delete a product
 */
export async function deleteProduct(id: string | number): Promise<boolean> {
  try {
    if (isSupabaseConfigured()) {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return true;
    } else {
      // In mock mode, we would normally remove from the mock array
      // But since we can't mutate the imports, we'll just return success
      return true;
    }
  } catch (error) {
    console.error(`Error deleting product ${id}:`, error);
    return false;
  }
}
