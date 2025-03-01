/**
 * Centralized mock categories and collections data for the Import Goods application
 * Used across various pages including homepage, category pages, and navigation
 */

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  featured?: boolean;
  parentId?: string;
  subcategories?: Category[];
  productCount?: number;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  featured: boolean;
  productIds: string[];
  startDate?: string;
  endDate?: string;
}

// Mock categories data
const mockCategories: Category[] = [
  {
    id: 'cat-1',
    name: 'Home & Decor',
    slug: 'home-decor',
    description: 'Beautiful artisanal items for your home from around the world',
    image: '/images/categories/home-decor.jpg',
    featured: true,
    productCount: 24,
    subcategories: [
      {
        id: 'cat-1-1',
        name: 'Textiles',
        slug: 'textiles',
        description: 'Handwoven rugs, blankets, and fabrics',
        image: '/images/categories/textiles.jpg',
        parentId: 'cat-1',
        productCount: 8
      },
      {
        id: 'cat-1-2',
        name: 'Ceramics',
        slug: 'ceramics',
        description: 'Handcrafted pottery, dishware, and decorative items',
        image: '/images/categories/ceramics.jpg',
        parentId: 'cat-1',
        productCount: 10
      },
      {
        id: 'cat-1-3',
        name: 'Artwork',
        slug: 'artwork',
        description: 'Original paintings, prints, and sculptures',
        image: '/images/categories/artwork.jpg',
        parentId: 'cat-1',
        productCount: 6
      }
    ]
  },
  {
    id: 'cat-2',
    name: 'Food & Beverages',
    slug: 'food-beverages',
    description: 'Gourmet ingredients and specialty foods from global producers',
    image: '/images/categories/food-beverages.jpg',
    featured: true,
    productCount: 18,
    subcategories: [
      {
        id: 'cat-2-1',
        name: 'Coffee & Tea',
        slug: 'coffee-tea',
        description: 'Premium coffee beans and exotic teas',
        image: '/images/categories/coffee-tea.jpg',
        parentId: 'cat-2',
        productCount: 7
      },
      {
        id: 'cat-2-2',
        name: 'Oils & Vinegars',
        slug: 'oils-vinegars',
        description: 'Artisanal olive oils and specialty vinegars',
        image: '/images/categories/oils-vinegars.jpg',
        parentId: 'cat-2',
        productCount: 5
      },
      {
        id: 'cat-2-3',
        name: 'Spices & Seasonings',
        slug: 'spices-seasonings',
        description: 'Rare and exotic spices from around the world',
        image: '/images/categories/spices-seasonings.jpg',
        parentId: 'cat-2',
        productCount: 6
      }
    ]
  },
  {
    id: 'cat-3',
    name: 'Fashion & Accessories',
    slug: 'fashion-accessories',
    description: 'Unique fashion items and accessories from global artisans',
    image: '/images/categories/fashion-accessories.jpg',
    featured: true,
    productCount: 20,
    subcategories: [
      {
        id: 'cat-3-1',
        name: 'Bags & Leather Goods',
        slug: 'bags-leather-goods',
        description: 'Handcrafted bags, wallets, and other leather items',
        image: '/images/categories/bags-leather.jpg',
        parentId: 'cat-3',
        productCount: 8
      },
      {
        id: 'cat-3-2',
        name: 'Jewelry',
        slug: 'jewelry',
        description: 'Artisanal jewelry from global craftspeople',
        image: '/images/categories/jewelry.jpg',
        parentId: 'cat-3',
        productCount: 12
      }
    ]
  },
  {
    id: 'cat-4',
    name: 'Wellness',
    slug: 'wellness',
    description: 'Natural wellness products from traditional producers',
    image: '/images/categories/wellness.jpg',
    featured: false,
    productCount: 15,
    subcategories: [
      {
        id: 'cat-4-1',
        name: 'Skincare',
        slug: 'skincare',
        description: 'Natural skincare products from global traditions',
        image: '/images/categories/skincare.jpg',
        parentId: 'cat-4',
        productCount: 8
      },
      {
        id: 'cat-4-2',
        name: 'Aromatherapy',
        slug: 'aromatherapy',
        description: 'Essential oils and aromatherapy products',
        image: '/images/categories/aromatherapy.jpg',
        parentId: 'cat-4',
        productCount: 7
      }
    ]
  }
];

// Mock collections data
const mockCollections: Collection[] = [
  {
    id: 'col-1',
    name: 'Summer Essentials',
    slug: 'summer-essentials',
    description: 'Our curated selection of essential summer items from around the world',
    image: '/images/collections/summer-essentials.jpg',
    featured: true,
    productIds: ['1', '4', '6', '8'],
    startDate: '2023-05-01',
    endDate: '2023-08-31'
  },
  {
    id: 'col-2',
    name: 'Artisan Spotlight',
    slug: 'artisan-spotlight',
    description: 'Highlighting exceptional craftsmanship from our community of global artisans',
    image: '/images/collections/artisan-spotlight.jpg',
    featured: true,
    productIds: ['1', '3', '5', '7', '9']
  },
  {
    id: 'col-3',
    name: 'Sustainable Living',
    slug: 'sustainable-living',
    description: 'Eco-friendly and sustainably produced goods for a more conscious lifestyle',
    image: '/images/collections/sustainable-living.jpg',
    featured: false,
    productIds: ['2', '5', '10', '12']
  },
  {
    id: 'col-4',
    name: 'New Arrivals',
    slug: 'new-arrivals',
    description: 'Our latest imports and newest products',
    image: '/images/collections/new-arrivals.jpg',
    featured: true,
    productIds: ['8', '9', '10', '11']
  },
  {
    id: 'col-5',
    name: 'Holiday Gift Guide',
    slug: 'holiday-gift-guide',
    description: 'Perfect gift ideas for the holiday season from around the world',
    image: '/images/collections/holiday-gift-guide.jpg',
    featured: false,
    productIds: ['1', '2', '6', '7', '11'],
    startDate: '2023-11-01',
    endDate: '2023-12-31'
  }
];

// Helper functions
export const getCategoryById = (id: string): Category | undefined => {
  for (const category of mockCategories) {
    if (category.id === id) return category;
    if (category.subcategories) {
      const subcategory = category.subcategories.find(sub => sub.id === id);
      if (subcategory) return subcategory;
    }
  }
  return undefined;
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
  for (const category of mockCategories) {
    if (category.slug === slug) return category;
    if (category.subcategories) {
      const subcategory = category.subcategories.find(sub => sub.slug === slug);
      if (subcategory) return subcategory;
    }
  }
  return undefined;
};

export const getFeaturedCategories = (): Category[] => {
  return mockCategories.filter(category => category.featured);
};

export const getCollectionById = (id: string): Collection | undefined => {
  return mockCollections.find(collection => collection.id === id);
};

export const getCollectionBySlug = (slug: string): Collection | undefined => {
  return mockCollections.find(collection => collection.slug === slug);
};

export const getFeaturedCollections = (): Collection[] => {
  return mockCollections.filter(collection => collection.featured);
};

export const getActiveCollections = (): Collection[] => {
  const now = new Date();
  
  return mockCollections.filter(collection => {
    // If no dates specified, collection is always active
    if (!collection.startDate && !collection.endDate) return true;
    
    // Check if current date is within the collection's date range
    const start = collection.startDate ? new Date(collection.startDate) : new Date(0);
    const end = collection.endDate ? new Date(collection.endDate) : new Date(8640000000000000); // Max date
    
    return now >= start && now <= end;
  });
};

export { mockCategories, mockCollections };

export default {
  categories: mockCategories,
  collections: mockCollections
};
