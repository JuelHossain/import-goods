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
  Divider,
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  InputGroup,
  InputElement,
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
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);

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

  const handleApprove = () => {
    // In a real app, you would call an API to approve the order
    console.log('Order approved');
    setApproveDialogOpen(false);
  };

  const handleReject = () => {
    // In a real app, you would call an API to reject the order
    console.log('Order rejected');
    setRejectDialogOpen(false);
  };

  if (isLoading) {
    return (
      <MainLayout>
        <Container maxW="container.xl" py={12}>
          <Text>Loading...</Text>
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
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} mb={8}>
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
              <InputGroup maxW="300px">
                <InputElement>
                  <FiSearch color="gray.300" />
                </InputElement>
                <Input placeholder="Search orders..." />
              </InputGroup>
              
              <Select 
                placeholder="Filter by status" 
                maxW="200px"
                value={selectedStatus}
                onChange={handleStatusChange}
              >
                <option value="all">All Statuses</option>
                <option value="completed">Completed</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
              </Select>
            </HStack>

            <Box overflowX="auto">
              <TableContainer>
                <Table>
                  <Thead>
                    <Tr>
                      <Th>Order ID</Th>
                      <Th>Customer</Th>
                      <Th>Date</Th>
                      <Th>Amount</Th>
                      <Th>Status</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {recentOrders
                      .filter(
                        order =>
                          selectedStatus === 'all' ||
                          order.status.toLowerCase() === selectedStatus
                      )
                      .map(order => (
                        <Tr key={order.id}>
                          <Td>{order.id}</Td>
                          <Td>{order.customer}</Td>
                          <Td>{order.date}</Td>
                          <Td>{order.amount}</Td>
                          <Td>
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
                          </Td>
                          <Td>
                            <HStack>
                              <Button
                                size="sm"
                                colorScheme="blue"
                                onClick={() => router.push(`/admin/orders/${order.id}`)}
                              >
                                View
                              </Button>
                            </HStack>
                          </Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </TabsContent>

          <TabsContent value="preorders">
            {/* Pre-Orders Panel */}
            <HStack mb={4}>
              <InputGroup maxW="300px">
                <InputElement>
                  <FiSearch color="gray.300" />
                </InputElement>
                <Input placeholder="Search pre-orders..." />
              </InputGroup>
            </HStack>

            <Box overflowX="auto">
              <TableContainer>
                <Table>
                  <Thead>
                    <Tr>
                      <Th>Pre-Order ID</Th>
                      <Th>Customer</Th>
                      <Th>Date</Th>
                      <Th>Amount</Th>
                      <Th>Est. Shipping</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {preOrders.map(order => (
                      <Tr key={order.id}>
                        <Td>{order.id}</Td>
                        <Td>{order.customer}</Td>
                        <Td>{order.date}</Td>
                        <Td>{order.amount}</Td>
                        <Td>{order.estimatedShipping}</Td>
                        <Td>
                          <HStack>
                            <Button
                              size="sm"
                              colorScheme="green"
                              disabled={false}
                              onClick={handleApprove}
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              colorScheme="red"
                              disabled={false}
                              onClick={handleReject}
                            >
                              Reject
                            </Button>
                          </HStack>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </TabsContent>

          <TabsContent value="products">
            {/* Products Panel */}
            <HStack mb={4}>
              <InputGroup maxW="300px">
                <InputElement>
                  <FiSearch color="gray.300" />
                </InputElement>
                <Input placeholder="Search products..." />
              </InputGroup>
              
              <Select 
                placeholder="Filter by category" 
                maxW="200px"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="all">All Categories</option>
                <option value="fashion">Fashion</option>
                <option value="food & beverage">Food & Beverage</option>
                <option value="home decor">Home Decor</option>
              </Select>
            </HStack>

            <Box overflowX="auto">
              <TableContainer>
                <Table>
                  <Thead>
                    <Tr>
                      <Th>Product ID</Th>
                      <Th>Name</Th>
                      <Th>Category</Th>
                      <Th>Price</Th>
                      <Th>Stock</Th>
                      <Th>Origin</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {products
                      .filter(
                        product =>
                          selectedCategory === 'all' ||
                          product.category.toLowerCase() === selectedCategory
                      )
                      .map(product => (
                        <Tr key={product.id}>
                          <Td>{product.id}</Td>
                          <Td>{product.name}</Td>
                          <Td>{product.category}</Td>
                          <Td>{product.price}</Td>
                          <Td>{product.stock}</Td>
                          <Td>{product.origin}</Td>
                          <Td>
                            <HStack>
                              <Button
                                size="sm"
                                colorScheme="blue"
                                onClick={() => router.push(`/admin/products/${product.id}`)}
                              >
                                Edit
                              </Button>
                            </HStack>
                          </Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
              </TableContainer>
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
