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
  StackDivider,
  List,
  ListItem,
  Badge,
  useColorModeValue,
  useToast,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Spinner,
  Center,
} from '@chakra-ui/react';
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
  const params = useParams();
  const router = useRouter();
  const toast = useToast();
  const [product, setProduct] = useState<any>(null);
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
          toast({
            title: 'Product not found',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        toast({
          title: 'Error loading product',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id, router, toast]);

  const handleAddToCart = () => {
    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? 'Removed from favorites' : 'Added to favorites',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
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
          <Button as={NextLink} href="/products" mt={4}>
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
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>{product.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10}>
          <Flex direction="column">
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
                  borderColor={i === selectedImage ? 'brand.500' : 'gray.200'}
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

          <Stack spacing={6}>
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
              <Text color="gray.500" fontSize="md">
                By {product.merchant}
              </Text>
            </Box>

            <Flex alignItems="center" mt={2}>
              <Badge colorScheme="green" fontSize="md" px={2} py={1}>
                {product.rating} ★
              </Badge>
              <Text ml={2} color="gray.600">
                ({product.reviewCount} reviews)
              </Text>
              {product.featured && (
                <Badge ml={4} colorScheme="purple" fontSize="md" px={2} py={1}>
                  Featured
                </Badge>
              )}
            </Flex>

            <Box>
              <Text color="gray.900" fontWeight="bold" fontSize="3xl">
                ${product.price}
              </Text>
              <Text color="gray.600" fontSize="sm">
                Import tax and duties included
              </Text>
            </Box>

            <Text>{product.description}</Text>

            <Stack
              spacing={4}
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
                leftIcon={<FaShoppingCart />}
                onClick={handleAddToCart}
                isDisabled={!product.inStock}
              >
                {product.inStock ? 'Add to cart' : 'Out of stock'}
              </Button>
              <Button
                rounded="md"
                w="full"
                size="lg"
                py={7}
                bg="gray.100"
                color="gray.800"
                textTransform="uppercase"
                _hover={{
                  transform: 'translateY(2px)',
                  boxShadow: 'lg',
                  bg: 'gray.200',
                }}
                as={NextLink}
                href="/pre-order"
              >
                Pre-order
              </Button>
            </Stack>

            <Stack direction="row" alignItems="center" mt={2}>
              <MdLocalShipping size={24} />
              <Text>
                Ships from {product.origin} • {product.shippingEstimate}
              </Text>
            </Stack>

            <Tabs colorScheme="brand" mt={6}>
              <TabList>
                <Tab>Features</Tab>
                <Tab>Specifications</Tab>
                <Tab>Shipping</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <List spacing={2}>
                    {product.features.map((feature: string, index: number) => (
                      <ListItem key={index}>
                        <Text as="span" fontWeight="bold">•</Text> {feature}
                      </ListItem>
                    ))}
                  </List>
                </TabPanel>
                <TabPanel>
                  <VStack
                    divider={<StackDivider borderColor="gray.200" />}
                    spacing={4}
                    align="stretch"
                  >
                    {Object.entries(product.specifications).map(
                      ([key, value]: [string, any], index: number) => (
                        <Flex key={index} justifyContent="space-between">
                          <Text fontWeight="bold">{key}</Text>
                          <Text>{value}</Text>
                        </Flex>
                      )
                    )}
                  </VStack>
                </TabPanel>
                <TabPanel>
                  <VStack align="start" spacing={4}>
                    <Box>
                      <Heading size="sm">Shipping Information</Heading>
                      <Text mt={2}>
                        We ship this product directly from {product.origin}. Estimated delivery time is {product.shippingEstimate} after order confirmation.
                      </Text>
                    </Box>
                    <Box>
                      <Heading size="sm">Import Duties & Taxes</Heading>
                      <Text mt={2}>
                        All import duties and taxes are included in the product price. You won't have to pay any additional fees upon delivery.
                      </Text>
                    </Box>
                    <Box>
                      <Heading size="sm">Returns & Exchanges</Heading>
                      <Text mt={2}>
                        If you're not completely satisfied with your purchase, you can return it within 30 days for a full refund or exchange.
                      </Text>
                    </Box>
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Stack>
        </SimpleGrid>
      </Container>
    </MainLayout>
  );
}
