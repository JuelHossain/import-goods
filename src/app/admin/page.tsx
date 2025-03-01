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
  Stack,
  Spinner,
  Center,
  useColorModeValue,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Tab,
  TabList,
  Tabs,
  TabPanel,
  TabPanels,
} from '@chakra-ui/react';
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
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('orders'); // Add state for active tab

  useEffect(() => {
    // Simulate loading and authentication check
    const checkAuth = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // TEMPORARY: Setting authentication to true for testing purposes
      // IMPORTANT: Restore this to proper authentication check before production
      setIsAuthenticated(true); // Temporarily bypassing authentication
      setIsLoading(false);
      
      // Authentication redirect disabled for testing
      // Original code:
      // if (!isAuthenticated) {
      //   setTimeout(() => {
      //     router.push('/auth/signin?redirect=/admin');
      //   }, 1500);
      // }
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

  const handleApprove = (id: string) => {
    // In a real app, you would call an API to approve the order
    console.log(`Order ${id} approved`);
  };

  const handleReject = (id: string) => {
    // In a real app, you would call an API to reject the order
    console.log(`Order ${id} rejected`);
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
          <Box
            p={6}
            bg={useColorModeValue('white', 'gray.800')}
            shadow="md"
            rounded="lg"
          >
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
          </Box>
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
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} mb={8} gap={4}>
          {dashboardStats.map((stat, index) => (
            <Box
              key={index}
              px={6}
              py={4}
              bg={useColorModeValue('white', 'gray.800')}
              shadow="md"
              rounded="lg"
            >
              <Flex justifyContent="space-between">
                <Box>
                  <Text fontWeight="medium" color={useColorModeValue("gray.600", "gray.300")}>{stat.label}</Text>
                  <Text fontSize="2xl" fontWeight="bold" color={useColorModeValue("gray.800", "white")}>
                    {stat.value}
                  </Text>
                  <Text color={useColorModeValue("gray.600", "gray.400")}>
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
            </Box>
          ))}
        </SimpleGrid>

        <Box>
          <Box mb={4} display="flex" borderBottom="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>
            <Box 
              as="button" 
              px={4} 
              py={2} 
              fontWeight="medium"
              borderBottom={activeTab === 'orders' ? "2px solid" : "none"}
              borderColor={activeTab === 'orders' ? "blue.500" : "transparent"}
              color={activeTab === 'orders' ? "blue.500" : useColorModeValue('gray.600', 'gray.400')}
              _focus={{ outline: 'none' }}
              onClick={() => setActiveTab('orders')}
            >
              Recent Orders
            </Box>
            <Box 
              as="button" 
              px={4} 
              py={2} 
              fontWeight="medium"
              borderBottom={activeTab === 'preorders' ? "2px solid" : "none"}
              borderColor={activeTab === 'preorders' ? "blue.500" : "transparent"}
              color={activeTab === 'preorders' ? "blue.500" : useColorModeValue('gray.600', 'gray.400')}
              _hover={{ color: 'blue.400' }}
              _focus={{ outline: 'none' }}
              onClick={() => setActiveTab('preorders')}
            >
              Pre-Orders
            </Box>
            <Box 
              as="button" 
              px={4} 
              py={2} 
              fontWeight="medium"
              borderBottom={activeTab === 'products' ? "2px solid" : "none"}
              borderColor={activeTab === 'products' ? "blue.500" : "transparent"}
              color={activeTab === 'products' ? "blue.500" : useColorModeValue('gray.600', 'gray.400')}
              _hover={{ color: 'blue.400' }}
              _focus={{ outline: 'none' }}
              onClick={() => setActiveTab('products')}
            >
              Products
            </Box>
            <Box 
              as="button" 
              px={4} 
              py={2} 
              fontWeight="medium"
              borderBottom={activeTab === 'customers' ? "2px solid" : "none"}
              borderColor={activeTab === 'customers' ? "blue.500" : "transparent"}
              color={activeTab === 'customers' ? "blue.500" : useColorModeValue('gray.600', 'gray.400')}
              _hover={{ color: 'blue.400' }}
              _focus={{ outline: 'none' }}
              onClick={() => setActiveTab('customers')}
            >
              Customers
            </Box>
          </Box>

          <Box>
            {/* Recent Orders Panel */}
            {activeTab === 'orders' && (
              <>
                <HStack mb={4}>
                  <Box position="relative" maxW="300px">
                    <Box position="absolute" left={3} top="50%" transform="translateY(-50%)">
                      <FiSearch color={useColorModeValue("gray.300", "gray.500")} />
                    </Box>
                    <Input 
                      pl={10} 
                      placeholder="Search orders..." 
                      value={searchQuery}
                      onChange={handleSearchChange}
                      bg={useColorModeValue("white", "gray.800")}
                      borderColor={useColorModeValue("gray.200", "gray.600")}
                    />
                  </Box>
                  
                  <Box maxW="200px">
                    <Select 
                      value={selectedStatus}
                      onChange={handleStatusChange}
                      bg={useColorModeValue("white", "gray.800")}
                      borderColor={useColorModeValue("gray.200", "gray.600")}
                    >
                      <option value="all">All Statuses</option>
                      <option value="completed">Completed</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                    </Select>
                  </Box>
                </HStack>

                <Box overflowX="auto">
                  <TableContainer>
                    <Table width="100%" borderCollapse="collapse">
                      <Thead>
                        <Tr>
                          <Th textAlign="left" py={3} px={4} borderBottom="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>Order ID</Th>
                          <Th textAlign="left" py={3} px={4} borderBottom="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>Customer</Th>
                          <Th textAlign="left" py={3} px={4} borderBottom="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>Date</Th>
                          <Th textAlign="left" py={3} px={4} borderBottom="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>Amount</Th>
                          <Th textAlign="left" py={3} px={4} borderBottom="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>Status</Th>
                          <Th textAlign="left" py={3} px={4} borderBottom="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>Actions</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
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
                            <Tr key={order.id}>
                              <Td py={3} px={4} borderBottom="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>{order.id}</Td>
                              <Td py={3} px={4} borderBottom="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>{order.customer}</Td>
                              <Td py={3} px={4} borderBottom="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>{order.date}</Td>
                              <Td py={3} px={4} borderBottom="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>{order.amount}</Td>
                              <Td py={3} px={4} borderBottom="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>
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
                              <Td py={3} px={4} borderBottom="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>
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
              </>
            )}

            {/* Pre-Orders Panel */}
            {activeTab === 'preorders' && (
              <>
                <HStack mb={4}>
                  <Box position="relative" maxW="300px">
                    <Box position="absolute" left={3} top="50%" transform="translateY(-50%)">
                      <FiSearch color={useColorModeValue("gray.300", "gray.500")} />
                    </Box>
                    <Input 
                      pl={10} 
                      placeholder="Search pre-orders..." 
                      value={searchQuery}
                      onChange={handleSearchChange}
                      bg={useColorModeValue("white", "gray.800")}
                      borderColor={useColorModeValue("gray.200", "gray.600")}
                    />
                  </Box>
                </HStack>

                <Box overflowX="auto">
                  <TableContainer>
                    <Table width="100%" borderCollapse="collapse">
                      <Thead>
                        <Tr>
                          <Th textAlign="left" py={3} px={4} borderBottom="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>Pre-Order ID</Th>
                          <Th textAlign="left" py={3} px={4} borderBottom="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>Customer</Th>
                          <Th textAlign="left" py={3} px={4} borderBottom="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>Date</Th>
                          <Th textAlign="left" py={3} px={4} borderBottom="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>Amount</Th>
                          <Th textAlign="left" py={3} px={4} borderBottom="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>Est. Shipping</Th>
                          <Th textAlign="left" py={3} px={4} borderBottom="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>Actions</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {preOrders
                          .filter(
                            order =>
                              searchQuery === '' ||
                              order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              order.customer.toLowerCase().includes(searchQuery.toLowerCase())
                          )
                          .map(order => (
                            <Tr key={order.id}>
                              <Td py={3} px={4} borderBottom="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>{order.id}</Td>
                              <Td py={3} px={4} borderBottom="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>{order.customer}</Td>
                              <Td py={3} px={4} borderBottom="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>{order.date}</Td>
                              <Td py={3} px={4} borderBottom="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>{order.amount}</Td>
                              <Td py={3} px={4} borderBottom="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>{order.estimatedShipping}</Td>
                              <Td py={3} px={4} borderBottom="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>
                                <HStack>
                                  <Button
                                    size="sm"
                                    colorScheme="green"
                                    onClick={() => handleApprove(order.id)}
                                  >
                                    Approve
                                  </Button>
                                  <Button
                                    size="sm"
                                    colorScheme="red"
                                    onClick={() => handleReject(order.id)}
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
              </>
            )}

            {/* Products Panel */}
            {activeTab === 'products' && (
              <>
                <HStack mb={4}>
                  <Box position="relative" maxW="300px">
                    <Box position="absolute" left={3} top="50%" transform="translateY(-50%)">
                      <FiSearch color={useColorModeValue("gray.300", "gray.500")} />
                    </Box>
                    <Input 
                      pl={10} 
                      placeholder="Search products..." 
                      value={searchQuery}
                      onChange={handleSearchChange}
                      bg={useColorModeValue("white", "gray.800")}
                      borderColor={useColorModeValue("gray.200", "gray.600")}
                    />
                  </Box>
                  
                  <Box maxW="200px">
                    <Select 
                      value={selectedCategory}
                      onChange={handleCategoryChange}
                      bg={useColorModeValue("white", "gray.800")}
                      borderColor={useColorModeValue("gray.200", "gray.600")}
                    >
                      <option value="all">All Categories</option>
                      <option value="fashion">Fashion</option>
                      <option value="food">Food & Beverage</option>
                      <option value="home">Home Decor</option>
                    </Select>
                  </Box>
                </HStack>

                <Box overflowX="auto">
                  <TableContainer>
                    <Table width="100%" borderCollapse="collapse">
                      <Thead>
                        <Tr>
                          <Th textAlign="left" py={3} px={4} borderBottom="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>Product ID</Th>
                          <Th textAlign="left" py={3} px={4} borderBottom="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>Name</Th>
                          <Th textAlign="left" py={3} px={4} borderBottom="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>Category</Th>
                          <Th textAlign="left" py={3} px={4} borderBottom="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>Price</Th>
                          <Th textAlign="left" py={3} px={4} borderBottom="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>Stock</Th>
                          <Th textAlign="left" py={3} px={4} borderBottom="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>Origin</Th>
                          <Th textAlign="left" py={3} px={4} borderBottom="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>Actions</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {products
                          .filter(
                            product =>
                              (selectedCategory === 'all' ||
                              product.category.toLowerCase().includes(selectedCategory.toLowerCase())) &&
                              (searchQuery === '' ||
                              product.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              product.name.toLowerCase().includes(searchQuery.toLowerCase()))
                          )
                          .map(product => (
                            <Tr key={product.id}>
                              <Td py={3} px={4} borderBottom="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>{product.id}</Td>
                              <Td py={3} px={4} borderBottom="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>{product.name}</Td>
                              <Td py={3} px={4} borderBottom="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>{product.category}</Td>
                              <Td py={3} px={4} borderBottom="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>{product.price}</Td>
                              <Td py={3} px={4} borderBottom="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>{product.stock}</Td>
                              <Td py={3} px={4} borderBottom="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>{product.origin}</Td>
                              <Td py={3} px={4} borderBottom="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>
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
              </>
            )}

            {/* Customers Panel - Placeholder for now */}
            {activeTab === 'customers' && (
              <Box p={4} textAlign="center" bg={useColorModeValue('white', 'gray.800')} borderRadius="md">
                <Text>Customer management coming soon</Text>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </MainLayout>
  );
}
