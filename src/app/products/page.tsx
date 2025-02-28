'use client';

import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Image,
  Stack,
  Button,
  Flex,
  Input,
  Select,
  InputGroup,
  InputLeftElement,
  Badge,
} from '@chakra-ui/react';
import { useState } from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
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
  },
];

// Available categories for filtering
const categories = ['All', 'Fashion', 'Food & Beverage', 'Home Goods', 'Accessories'];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

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
      <Container maxW="container.xl" py={12}>
        <Stack spacing={8}>
          <Box textAlign="center">
            <Heading as="h1" size="xl" mb={4}>
              Our Products
            </Heading>
            <Text color="gray.600" maxW="container.md" mx="auto">
              Explore our curated collection of high-quality products from trusted merchants around the world.
            </Text>
          </Box>

          {/* Filters and Search */}
          <Flex 
            direction={{ base: 'column', md: 'row' }} 
            gap={4} 
            bg="white" 
            p={5} 
            borderRadius="md" 
            boxShadow="sm"
          >
            <InputGroup flex={1}>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.400" />
              </InputLeftElement>
              <Input 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
            
            <Select 
              maxW={{ base: 'full', md: '200px' }} 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
            
            <Select 
              maxW={{ base: 'full', md: '200px' }} 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
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
                <Box
                  key={product.id}
                  bg="white"
                  boxShadow="md"
                  rounded="md"
                  overflow="hidden"
                  transition="transform 0.3s"
                  _hover={{ transform: 'translateY(-5px)' }}
                  position="relative"
                >
                  {product.featured && (
                    <Badge
                      position="absolute"
                      top={2}
                      right={2}
                      colorScheme="green"
                      variant="solid"
                      px={2}
                      py={1}
                      borderRadius="md"
                      fontSize="xs"
                    >
                      Featured
                    </Badge>
                  )}
                  {!product.inStock && (
                    <Badge
                      position="absolute"
                      top={2}
                      left={2}
                      colorScheme="red"
                      variant="solid"
                      px={2}
                      py={1}
                      borderRadius="md"
                      fontSize="xs"
                    >
                      Out of Stock
                    </Badge>
                  )}
                  <Image
                    h="200px"
                    w="full"
                    src={product.image}
                    objectFit="cover"
                    alt={product.name}
                  />
                  <Box p={5}>
                    <Stack spacing={1} align="center" mb={4}>
                      <Heading fontSize="lg" fontWeight={500} textAlign="center">
                        {product.name}
                      </Heading>
                      <Text color="gray.500" fontSize="sm">
                        {product.merchant}
                      </Text>
                      <Text fontWeight={600} color="brand.500" fontSize="xl">
                        ${product.price}
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        {product.category}
                      </Text>
                    </Stack>

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
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          ) : (
            <Box textAlign="center" py={10}>
              <Text fontSize="lg">No products found matching your criteria.</Text>
              <Button 
                mt={4} 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
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
