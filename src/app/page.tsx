'use client';

import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
  SimpleGrid,
  Image,
  Flex,
} from '@chakra-ui/react';
import MainLayout from '@/components/layout/MainLayout';
import NextLink from 'next/link';

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <Container maxW={'3xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            Import Quality Goods <br />
            <Text as={'span'} color={'brand.500'}>
              From Around the World
            </Text>
          </Heading>
          <Text color={'gray.500'}>
            We connect you with the finest products from global merchants. 
            Whether you&apos;re looking for unique items or bulk orders, 
            our export business makes international trade simple and accessible.
          </Text>
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}>
            <Button
              as={NextLink}
              href={'/products'}
              colorScheme={'blue'}
              bg={'brand.500'}
              rounded={'full'}
              px={6}
              _hover={{
                bg: 'brand.600',
              }}>
              Browse Products
            </Button>
            <Button 
              as={NextLink}
              href={'/pre-order'} 
              variant={'link'} 
              colorScheme={'blue'} 
              size={'sm'}>
              Pre-Order Custom Items
            </Button>
            <Box>
              <Icon
                as={Arrow}
                color={useColorModeValue('gray.800', 'gray.300')}
                w={71}
                position={'absolute'}
                right={-71}
                top={'10px'}
              />
              <Text
                fontSize={'lg'}
                fontFamily={'Caveat'}
                position={'absolute'}
                right={'-125px'}
                top={'-15px'}
                transform={'rotate(10deg)'}>
                Starting at just $99
              </Text>
            </Box>
          </Stack>
        </Stack>
      </Container>

      {/* Featured Products Section */}
      <Box py={12}>
        <Container maxW={'6xl'}>
          <Heading as="h2" size="xl" mb={8} textAlign="center">
            Featured Products
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            {featuredProducts.map((product) => (
              <Box
                key={product.id}
                bg="white"
                boxShadow={'md'}
                rounded={'md'}
                overflow={'hidden'}
                transition="transform 0.3s"
                _hover={{ transform: 'translateY(-5px)' }}
              >
                <Image
                  h={'240px'}
                  w={'full'}
                  src={product.image}
                  objectFit={'cover'}
                  alt={product.name}
                />
                <Box p={6}>
                  <Stack spacing={0} align={'center'} mb={5}>
                    <Heading fontSize={'xl'} fontWeight={500} fontFamily={'body'}>
                      {product.name}
                    </Heading>
                    <Text color={'gray.500'}>{product.merchant}</Text>
                  </Stack>

                  <Stack direction={'row'} justify={'center'} spacing={6}>
                    <Stack spacing={0} align={'center'}>
                      <Text fontWeight={600}>${product.price}</Text>
                      <Text fontSize={'sm'} color={'gray.500'}>
                        {product.category}
                      </Text>
                    </Stack>
                  </Stack>

                  <Button
                    as={NextLink}
                    href={`/products/${product.id}`}
                    w={'full'}
                    mt={8}
                    bg={'brand.500'}
                    color={'white'}
                    rounded={'md'}
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg',
                      bg: 'brand.600',
                    }}>
                    View Details
                  </Button>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box bg="gray.50" py={16}>
        <Container maxW={'6xl'}>
          <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'} mb={12}>
            <Heading fontSize={'3xl'}>How It Works</Heading>
            <Text color={'gray.600'} fontSize={'xl'}>
              Our simple process makes importing goods easy and accessible for everyone.
            </Text>
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            {steps.map((step) => (
              <Box key={step.id} p={5} shadow={'md'} borderWidth={'1px'} bg="white" rounded="md">
                <Flex
                  w={16}
                  h={16}
                  align={'center'}
                  justify={'center'}
                  color={'white'}
                  rounded={'full'}
                  bg={'brand.500'}
                  mb={4}>
                  {step.icon}
                </Flex>
                <Heading fontSize={'xl'} mb={2}>{step.title}</Heading>
                <Text color={'gray.600'}>{step.text}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box bg="brand.500" color="white" py={16}>
        <Container maxW={'3xl'} textAlign={'center'}>
          <Heading mb={4}>Ready to start importing?</Heading>
          <Text fontSize={'xl'} mb={6}>
            Join thousands of satisfied customers who have transformed their businesses with our products.
          </Text>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4} justify={'center'}>
            <Button
              as={NextLink}
              href={'/auth/signup'}
              bg={'white'}
              color={'brand.500'}
              _hover={{
                bg: 'gray.100',
              }}
              size={'lg'}
              fontWeight={'bold'}
              rounded={'full'}>
              Sign Up Now
            </Button>
            <Button
              as={NextLink}
              href={'/contact'}
              variant={'outline'}
              colorScheme={'whiteAlpha'}
              size={'lg'}
              fontWeight={'bold'}
              rounded={'full'}>
              Contact Us
            </Button>
          </Stack>
        </Container>
      </Box>
    </MainLayout>
  );
}

const Arrow = createIcon({
  displayName: 'Arrow',
  viewBox: '0 0 72 24',
  path: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.600904 7.08166C0.764293 6.8879 1.01492 6.79004 1.26654 6.82177C2.83216 7.01918 5.20326 7.24581 7.54543 7.23964C9.92491 7.23338 12.1351 6.98464 13.4704 6.32142C13.84 6.13785 14.2885 6.28805 14.4722 6.65692C14.6559 7.02578 14.5052 7.47362 14.1356 7.6572C12.4625 8.48822 9.94063 8.72541 7.54852 8.7317C5.67514 8.73663 3.79547 8.5985 2.29921 8.44247C2.80955 9.59638 3.50943 10.6396 4.24665 11.7384C4.39435 11.9585 4.54354 12.1809 4.69301 12.4068C5.79543 14.0733 6.88128 15.8995 7.1179 18.2636C7.15893 18.6735 6.85928 19.0393 6.4486 19.0805C6.03792 19.1217 5.67174 18.8227 5.6307 18.4128C5.43271 16.4346 4.52957 14.868 3.4457 13.2296C3.3058 13.0181 3.16221 12.8046 3.01684 12.5885C2.05899 11.1646 1.02372 9.62564 0.457909 7.78069C0.383671 7.53862 0.437515 7.27541 0.600904 7.08166ZM5.52039 10.2248C5.77662 9.90161 6.24663 9.84687 6.57018 10.1025C16.4834 17.9344 29.9158 22.4064 42.0781 21.4773C54.1988 20.5514 65.0339 14.2748 69.9746 0.584299C70.1145 0.196597 70.5427 -0.0046455 70.931 0.134813C71.3193 0.274276 71.5206 0.70162 71.3807 1.08932C66.2105 15.4159 54.8056 22.0014 42.1913 22.965C29.6185 23.9254 15.8207 19.3142 5.64226 11.2727C5.31871 11.0171 5.26415 10.5479 5.52039 10.2248Z"
      fill="currentColor"
    />
  ),
});

// Sample data for featured products
const featuredProducts = [
  {
    id: 1,
    name: 'Handcrafted Leather Bag',
    merchant: 'Italian Leatherworks',
    price: 299,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 2,
    name: 'Premium Coffee Beans',
    merchant: 'Colombian Harvest',
    price: 49,
    category: 'Food & Beverage',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 3,
    name: 'Ceramic Dining Set',
    merchant: 'Japanese Artisans',
    price: 189,
    category: 'Home Goods',
    image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  },
];

// Sample data for how it works steps
const steps = [
  {
    id: 1,
    title: 'Browse Products',
    text: 'Explore our curated collection of products from trusted merchants around the world.',
    icon: <Text fontSize="2xl">1</Text>,
  },
  {
    id: 2,
    title: 'Place Your Order',
    text: 'Select the items you want and place your order securely through our platform.',
    icon: <Text fontSize="2xl">2</Text>,
  },
  {
    id: 3,
    title: 'Receive Your Goods',
    text: 'We handle shipping, customs, and delivery to bring your products right to your doorstep.',
    icon: <Text fontSize="2xl">3</Text>,
  },
];
