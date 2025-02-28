'use client';

import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  List,
  ListItem,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Spinner,
  Center,
  Card,
  CardBody,
  Divider,
} from '@chakra-ui/react';
import { useColorMode } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { MdLocalShipping } from 'react-icons/md';
import { FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa';
import NextLink from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';

// Mock product data - this would come from your API/database in a real app
const products = [
  {
    id: '1',
    name: 'Handcrafted Leather Bag',
    merchant: 'Italian Leatherworks',
    price: 299,
    category: 'Fashion',
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ],
    description: 'This premium handcrafted leather bag is made from the finest Italian leather. Each bag is carefully crafted by skilled artisans with decades of experience in leatherworking. The bag features a spacious main compartment, multiple interior pockets, and adjustable shoulder straps for comfort.',
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
    inStock: true,
    featured: true,
    rating: 4.8,
    reviewCount: 42,
    shippingEstimate: '3-5 business days',
    origin: 'Italy',
  },
  {
    id: '2',
    name: 'Premium Coffee Beans',
    merchant: 'Colombian Harvest',
    price: 49,
    category: 'Food & Beverage',
    images: [
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Our premium coffee beans are sourced from high-altitude farms in Colombia. These single-origin beans are carefully selected and roasted to perfection to bring out their unique flavor profile. Each batch is roasted in small quantities to ensure the highest quality and freshness.',
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
    inStock: true,
    featured: true,
    rating: 4.9,
    reviewCount: 87,
    shippingEstimate: '5-7 business days',
    origin: 'Colombia',
  },
  // Add more products as needed
];

export default function ProductDetail() {
  const { colorMode } = useColorMode();
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<null | {
    id: string;
    name: string;
    merchant: string;
    price: number;
    category: string;
    images: string[];
    description: string;
    features: string[];
    specifications: Record<string, string>;
    inStock: boolean;
    featured: boolean;
    rating: number;
    reviewCount: number;
    shippingEstimate: string;
    origin: string;
  }>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // In a real app, you would fetch the product data from your API
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const foundProduct = products.find(p => p.id === params.id);
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          // Product not found
          router.push('/products');
          // Toast would be implemented with a custom component in a real app
          console.error('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        // Toast would be implemented with a custom component in a real app
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id, router]);

  const handleAddToCart = () => {
    // Toast would be implemented with a custom component in a real app
    console.log(`${product?.name} has been added to your cart.`);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Toast would be implemented with a custom component in a real app
    console.log(isFavorite ? 'Removed from favorites' : 'Added to favorites');
  };

  if (isLoading) {
    return (
      <MainLayout>
        <Center h="50vh">
          <Spinner size="xl" color="brand.500" />
        </Center>
      </MainLayout>
    );
  }

  if (!product) {
    return (
      <MainLayout>
        <Container maxW="container.xl" py={12}>
          <Text>Product not found</Text>
          <Button as="a" href="/products" mt={4}>
            Back to Products
          </Button>
        </Container>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Container maxW="container.xl" py={12}>
        <Breadcrumb mb={6} fontSize="sm">
          <BreadcrumbItem>
            <BreadcrumbLink as={NextLink} href="/">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink as={NextLink} href="/products">
              Products
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink>{product.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Card 
          bg={colorMode === 'dark' ? 'gray.700' : 'white'} 
          boxShadow="md"
          borderRadius="lg"
          overflow="hidden"
          mb={8}
        >
          <CardBody p={0}>
            <SimpleGrid columns={{ base: 1, lg: 2 }}>
              <Flex direction="column" p={6}>
                <Image
                  rounded="md"
                  alt={product.name}
                  src={product.images[selectedImage]}
                  fit="cover"
                  align="center"
                  w="100%"
                  h={{ base: '100%', sm: '400px', lg: '500px' }}
                  mb={4}
                />
                <Flex justifyContent="center" mt={2}>
                  {product.images.map((image: string, i: number) => (
                    <Box
                      key={i}
                      border={i === selectedImage ? '2px solid' : '1px solid'}
                      borderColor={i === selectedImage ? 'brand.500' : colorMode === 'dark' ? 'gray.600' : 'gray.200'}
                      rounded="md"
                      mx={1}
                      cursor="pointer"
                      onClick={() => setSelectedImage(i)}
                      overflow="hidden"
                    >
                      <Image
                        src={image}
                        alt={`${product.name} ${i + 1}`}
                        h="60px"
                        w="60px"
                        objectFit="cover"
                      />
                    </Box>
                  ))}
                </Flex>
              </Flex>

              <Stack p={6}>
                <Box>
                  <Flex justifyContent="space-between" alignItems="center">
                    <Heading as="h1" fontSize="3xl" fontWeight="bold">
                      {product.name}
                    </Heading>
                    <Button
                      variant="ghost"
                      colorScheme={isFavorite ? 'red' : 'gray'}
                      onClick={toggleFavorite}
                    >
                      {isFavorite ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
                    </Button>
                  </Flex>
                  <Text color={colorMode === 'dark' ? 'gray.300' : 'gray.500'} fontSize="md">
                    By {product.merchant}
                  </Text>
                </Box>

                <Flex alignItems="center" mt={2}>
                  <Badge colorScheme="green" fontSize="md" px={2} py={1}>
                    {product.rating} ★
                  </Badge>
                  <Text ml={2} color={colorMode === 'dark' ? 'gray.300' : 'gray.600'}>
                    ({product.reviewCount} reviews)
                  </Text>
                  {product.featured && (
                    <Badge ml={4} colorScheme="purple" fontSize="md" px={2} py={1}>
                      Featured
                    </Badge>
                  )}
                </Flex>

                <Box>
                  <Text color={colorMode === 'dark' ? 'white' : 'gray.900'} fontWeight="bold" fontSize="3xl">
                    ${product.price}
                  </Text>
                  <Text color={colorMode === 'dark' ? 'gray.300' : 'gray.600'} fontSize="sm">
                    Import tax and duties included
                  </Text>
                </Box>

                <Text color={colorMode === 'dark' ? 'gray.300' : 'gray.700'}>
                  {product.description}
                </Text>

                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  mt={4}
                >
                  <Button
                    rounded="md"
                    w="full"
                    size="lg"
                    py={7}
                    bg="brand.500"
                    color="white"
                    textTransform="uppercase"
                    _hover={{
                      transform: 'translateY(2px)',
                      boxShadow: 'lg',
                      bg: 'brand.600',
                    }}
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                  >
                    <Flex align="center" gap={2}>
                      <FaShoppingCart />
                      {product.inStock ? 'Add to cart' : 'Out of stock'}
                    </Flex>
                  </Button>
                  <Button
                    rounded="md"
                    w="full"
                    size="lg"
                    py={7}
                    bg={colorMode === 'dark' ? 'gray.600' : 'gray.100'}
                    color={colorMode === 'dark' ? 'white' : 'gray.800'}
                    textTransform="uppercase"
                    _hover={{
                      transform: 'translateY(2px)',
                      boxShadow: 'lg',
                      bg: colorMode === 'dark' ? 'gray.500' : 'gray.200',
                    }}
                    as="a"
                    href="/pre-order"
                  >
                    Pre-order
                  </Button>
                </Stack>

                <Stack direction="row" alignItems="center" mt={2}>
                  <MdLocalShipping size={24} />
                  <Text color={colorMode === 'dark' ? 'gray.300' : 'gray.700'}>
                    Ships from {product.origin} • {product.shippingEstimate}
                  </Text>
                </Stack>

                <Tabs>
                  <TabsList>
                    <TabsTrigger value="features">Features</TabsTrigger>
                    <TabsTrigger value="specifications">Specifications</TabsTrigger>
                    <TabsTrigger value="shipping">Shipping</TabsTrigger>
                  </TabsList>

                  <TabsContent value="features">
                    <List>
                      {product.features.map((feature: string, index: number) => (
                        <ListItem key={index} color={colorMode === 'dark' ? 'gray.300' : 'gray.700'} mb={2}>
                          <Text as="span" fontWeight="bold">•</Text> {feature}
                        </ListItem>
                      ))}
                    </List>
                  </TabsContent>
                  <TabsContent value="specifications">
                    <VStack align="stretch">
                      {Object.entries(product.specifications).map(
                        ([key, value]: [string, string], index: number) => (
                          <Box key={index}>
                            <Flex justifyContent="space-between">
                              <Text fontWeight="bold" color={colorMode === 'dark' ? 'gray.300' : 'gray.700'}>{key}</Text>
                              <Text color={colorMode === 'dark' ? 'gray.300' : 'gray.700'}>{value}</Text>
                            </Flex>
                            {index < Object.entries(product.specifications).length - 1 && (
                              <Divider my={2} borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'} />
                            )}
                          </Box>
                        )
                      )}
                    </VStack>
                  </TabsContent>
                  <TabsContent value="shipping">
                    <VStack align="start">
                      <Box>
                        <Heading size="sm" color={colorMode === 'dark' ? 'white' : 'gray.900'}>Shipping Information</Heading>
                        <Text mt={2} color={colorMode === 'dark' ? 'gray.300' : 'gray.700'}>
                          We ship this product directly from {product.origin}. Estimated delivery time is {product.shippingEstimate} after order confirmation.
                        </Text>
                      </Box>
                      <Box>
                        <Heading size="sm" color={colorMode === 'dark' ? 'white' : 'gray.900'}>Import Duties & Taxes</Heading>
                        <Text mt={2} color={colorMode === 'dark' ? 'gray.300' : 'gray.700'}>
                          All import duties and taxes are included in the product price. You won&apos;t have to pay any additional fees upon delivery.
                        </Text>
                      </Box>
                      <Box>
                        <Heading size="sm" color={colorMode === 'dark' ? 'white' : 'gray.900'}>Returns & Exchanges</Heading>
                        <Text mt={2} color={colorMode === 'dark' ? 'gray.300' : 'gray.700'}>
                          If you&apos;re not completely satisfied with your purchase, you can return it within 30 days for a full refund or exchange.
                        </Text>
                      </Box>
                    </VStack>
                  </TabsContent>
                </Tabs>
              </Stack>
            </SimpleGrid>
          </CardBody>
        </Card>
      </Container>
    </MainLayout>
  );
}
