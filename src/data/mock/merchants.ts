/**
 * Centralized mock merchants data for the Import Goods application
 * Used across various pages including product details, merchant profiles, and marketplace
 */

export interface Merchant {
  id: string;
  name: string;
  slug: string;
  logo: string;
  coverImage?: string;
  description: string;
  shortDescription?: string;
  country: string;
  region?: string;
  established: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  featured?: boolean;
  specialties: string[];
  contactEmail?: string;
  website?: string;
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  shippingCountries: string[];
  productCategories: string[];
  storyContent?: string;
  sustainabilityInfo?: string;
}

// Mock merchants data
const mockMerchants: Merchant[] = [
  {
    id: 'merch-001',
    name: 'Global Artisans Co.',
    slug: 'global-artisans',
    logo: '/images/merchants/global-artisans-logo.jpg',
    coverImage: '/images/merchants/global-artisans-cover.jpg',
    description: 'Global Artisans Co. works directly with skilled craftspeople around the world to bring their handcrafted goods to a global market. We focus on sustainable partnerships that honor traditional techniques while providing fair wages to artisans.',
    shortDescription: 'Connecting skilled global artisans with conscious consumers',
    country: 'USA',
    region: 'Multiple regions worldwide',
    established: '2015',
    rating: 4.8,
    reviewCount: 124,
    verified: true,
    featured: true,
    specialties: ['Textiles', 'Pottery', 'Home Decor'],
    contactEmail: 'partner@globalartisans.com',
    website: 'https://www.globalartisans.com',
    socialMedia: {
      instagram: '@globalartisans',
      facebook: 'globalartisanscollective',
      twitter: '@globalartisans'
    },
    shippingCountries: ['USA', 'Canada', 'UK', 'EU', 'Australia'],
    productCategories: ['Home & Decor', 'Textiles', 'Ceramics'],
    storyContent: 'Founded in 2015 by Jane and Robert Thompson after years of traveling and building relationships with artisans in remote regions, Global Artisans Co. began with a mission to create sustainable economic opportunities for traditional craftspeople while preserving cultural heritage. What started as partnerships with 5 artisan groups in Morocco and Peru has grown to include over 50 artisan collectives across 12 countries. We believe in transparency throughout our supply chain and ensuring that the makers behind our products receive fair compensation for their exceptional work.',
    sustainabilityInfo: 'We prioritize eco-friendly materials and production methods, working with artisans who utilize natural dyes, recycled materials, and sustainable harvesting practices. All packaging is plastic-free and made from recycled or biodegradable materials.'
  },
  {
    id: 'merch-002',
    name: 'Exotic Spices & Herbs',
    slug: 'exotic-spices-herbs',
    logo: '/images/merchants/exotic-spices-logo.jpg',
    coverImage: '/images/merchants/exotic-spices-cover.jpg',
    description: 'Sourcing the finest spices, herbs, and culinary ingredients directly from small-scale farmers around the world. Our mission is to connect food lovers with authentic flavors while supporting traditional farming practices.',
    shortDescription: 'Premium spices sourced directly from small-scale farmers',
    country: 'USA',
    region: 'Sources from Asia, Africa, and South America',
    established: '2018',
    rating: 4.9,
    reviewCount: 89,
    verified: true,
    featured: true,
    specialties: ['Spices', 'Herbs', 'Specialty Oils'],
    contactEmail: 'info@exoticspices.com',
    website: 'https://www.exoticspicesco.com',
    socialMedia: {
      instagram: '@exoticspices',
      facebook: 'exoticspicesandherbs'
    },
    shippingCountries: ['USA', 'Canada', 'UK', 'EU'],
    productCategories: ['Food & Beverages', 'Spices & Seasonings', 'Oils & Vinegars'],
    storyContent: 'Exotic Spices & Herbs was founded by chef-turned-entrepreneur Michael Rivera, who spent years traveling and learning about traditional spice cultivation. Disappointed by the quality and freshness of spices available in supermarkets, Michael began building direct relationships with small-scale spice farmers in regions known for their exceptional products. Today, we work with over 30 farming communities, ensuring that each product is harvested at peak freshness and processed using traditional methods that preserve flavor and nutritional value.',
    sustainabilityInfo: 'We support regenerative farming practices and work only with growers who avoid synthetic pesticides and fertilizers. Our packaging is either glass or compostable, and we offset carbon emissions from shipping.'
  },
  {
    id: 'merch-003',
    name: 'Moroccan Treasures',
    slug: 'moroccan-treasures',
    logo: '/images/merchants/moroccan-treasures-logo.jpg',
    coverImage: '/images/merchants/moroccan-treasures-cover.jpg',
    description: 'A family-owned business bringing authentic Moroccan handicrafts to the global market. Each piece in our collection is handcrafted by master artisans using techniques passed down through generations.',
    shortDescription: 'Authentic Moroccan handicrafts made by master artisans',
    country: 'Morocco',
    region: 'Fez, Marrakech, and Atlas Mountains',
    established: '2010',
    rating: 4.7,
    reviewCount: 156,
    verified: true,
    featured: false,
    specialties: ['Rugs', 'Ceramics', 'Leather Goods'],
    contactEmail: 'contact@moroccantreasures.com',
    website: 'https://www.moroccantreasures.com',
    socialMedia: {
      instagram: '@moroccantreasures',
      facebook: 'authenticmoroccantreasures'
    },
    shippingCountries: ['USA', 'Canada', 'UK', 'EU', 'Australia', 'Japan'],
    productCategories: ['Home & Decor', 'Textiles', 'Ceramics', 'Fashion & Accessories'],
    storyContent: 'Moroccan Treasures was founded by the Benali family, whose ancestors have been master artisans in Fez for over 200 years. What began as a small shop in the ancient medina has grown into an international business that remains true to its roots. Each item is still handcrafted using traditional techniques, from our hand-knotted rugs to our hand-painted ceramics. We work directly with artisan families throughout Morocco, many of whom have been creating their specialized crafts for generations.',
    sustainabilityInfo: 'We believe in preserving traditional crafts that are inherently sustainable, using natural materials like wool, clay, and vegetable-tanned leather. All our artisans work in safe conditions and receive fair compensation for their skilled work.'
  },
  {
    id: 'merch-004',
    name: 'Andean Textiles',
    slug: 'andean-textiles',
    logo: '/images/merchants/andean-textiles-logo.jpg',
    coverImage: '/images/merchants/andean-textiles-cover.jpg',
    description: 'Working with indigenous weaving communities in Peru and Bolivia to bring their extraordinary textiles to the world. Each piece tells a story through patterns and techniques that have been preserved for centuries.',
    shortDescription: 'Authentic handwoven textiles from Andean communities',
    country: 'Peru',
    region: 'Sacred Valley, Lake Titicaca region',
    established: '2012',
    rating: 4.9,
    reviewCount: 78,
    verified: true,
    featured: false,
    specialties: ['Handwoven Textiles', 'Alpaca Products', 'Traditional Garments'],
    contactEmail: 'hello@andeantextiles.com',
    website: 'https://www.andeantextiles.com',
    socialMedia: {
      instagram: '@andeantextiles',
      facebook: 'andeantextilecollective'
    },
    shippingCountries: ['USA', 'Canada', 'UK', 'EU', 'Japan', 'Australia'],
    productCategories: ['Textiles', 'Fashion & Accessories'],
    storyContent: 'Andean Textiles was founded by Rosa Mamani, who grew up in a weaving family in the highlands of Peru. After studying textile design in Lima and working with fair trade organizations, Rosa established Andean Textiles to create sustainable economic opportunities for indigenous weavers while preserving their cultural heritage. Today, we work with over 200 weavers across 15 communities, most of whom are women who weave in their homes while caring for their families. Each textile is created using techniques passed down from mother to daughter for countless generations.',
    sustainabilityInfo: 'Our textiles are made from natural fibers, primarily alpaca and sheep wool, that are either undyed or colored using natural plant dyes. We support weavers in raising their own alpacas using traditional, sustainable herding practices that have minimal environmental impact.'
  },
  {
    id: 'merch-005',
    name: 'Ceylon Heritage Tea',
    slug: 'ceylon-heritage-tea',
    logo: '/images/merchants/ceylon-heritage-logo.jpg',
    coverImage: '/images/merchants/ceylon-heritage-cover.jpg',
    description: 'Family-owned tea estates in the highlands of Sri Lanka producing premium single-origin teas. We maintain traditional processing methods while implementing sustainable farming practices.',
    shortDescription: 'Premium single-origin teas from Sri Lankan highlands',
    country: 'Sri Lanka',
    region: 'Nuwara Eliya, Dimbula',
    established: '2008',
    rating: 4.8,
    reviewCount: 112,
    verified: true,
    featured: true,
    specialties: ['Black Tea', 'Green Tea', 'Specialty Tea Blends'],
    contactEmail: 'orders@ceylonheritage.com',
    website: 'https://www.ceylonheritagetea.com',
    socialMedia: {
      instagram: '@ceylonheritage',
      facebook: 'ceylonheritagetea',
      twitter: '@ceylontea'
    },
    shippingCountries: ['USA', 'Canada', 'UK', 'EU', 'Australia', 'Japan', 'UAE'],
    productCategories: ['Food & Beverages', 'Coffee & Tea'],
    storyContent: 'Ceylon Heritage Tea represents three generations of tea cultivation expertise. Our family's journey in tea began in 1950 when our grandfather acquired a small tea estate in the misty highlands of Nuwara Eliya. Today, we manage over 200 acres of tea gardens at elevations between 4,000 and 6,000 feet, where the unique microclimate creates teas renowned for their bright character and complex flavor profiles. While we honor traditional cultivation and processing methods, we have also innovated with sustainable practices and organic certification.',
    sustainabilityInfo: 'Our tea gardens are certified organic and utilize regenerative agricultural practices. We have implemented a rainwater harvesting system and use solar energy for 70% of our processing facilities. All workers receive fair wages, housing, healthcare, and educational support for their children.'
  }
];

// Helper functions
export const getMerchantById = (id: string): Merchant | undefined => {
  return mockMerchants.find(merchant => merchant.id === id);
};

export const getMerchantBySlug = (slug: string): Merchant | undefined => {
  return mockMerchants.find(merchant => merchant.slug === slug);
};

export const getFeaturedMerchants = (): Merchant[] => {
  return mockMerchants.filter(merchant => merchant.featured);
};

export const getMerchantsByCategory = (category: string): Merchant[] => {
  return mockMerchants.filter(merchant => 
    merchant.productCategories.some(cat => 
      cat.toLowerCase() === category.toLowerCase()
    )
  );
};

export const getMerchantsByCountry = (country: string): Merchant[] => {
  return mockMerchants.filter(merchant => merchant.country === country);
};

export { mockMerchants };

export default mockMerchants;
