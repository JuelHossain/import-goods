'use client';

import {
  Box,
  Container,
  Stack,
  Text,
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
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Spinner,
  Center,
  Card,
  CardBody,
  Divider,
  useColorModeValue,
  useColorMode
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { MdLocalShipping } from 'react-icons/md';
import { FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa';
import NextLink from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import NextImage from 'next/image';
import { mockProducts } from '@/data/mock/products';

export default function ProductDetailClient() {
  const { colorMode } = useColorMode();
  const params = useParams();
  const router = useRouter();
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  
  useEffect(() => {
    // Simulate API fetch with a timeout
    const timer = setTimeout(() => {
      const productId = params.id as string;
      const foundProduct = mockProducts.find(p => p.id.toString() === productId);
      
      if (foundProduct) {
        setProduct(foundProduct);
        setMainImage(foundProduct.images ? foundProduct.images[0] : foundProduct.image || '');
      }
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [params.id]);
  
  // If product not found, show message and link to products page
  if (!loading && !product) {
    return (
      <MainLayout>
        <Container maxW={'7xl'} py={12}>
          <Center h="50vh" flexDirection="column">
            <Heading mb={4}>Product Not Found</Heading>
            <Text mb={6}>The product you are looking for does not exist or has been removed.</Text>
            <Button as={NextLink} href="/products" colorScheme="blue">
              View All Products
            </Button>
          </Center>
        </Container>
      </MainLayout>
    );
  }
  
  // Loading state
  if (loading) {
    return (
      <MainLayout>
        <Container maxW={'7xl'} py={12}>
          <Center h="50vh">
            <Spinner size="xl" />
          </Center>
        </Container>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <Container maxW={'7xl'} py={6}>
        {/* Breadcrumbs */}
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
          {/* Product Images */}
          <Flex direction="column">
            <Box
              rounded={'lg'}
              height={{ base: '300px', md: '400px' }}
              width="100%"
              position="relative"
              overflow="hidden"
              mb={4}
            >
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <NextImage
                  src={mainImage}
                  alt={product.name}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </Box>
            
            <Flex mt={2} gap={2}>
              {product.images.map((image: string, i: number) => (
                <Box
                  key={i}
                  height="80px"
                  width="80px"
                  position="relative"
                  overflow="hidden"
                  borderRadius="md"
                  cursor="pointer"
                  border={mainImage === image ? '2px solid' : '1px solid'}
                  borderColor={mainImage === image ? 'blue.500' : 'gray.200'}
                  onClick={() => setMainImage(image)}
                >
                  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <NextImage
                      src={image}
                      alt={`${product.name} ${i + 1}`}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </Box>
              ))}
            </Flex>
          </Flex>
          
          {/* Product Info */}
          <Stack spacing={5}>
            <Box>
              <Heading as="h1" fontSize="3xl">
                {product.name}
              </Heading>
              <Text color={useColorModeValue('gray.500', 'gray.400')} fontSize="md">
                By {product.merchant}
              </Text>
            </Box>
            
            <Text fontWeight="bold" fontSize="2xl">
              ${product.price.toFixed(2)}
            </Text>
            
            <Stack direction="row" alignItems="center" mt={2}>
              <Badge colorScheme="green" fontSize="0.8em" px={2} py={1} borderRadius="full">
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </Badge>
              <Badge colorScheme="purple" fontSize="0.8em" px={2} py={1} borderRadius="full">
                {product.category}
              </Badge>
              <Badge colorScheme="blue" fontSize="0.8em" px={2} py={1} borderRadius="full">
                {product.origin}
              </Badge>
            </Stack>
            
            <Text>{product.description}</Text>
            
            <Stack direction={{ base: 'column', sm: 'row' }} spacing={4} mt={4}>
              <Button
                rounded={'md'}
                w={{ base: 'full', sm: 'auto' }}
                size={'lg'}
                py={6}
                bg={'blue.400'}
                color={'white'}
                textTransform={'uppercase'}
                _hover={{
                  transform: 'translateY(2px)',
                  boxShadow: 'lg',
                  bg: 'blue.500',
                }}
                leftIcon={<FaShoppingCart />}
              >
                Add to cart
              </Button>
              <Button
                rounded={'md'}
                w={{ base: 'full', sm: 'auto' }}
                size={'lg'}
                py={6}
                textTransform={'uppercase'}
                bg={useColorModeValue('gray.200', 'gray.700')}
                _hover={{
                  transform: 'translateY(2px)',
                  boxShadow: 'lg',
                }}
                onClick={() => setIsFavorite(!isFavorite)}
                leftIcon={isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}
              >
                {isFavorite ? 'Saved' : 'Save'}
              </Button>
            </Stack>
            
            <Stack direction="row" alignItems="center" mt={2}>
              <MdLocalShipping />
              <Text>Ships in {product.shippingEstimate}</Text>
            </Stack>
          </Stack>
        </SimpleGrid>
        
        <Tabs isLazy mt={10}>
          <TabList>
            <Tab>Features</Tab>
            <Tab>Specifications</Tab>
            <Tab>Reviews</Tab>
          </TabList>
          
          <TabPanels>
            <TabPanel>
              <VStack align="start" spacing={4}>
                <Heading as="h3" size="md">
                  Product Features
                </Heading>
                <List spacing={2}>
                  {product.features.map((feature: string, index: number) => (
                    <ListItem key={index}>• {feature}</ListItem>
                  ))}
                </List>
              </VStack>
            </TabPanel>
            
            <TabPanel>
              <VStack align="start" spacing={4}>
                <Heading as="h3" size="md">
                  Technical Specifications
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} width="100%">
                  {Object.entries(product.specifications).map(([key, value], index) => (
                    <Card key={index}>
                      <CardBody>
                        <Text fontWeight="bold">{key}</Text>
                        <Divider my={2} />
                        <Text>{value as unknown as string}</Text>
                      </CardBody>
                    </Card>
                  ))}
                </SimpleGrid>
              </VStack>
            </TabPanel>
            
            <TabPanel>
              <VStack align="start" spacing={4}>
                <Heading as="h3" size="md">
                  Customer Reviews
                </Heading>
                <Stack direction="row" alignItems="center">
                  <Text fontWeight="bold" fontSize="xl">
                    {product.rating}
                  </Text>
                  <Text>out of 5 stars</Text>
                  <Text>({product.reviewCount} reviews)</Text>
                </Stack>
                {/* Reviews would go here in a real application */}
                <Text mt={4}>Reviews coming soon.</Text>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </MainLayout>
  );
}
