/**
 * Centralized mock products data for the Import Goods application
 * Used across various pages including home page, product listings, and admin dashboard
 */

export interface Product {
  id: string | number;
  name: string;
  merchant: string;
  price: number;
  category: string;
  image?: string;
  images?: string[];
  featured: boolean;
  inStock: boolean;
  description: string;
  features?: string[];
  specifications?: Record<string, string>;
  rating?: number;
  reviewCount?: number;
  origin: string;
  shippingTime?: string;
  shippingEstimate?: string;
  stock?: number;
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Handcrafted Leather Bag',
    merchant: 'Italian Leatherworks',
    price: 299.99,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ],
    featured: true,
    inStock: true,
    description: 'Handcrafted from premium Italian leather, this elegant bag combines timeless design with exceptional craftsmanship. Perfect for both casual and formal occasions.',
    features: [
      'Genuine Italian leather',
      'Handcrafted by skilled artisans',
      'Durable brass hardware',
      'Water-resistant lining',
      'Adjustable shoulder strap',
      'Interior pockets for organization',
    ],
    specifications: {
      'Dimensions': '12" x 16" x 4"',
      'Weight': '2.5 lbs',
      'Material': 'Full-grain Italian leather',
      'Color': 'Cognac brown',
      'Warranty': '2-year manufacturer warranty',
    },
    rating: 4.8,
    reviewCount: 42,
    origin: 'Italy',
    shippingTime: '2-3 weeks',
    shippingEstimate: '3-5 business days',
    stock: 24,
  },
  {
    id: '2',
    name: 'Premium Coffee Beans',
    merchant: 'Colombian Harvest',
    price: 49.99,
    category: 'Food & Beverage',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    images: [
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ],
    featured: true,
    inStock: true,
    description: 'Sourced from the highlands of Colombia, these premium coffee beans offer a rich, aromatic experience with notes of chocolate and citrus.',
    features: [
      'Single-origin Colombian beans',
      'Ethically sourced and fair trade certified',
      'Medium-dark roast',
      'Notes of chocolate, caramel, and citrus',
      'Whole beans for maximum freshness',
      'Resealable packaging',
    ],
    specifications: {
      'Weight': '1 lb (454g)',
      'Roast Level': 'Medium-dark',
      'Process': 'Washed',
      'Altitude': '1,700-2,000 meters',
      'Harvest': 'Current season',
    },
    rating: 4.9,
    reviewCount: 87,
    origin: 'Colombia',
    shippingTime: '1-2 weeks',
    shippingEstimate: '5-7 business days',
    stock: 156,
  },
  {
    id: '3',
    name: 'Ceramic Dining Set',
    merchant: 'Japanese Artisans',
    price: 189.99,
    category: 'Home Goods',
    image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    images: [
      'https://images.unsplash.com/photo-1577140917170-285929fb55b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1577140917170-285929fb55b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1577140917170-285929fb55b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ],
    featured: true,
    inStock: true,
    description: 'This exquisite ceramic dining set is handcrafted by master artisans in Japan. Each piece showcases traditional techniques with a modern aesthetic.',
    features: [
      'Handcrafted ceramic pieces',
      'Traditional Japanese design',
      'Microwave and dishwasher safe',
      'Service for 4 people',
      'Includes dinner plates, salad plates, and bowls',
      'Elegant matte finish',
    ],
    specifications: {
      'Material': 'High-fired ceramic',
      'Pieces': '12-piece set (4 dinner plates, 4 salad plates, 4 bowls)',
      'Dimensions': 'Dinner plates: 10.5", Salad plates: 8", Bowls: 6" diameter',
      'Care': 'Dishwasher and microwave safe',
      'Color': 'Natural off-white with navy accents',
    },
    rating: 4.7,
    reviewCount: 35,
    origin: 'Japan',
    shippingTime: '3-4 weeks',
    shippingEstimate: '2-3 weeks',
    stock: 42,
  },
  {
    id: '4',
    name: 'Organic Olive Oil',
    merchant: 'Greek Farms',
    price: 24.99,
    category: 'Food & Beverage',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    images: [
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ],
    featured: false,
    inStock: true,
    description: 'Cold-pressed from organically grown olives in the sun-drenched groves of Greece. This extra virgin olive oil delivers exceptional flavor and health benefits.',
    features: [
      'Extra virgin, first cold press',
      'Organic certified',
      'Low acidity (< 0.3%)',
      'Rich in polyphenols and antioxidants',
      'Harvested and bottled in Greece',
      'Glass bottle to preserve flavor',
    ],
    specifications: {
      'Size': '500ml (16.9 fl oz)',
      'Acidity': 'Less than 0.3%',
      'Process': 'Cold extraction',
      'Certification': 'USDA Organic, EU Organic',
      'Harvest Date': 'Current season',
      'Best By': '18 months from production',
    },
    rating: 4.6,
    reviewCount: 62,
    origin: 'Greece',
    shippingTime: '1-2 weeks',
    shippingEstimate: '7-10 business days',
    stock: 78,
  },
  {
    id: '5',
    name: 'Handwoven Carpet',
    merchant: 'Persian Artisans',
    price: 599.99,
    category: 'Home Goods',
    image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    images: [
      'https://images.unsplash.com/photo-1581539250439-c96689b516dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581539250439-c96689b516dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581539250439-c96689b516dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ],
    featured: false,
    inStock: true,
    description: 'This handwoven carpet from Iran showcases centuries-old weaving traditions. Each piece is unique, featuring intricate patterns and vibrant natural dyes.',
    features: [
      'Handwoven by skilled artisans',
      'Made with natural wool',
      'Vegetable-based dyes',
      'Intricate traditional patterns',
      'Durable and long-lasting construction',
      'Certificate of authenticity included',
    ],
    specifications: {
      'Size': '5\' x 7\' (150cm x 210cm)',
      'Material': '100% natural wool',
      'Knot Density': 'Approximately 150 knots per square inch',
      'Pattern': 'Traditional Persian floral medallion',
      'Colors': 'Deep red, navy, ivory, and gold',
      'Age': 'New production using traditional methods',
    },
    rating: 4.9,
    reviewCount: 28,
    origin: 'Iran',
    shippingTime: '4-6 weeks',
    shippingEstimate: '3-4 weeks',
    stock: 15,
  },
  {
    id: '6',
    name: 'Artisanal Ceramic Vase',
    merchant: 'Portuguese Crafters',
    price: 89.99,
    category: 'Home Decor',
    image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    images: [
      'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ],
    featured: false,
    inStock: true,
    description: 'This handcrafted ceramic vase is made by artisans in Portugal using traditional techniques passed down through generations.',
    features: [
      'Handcrafted ceramic',
      'Traditional Portuguese design',
      'Glazed interior for water-tightness',
      'Unique hand-painted details',
      'Suitable for fresh or dried flowers',
      'Makes an excellent decorative piece',
    ],
    specifications: {
      'Height': '12 inches (30 cm)',
      'Diameter': '6 inches (15 cm)',
      'Material': 'Glazed ceramic',
      'Color': 'Blue and white pattern',
      'Care': 'Hand wash only, not dishwasher safe',
    },
    rating: 4.5,
    reviewCount: 32,
    origin: 'Portugal',
    shippingTime: '2-3 weeks',
    shippingEstimate: '10-14 business days',
    stock: 42,
  },
];

// Helper functions to work with mock products
export const getFeaturedProducts = (): Product[] => {
  return mockProducts.filter(product => product.featured);
};

export const getProductById = (id: string | number): Product | undefined => {
  return mockProducts.find(product => product.id.toString() === id.toString());
};

export const getProductsByCategory = (category: string): Product[] => {
  return category.toLowerCase() === 'all' 
    ? mockProducts 
    : mockProducts.filter(product => 
        product.category.toLowerCase().includes(category.toLowerCase())
      );
};
