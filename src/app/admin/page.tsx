'use client';

import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  SimpleGrid,
  Icon,
  Button,
  Badge,
  HStack,
  Input,
  Card,
  CardBody,
  Stack,
  Table,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Spinner,
  Center,
} from '@chakra-ui/react';
import { useColorMode } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { FiUsers, FiShoppingBag, FiDollarSign, FiActivity, FiSearch } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';

// Mock data for dashboard
const dashboardStats = [
  {
    label: 'Total Customers',
    value: 1243,
    change: 12.5,
    icon: FiUsers,
    color: 'blue.500',
  },
  {
    label: 'Total Orders',
    value: 4587,
    change: 23.1,
    icon: FiShoppingBag,
    color: 'green.500',
  },
  {
    label: 'Total Revenue',
    value: '$89,421',
    change: 7.4,
    icon: FiDollarSign,
    color: 'purple.500',
  },
  {
    label: 'Growth Rate',
    value: '24.8%',
    change: -2.3,
    icon: FiActivity,
    color: 'orange.500',
  },
];

// Mock data for recent orders
const recentOrders = [
  {
    id: 'ORD-001',
    customer: 'John Smith',
    date: '2023-05-15',
    amount: '$245.99',
    status: 'Completed',
  },
  {
    id: 'ORD-002',
    customer: 'Sarah Johnson',
    date: '2023-05-14',
    amount: '$189.50',
    status: 'Processing',
  },
  {
    id: 'ORD-003',
    customer: 'Michael Brown',
    date: '2023-05-14',
    amount: '$532.20',
    status: 'Shipped',
  },
  {
    id: 'ORD-004',
    customer: 'Emily Davis',
    date: '2023-05-13',
    amount: '$76.00',
    status: 'Completed',
  },
  {
    id: 'ORD-005',
    customer: 'David Wilson',
    date: '2023-05-12',
    amount: '$124.30',
    status: 'Processing',
  },
];

// Mock data for pre-orders
const preOrders = [
  {
    id: 'PRE-001',
    customer: 'Alice Williams',
    date: '2023-05-10',
    amount: '$349.99',
    estimatedShipping: '2023-06-15',
  },
  {
    id: 'PRE-002',
    customer: 'Robert Jones',
    date: '2023-05-09',
    amount: '$189.50',
    estimatedShipping: '2023-06-20',
  },
  {
    id: 'PRE-003',
    customer: 'Jennifer Miller',
    date: '2023-05-08',
    amount: '$432.20',
    estimatedShipping: '2023-06-10',
  },
];

// Mock data for products
const products = [
  {
    id: 'PROD-001',
    name: 'Handcrafted Leather Bag',
    category: 'Fashion',
    price: '$299.99',
    stock: 24,
    origin: 'Italy',
  },
  {
    id: 'PROD-002',
    name: 'Premium Coffee Beans',
    category: 'Food & Beverage',
    price: '$49.99',
    stock: 156,
    origin: 'Colombia',
  },
  {
    id: 'PROD-003',
    name: 'Artisanal Ceramic Vase',
    category: 'Home Decor',
    price: '$89.99',
    stock: 42,
    origin: 'Portugal',
  },
  {
    id: 'PROD-004',
    name: 'Organic Olive Oil',
    category: 'Food & Beverage',
    price: '$24.99',
    stock: 78,
    origin: 'Greece',
  },
];

export default function AdminDashboard() {
  const { colorMode } = useColorMode();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Simulate loading and authentication check
    const checkAuth = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In a real app, you would check if the user is authenticated and has admin role
      setIsAuthenticated(true);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleApprove = () => {
    // In a real app, you would call an API to approve the order
    console.log('Order approved');
  };

  const handleReject = () => {
    // In a real app, you would call an API to reject the order
    console.log('Order rejected');
  };

  if (isLoading) {
    return (
      <MainLayout>
        <Container maxW="container.xl" py={12}>
          <Center h="50vh">
            <Spinner size="xl" color="brand.500" />
          </Center>
        </Container>
      </MainLayout>
    );
  }

  if (!isAuthenticated) {
    // In a real app, you would redirect to login page
    return (
      <MainLayout>
        <Container maxW="container.xl" py={12}>
          <Card>
            <CardBody>
              <Stack align="center">
                <Heading size="lg">Admin Access Required</Heading>
                <Text>You need to be logged in as an administrator to view this page.</Text>
                <Button
                  colorScheme="brand"
                  onClick={() => router.push('/auth/signin')}
                >
                  Sign In
                </Button>
              </Stack>
            </CardBody>
          </Card>
        </Container>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Container maxW="container.xl" py={12}>
        <Heading as="h1" mb={8}>
          Admin Dashboard
        </Heading>

        {/* Dashboard Stats */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} mb={8} spacing={4}>
          {dashboardStats.map((stat, index) => (
            <Card
              key={index}
              px={6}
              py={4}
              bg={colorMode === 'dark' ? 'gray.700' : 'white'}
              shadow="md"
              rounded="lg"
            >
              <CardBody p={0}>
                <Flex justifyContent="space-between">
                  <Box>
                    <Text fontWeight="medium">{stat.label}</Text>
                    <Text fontSize="2xl" fontWeight="bold">
                      {stat.value}
                    </Text>
                    <Text>
                      <Box as="span" color={stat.change > 0 ? 'green.500' : 'red.500'}>
                        {stat.change > 0 ? '↑' : '↓'} {Math.abs(stat.change)}%
                      </Box>
                      {' '}since last month
                    </Text>
                  </Box>
                  <Box
                    my="auto"
                    color={stat.color}
                    alignContent="center"
                  >
                    <Icon as={stat.icon} w={8} h={8} />
                  </Box>
                </Flex>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>

        <Tabs>
          <TabsList>
            <TabsTrigger value="orders">Recent Orders</TabsTrigger>
            <TabsTrigger value="preorders">Pre-Orders</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            {/* Recent Orders Panel */}
            <HStack mb={4}>
              <Box position="relative" maxW="300px">
                <Box position="absolute" left={3} top="50%" transform="translateY(-50%)">
                  <FiSearch color="gray.300" />
                </Box>
                <Input 
                  pl={10} 
                  placeholder="Search orders..." 
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </Box>
              
              <Box maxW="200px">
                <select 
                  value={selectedStatus}
                  onChange={handleStatusChange}
                  style={{ 
                    padding: '8px 12px',
                    borderRadius: '4px',
                    border: '1px solid',
                    borderColor: colorMode === 'dark' ? '#4A5568' : '#E2E8F0',
                    backgroundColor: colorMode === 'dark' ? '#2D3748' : 'white',
                    color: colorMode === 'dark' ? 'white' : 'black',
                    width: '100%'
                  }}
                >
                  <option value="all">All Statuses</option>
                  <option value="completed">Completed</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                </select>
              </Box>
            </HStack>

            <Box overflowX="auto">
              <Box as="table" width="100%" borderCollapse="collapse">
                <Box as="thead">
                  <Box as="tr">
                    <Box as="th" textAlign="left" py={3} px={4} borderBottom="1px solid" borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}>Order ID</Box>
                    <Box as="th" textAlign="left" py={3} px={4} borderBottom="1px solid" borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}>Customer</Box>
                    <Box as="th" textAlign="left" py={3} px={4} borderBottom="1px solid" borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}>Date</Box>
                    <Box as="th" textAlign="left" py={3} px={4} borderBottom="1px solid" borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}>Amount</Box>
                    <Box as="th" textAlign="left" py={3} px={4} borderBottom="1px solid" borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}>Status</Box>
                    <Box as="th" textAlign="left" py={3} px={4} borderBottom="1px solid" borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}>Actions</Box>
                  </Box>
                </Box>
                <Box as="tbody">
                  {recentOrders
                    .filter(
                      order =>
                        (selectedStatus === 'all' ||
                        order.status.toLowerCase() === selectedStatus) &&
                        (searchQuery === '' ||
                        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        order.customer.toLowerCase().includes(searchQuery.toLowerCase()))
                    )
                    .map(order => (
                      <Box as="tr" key={order.id}>
                        <Box as="td" py={3} px={4} borderBottom="1px solid" borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}>{order.id}</Box>
                        <Box as="td" py={3} px={4} borderBottom="1px solid" borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}>{order.customer}</Box>
                        <Box as="td" py={3} px={4} borderBottom="1px solid" borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}>{order.date}</Box>
                        <Box as="td" py={3} px={4} borderBottom="1px solid" borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}>{order.amount}</Box>
                        <Box as="td" py={3} px={4} borderBottom="1px solid" borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}>
                          <Badge
                            colorScheme={
                              order.status === 'Completed'
                                ? 'green'
                                : order.status === 'Processing'
                                ? 'yellow'
                                : 'blue'
                            }
                          >
                            {order.status}
                          </Badge>
                        </Box>
                        <Box as="td" py={3} px={4} borderBottom="1px solid" borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}>
                          <HStack>
                            <Button
                              size="sm"
                              colorScheme="blue"
                              onClick={() => router.push(`/admin/orders/${order.id}`)}
                            >
                              View
                            </Button>
                          </HStack>
                        </Box>
                      </Box>
                    ))}
                </Box>
              </Box>
            </Box>
          </TabsContent>

          <TabsContent value="preorders">
            {/* Pre-Orders Panel */}
            <HStack mb={4}>
              <Box position="relative" maxW="300px">
                <Box position="absolute" left={3} top="50%" transform="translateY(-50%)">
                  <FiSearch color="gray.300" />
                </Box>
                <Input 
                  pl={10} 
                  placeholder="Search pre-orders..." 
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </Box>
            </HStack>

            <Box overflowX="auto">
              <Box as="table" width="100%" borderCollapse="collapse">
                <Box as="thead">
                  <Box as="tr">
                    <Box as="th" textAlign="left" py={3} px={4} borderBottom="1px solid" borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}>Pre-Order ID</Box>
                    <Box as="th" textAlign="left" py={3} px={4} borderBottom="1px solid" borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}>Customer</Box>
                    <Box as="th" textAlign="left" py={3} px={4} borderBottom="1px solid" borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}>Date</Box>
                    <Box as="th" textAlign="left" py={3} px={4} borderBottom="1px solid" borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}>Amount</Box>
                    <Box as="th" textAlign="left" py={3} px={4} borderBottom="1px solid" borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}>Est. Shipping</Box>
                    <Box as="th" textAlign="left" py={3} px={4} borderBottom="1px solid" borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}>Actions</Box>
                  </Box>
                </Box>
                <Box as="tbody">
                  {preOrders
                    .filter(order => 
                      searchQuery === '' ||
                      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      order.customer.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map(order => (
                      <Box as="tr" key={order.id}>
                        <Box as="td" py={3} px={4} borderBottom="1px solid" borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}>{order.id}</Box>
                        <Box as="td" py={3} px={4} borderBottom="1px solid" borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}>{order.customer}</Box>
                        <Box as="td" py={3} px={4} borderBottom="1px solid" borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}>{order.date}</Box>
                        <Box as="td" py={3} px={4} borderBottom="1px solid" borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}>{order.amount}</Box>
                        <Box as="td" py={3} px={4} borderBottom="1px solid" borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}>{order.estimatedShipping}</Box>
                        <Box as="td" py={3} px={4} borderBottom="1px solid" borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}>
                          <HStack>
                            <Button
                              size="sm"
                              colorScheme="green"
                              onClick={handleApprove}
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              colorScheme="red"
                              onClick={handleReject}
                            >
                              Reject
                            </Button>
                          </HStack>
                        </Box>
                      </Box>
                    ))}
                </Box>
              </Box>
            </Box>
          </TabsContent>

          <TabsContent value="products">
            {/* Products Panel */}
            <HStack mb={4}>
              <Box position="relative" maxW="300px">
                <Box position="absolute" left={3} top="50%" transform="translateY(-50%)">
                  <FiSearch color="gray.300" />
                </Box>
                <Input 
                  pl={10} 
                  placeholder="Search products..." 
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </Box>
              
              <Box maxW="200px">
                <select 
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  style={{ 
                    padding: '8px 12px',
                    borderRadius: '4px',
                    border: '1px solid',
                    borderColor: colorMode === 'dark' ? '#4A5568' : '#E2E8F0',
                    backgroundColor: colorMode === 'dark' ? '#2D3748' : 'white',
                    color: colorMode === 'dark' ? 'white' : 'black',
                    width: '100%'
                  }}
                >
                  <option value="all">All Categories</option>
                  <option value="fashion">Fashion</option>
                  <option value="food & beverage">Food & Beverage</option>
                  <option value="home decor">Home Decor</option>
                </select>
              </Box>
            </HStack>

            <Box overflowX="auto">
              <Box as="table" width="100%" borderCollapse="collapse">
                <Box as="thead">
                  <Box as="tr">
                    <Box as="th" textAlign="left" py={3} px={4} borderBottom="1px solid" borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}>Product ID</Box>
                    <Box as="th" textAlign="left" py={3} px={4} borderBottom="1px solid" borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}>Name</Box>
                    <Box as="th" textAlign="left" py={3} px={4} borderBottom="1px solid" borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}>Category</Box>
                    <Box as="th" textAlign="left" py={3} px={4} borderBottom="1px solid" borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}>Price</Box>
                    <Box as="th" textAlign="left" py={3} px={4} borderBottom="1px solid" borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}>Stock</Box>
                    <Box as="th" textAlign="left" py={3} px={4} borderBottom="1px solid" borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}>Origin</Box>
                    <Box as="th" textAlign="left" py={3} px={4} borderBottom="1px solid" borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}>Actions</Box>
                  </Box>
                </Box>
                <Box as="tbody">
                  {products
                    .filter(
                      product =>
                        (selectedCategory === 'all' ||
                        product.category.toLowerCase() === selectedCategory) &&
                        (searchQuery === '' ||
                        product.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        product.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    )
                    .map(product => (
                      <Box as="tr" key={product.id}>
                        <Box as="td" py={3} px={4} borderBottom="1px solid" borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}>{product.id}</Box>
                        <Box as="td" py={3} px={4} borderBottom="1px solid" borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}>{product.name}</Box>
                        <Box as="td" py={3} px={4} borderBottom="1px solid" borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}>{product.category}</Box>
                        <Box as="td" py={3} px={4} borderBottom="1px solid" borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}>{product.price}</Box>
                        <Box as="td" py={3} px={4} borderBottom="1px solid" borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}>{product.stock}</Box>
                        <Box as="td" py={3} px={4} borderBottom="1px solid" borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}>{product.origin}</Box>
                        <Box as="td" py={3} px={4} borderBottom="1px solid" borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}>
                          <HStack>
                            <Button
                              size="sm"
                              colorScheme="blue"
                              onClick={() => router.push(`/admin/products/${product.id}`)}
                            >
                              Edit
                            </Button>
                          </HStack>
                        </Box>
                      </Box>
                    ))}
                </Box>
              </Box>
            </Box>
          </TabsContent>

          <TabsContent value="customers">
            {/* Customers Panel */}
            <Text>Customer management features coming soon.</Text>
          </TabsContent>
        </Tabs>
      </Container>
    </MainLayout>
  );
}
