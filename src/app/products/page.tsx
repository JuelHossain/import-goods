'use client';

import {
  Container,
  Box,
  Heading,
  Text,
  SimpleGrid,
  Stack,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Button,
  Badge,
  useColorMode,
  useColorModeValue,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Tag,
} from '@chakra-ui/react';
import { useState } from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import NextImage from 'next/image';
import MainLayout from '@/components/layout/MainLayout';

// Mock product data
const products = [
  {
    id: 1,
    name: 'Handcrafted Leather Bag',
    merchant: 'Italian Leatherworks',
    price: 299,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    featured: true,
    inStock: true,
    description: 'Handcrafted from premium Italian leather, this elegant bag combines timeless design with exceptional craftsmanship. Perfect for both casual and formal occasions.',
    origin: 'Italy',
    shippingTime: '2-3 weeks',
  },
  {
    id: 2,
    name: 'Premium Coffee Beans',
    merchant: 'Colombian Harvest',
    price: 49,
    category: 'Food & Beverage',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    featured: true,
    inStock: true,
    description: 'Sourced from the highlands of Colombia, these premium coffee beans offer a rich, aromatic experience with notes of chocolate and citrus.',
    origin: 'Colombia',
    shippingTime: '1-2 weeks',
  },
  {
    id: 3,
    name: 'Ceramic Dining Set',
    merchant: 'Japanese Artisans',
    price: 189,
    category: 'Home Goods',
    image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    featured: true,
    inStock: true,
    description: 'This exquisite ceramic dining set is handcrafted by master artisans in Japan. Each piece showcases traditional techniques with a modern aesthetic.',
    origin: 'Japan',
    shippingTime: '3-4 weeks',
  },
  {
    id: 4,
    name: 'Organic Olive Oil',
    merchant: 'Greek Farms',
    price: 29,
    category: 'Food & Beverage',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    featured: false,
    inStock: true,
    description: 'Cold-pressed from organically grown olives in the sun-drenched groves of Greece. This extra virgin olive oil delivers exceptional flavor and health benefits.',
    origin: 'Greece',
    shippingTime: '1-2 weeks',
  },
  {
    id: 5,
    name: 'Handwoven Carpet',
    merchant: 'Persian Artisans',
    price: 599,
    category: 'Home Goods',
    image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    featured: false,
    inStock: true,
    description: 'This stunning handwoven carpet represents centuries of Persian craftsmanship. Made with natural dyes and premium wool for exceptional durability and beauty.',
    origin: 'Iran',
    shippingTime: '4-6 weeks',
  },
  {
    id: 6,
    name: 'Luxury Watch',
    merchant: 'Swiss Timepieces',
    price: 1299,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    featured: false,
    inStock: false,
    description: 'Precision Swiss engineering meets elegant design in this luxury timepiece. Features a sapphire crystal face, automatic movement, and water resistance.',
    origin: 'Switzerland',
    shippingTime: '2-3 weeks',
  },
  {
    id: 7,
    name: 'Silk Scarf',
    merchant: 'Indian Textiles',
    price: 79,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    featured: false,
    inStock: true,
    description: 'Handcrafted from the finest silk, this scarf features traditional Indian patterns with vibrant colors. Each piece is unique and made using ancient techniques.',
    origin: 'India',
    shippingTime: '1-2 weeks',
  },
  {
    id: 8,
    name: 'Artisanal Cheese Selection',
    merchant: 'French Dairy',
    price: 89,
    category: 'Food & Beverage',
    image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    featured: false,
    inStock: true,
    description: 'A curated selection of the finest French cheeses, aged to perfection and delivered in temperature-controlled packaging to ensure optimal flavor.',
    origin: 'France',
    shippingTime: '1 week',
  },
];

// Available categories for filtering
const categories = ['All', 'Fashion', 'Food & Beverage', 'Home Goods', 'Accessories'];

export default function ProductsPage() {
  const { colorMode } = useColorMode();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  // Color mode values
  const bgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.700', 'gray.300');
  const lightTextColor = useColorModeValue('gray.600', 'gray.400');
  const headingColor = useColorModeValue('gray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const pageBackgroundColor = useColorModeValue('gray.50', 'gray.800');
  const filterBgColor = useColorModeValue('white', 'gray.700');
  const productCardBgColor = useColorModeValue('white', 'gray.700');
  const productCardHoverBgColor = useColorModeValue('gray.50', 'gray.600');
  const selectBgColor = useColorModeValue('white', 'gray.700');
  const selectBorderColor = useColorModeValue('gray.200', 'gray.600');
  const selectColor = useColorModeValue('gray.800', 'white');
  const selectPlaceholderColor = useColorModeValue('gray.500', 'gray.400');

  // Filter products based on search query and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.merchant.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort products based on selected sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'featured') {
      return a.featured === b.featured ? 0 : a.featured ? -1 : 1;
    } else if (sortBy === 'priceLow') {
      return a.price - b.price;
    } else if (sortBy === 'priceHigh') {
      return b.price - a.price;
    } else if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  return (
    <MainLayout>
      <Container maxW="container.xl" py={12} bg={pageBackgroundColor}>
        <Stack gap={8}>
          <Box textAlign="center">
            <Heading as="h1" size="xl" mb={4} color={headingColor}>
              Our Products
            </Heading>
            <Text color={textColor} maxW="container.md" mx="auto">
              Explore our curated collection of high-quality products from trusted merchants around the world.
            </Text>
          </Box>

          {/* Filters and Search */}
          <Flex 
            direction={{ base: 'column', md: 'row' }} 
            gap={{ base: 4, md: 6 }} 
            bg={filterBgColor} 
            p={{ base: 5, md: 6 }} 
            borderRadius="lg" 
            boxShadow="sm"
            borderWidth="1px"
            borderColor={borderColor}
            alignItems="center"
          >
            <InputGroup flex={1}>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color={lightTextColor} />
              </InputLeftElement>
              <Input 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                bg={selectBgColor}
                borderColor={selectBorderColor}
                color={selectColor}
                _placeholder={{ color: selectPlaceholderColor }}
                _hover={{ borderColor: 'brand.400' }}
                _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)' }}
              />
            </InputGroup>
            
            <Select 
              maxW={{ base: 'full', md: '220px' }} 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              bg={selectBgColor}
              borderColor={selectBorderColor}
              color={selectColor}
              _hover={{ borderColor: 'brand.400' }}
              _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)' }}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
            
            <Select 
              maxW={{ base: 'full', md: '220px' }} 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              bg={selectBgColor}
              borderColor={selectBorderColor}
              color={selectColor}
              _hover={{ borderColor: 'brand.400' }}
              _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)' }}
            >
              <option value="featured">Featured</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="name">Name</option>
            </Select>
          </Flex>

          {/* Product Grid */}
          {sortedProducts.length > 0 ? (
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={8}>
              {sortedProducts.map((product) => (
                <Card
                  key={product.id}
                  bg={productCardBgColor}
                  boxShadow="md"
                  rounded="md"
                  overflow="hidden"
                  transition="transform 0.3s"
                  _hover={{ transform: 'translateY(-5px)', bg: productCardHoverBgColor }}
                  position="relative"
                  height="100%"
                >
                  {product.featured && (
                    <Tag
                      position="absolute"
                      top={2}
                      right={2}
                      colorScheme="green"
                      size="sm"
                      borderRadius="full"
                    >
                      Featured
                    </Tag>
                  )}
                  {!product.inStock && (
                    <Tag
                      position="absolute"
                      top={2}
                      left={2}
                      colorScheme="red"
                      size="sm"
                      borderRadius="full"
                    >
                      Out of Stock
                    </Tag>
                  )}
                  <Box position="relative" h="200px" w="100%">
                    <NextImage
                      src={product.image || '/images/placeholder.jpg'}
                      alt={product.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </Box>
                  <CardBody>
                    <Stack gap={1} align="center">
                      <Heading fontSize="lg" fontWeight={500} textAlign="center">
                        {product.name}
                      </Heading>
                      <Text color={lightTextColor} fontSize="sm">
                        {product.merchant}
                      </Text>
                      <Text fontWeight={600} color="brand.500" fontSize="xl">
                        ${product.price}
                      </Text>
                      <Text fontSize="xs" color={lightTextColor}>
                        {product.category}
                      </Text>
                      <Text fontSize="xs" color={lightTextColor}>
                        Origin: {product.origin}
                      </Text>
                    </Stack>
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <Button
                      as={NextLink}
                      href={`/products/${product.id}`}
                      w="full"
                      bg="brand.500"
                      color="white"
                      _hover={{
                        bg: 'brand.600',
                      }}
                      isDisabled={!product.inStock}
                    >
                      {product.inStock ? 'View Details' : 'Out of Stock'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </SimpleGrid>
          ) : (
            <Box textAlign="center" py={10} bg={filterBgColor} borderRadius="md">
              <Text fontSize="lg">No products found matching your criteria.</Text>
              <Button 
                mt={4} 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                colorScheme="brand"
              >
                Clear Filters
              </Button>
            </Box>
          )}
        </Stack>
      </Container>
    </MainLayout>
  );
}
