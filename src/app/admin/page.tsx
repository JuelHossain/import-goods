'use client';

import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Icon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Badge,
  useColorModeValue,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  HStack,
  Select,
  Input,
  InputGroup,
  InputLeftElement,
  Card,
  CardBody,
  Stack,
  Divider,
  useToast,
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
    value: 842,
    change: 8.2,
    icon: FiShoppingBag,
    color: 'green.500',
  },
  {
    label: 'Revenue',
    value: '$156,432',
    change: 23.1,
    icon: FiDollarSign,
    color: 'purple.500',
  },
  {
    label: 'Pre-Orders',
    value: 54,
    change: -4.3,
    icon: FiActivity,
    color: 'orange.500',
  },
];

// Mock recent orders
const recentOrders = [
  {
    id: 'ORD-001',
    customer: 'John Smith',
    date: '2023-05-15',
    amount: '$299.00',
    status: 'Completed',
  },
  {
    id: 'ORD-002',
    customer: 'Sarah Johnson',
    date: '2023-05-14',
    amount: '$189.00',
    status: 'Processing',
  },
  {
    id: 'ORD-003',
    customer: 'Michael Brown',
    date: '2023-05-14',
    amount: '$49.00',
    status: 'Completed',
  },
  {
    id: 'ORD-004',
    customer: 'Emily Davis',
    date: '2023-05-13',
    amount: '$599.00',
    status: 'Shipped',
  },
  {
    id: 'ORD-005',
    customer: 'David Wilson',
    date: '2023-05-12',
    amount: '$79.00',
    status: 'Completed',
  },
];

// Mock pre-orders
const preOrders = [
  {
    id: 'PRE-001',
    customer: 'Alex Johnson',
    date: '2023-05-15',
    productLink: 'https://example-merchant.com/product/123',
    status: 'Pending',
  },
  {
    id: 'PRE-002',
    customer: 'Jessica Williams',
    date: '2023-05-14',
    productLink: 'https://another-merchant.com/item/456',
    status: 'Approved',
  },
  {
    id: 'PRE-003',
    customer: 'Robert Miller',
    date: '2023-05-13',
    productLink: 'https://luxury-items.com/watch/789',
    status: 'Processing',
  },
  {
    id: 'PRE-004',
    customer: 'Lisa Brown',
    date: '2023-05-12',
    productLink: 'https://artisan-goods.com/ceramics/101',
    status: 'Pending',
  },
  {
    id: 'PRE-005',
    customer: 'Daniel Taylor',
    date: '2023-05-11',
    productLink: 'https://global-market.com/textiles/202',
    status: 'Rejected',
  },
];

export default function AdminDashboard() {
  const router = useRouter();
  const toast = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // In a real app, you would check if the user is authenticated and has admin privileges
  useEffect(() => {
    const checkAuth = async () => {
      // Simulate authentication check
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll just set this to true
      // In a real app, you would check with your auth provider
      setIsAuthenticated(true);
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  // Handle order status change
  const handleStatusChange = (orderId: string, newStatus: string) => {
    toast({
      title: 'Status updated',
      description: `Order ${orderId} status changed to ${newStatus}`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  // Handle pre-order approval or rejection
  const handlePreOrderAction = (preOrderId: string, action: 'approve' | 'reject') => {
    toast({
      title: action === 'approve' ? 'Pre-order approved' : 'Pre-order rejected',
      description: `Pre-order ${preOrderId} has been ${action === 'approve' ? 'approved' : 'rejected'}`,
      status: action === 'approve' ? 'success' : 'info',
      duration: 3000,
      isClosable: true,
    });
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
              <Stack spacing={4} align="center">
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
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
          {dashboardStats.map((stat, index) => (
            <Stat
              key={index}
              px={6}
              py={4}
              bg={useColorModeValue('white', 'gray.700')}
              shadow="md"
              rounded="lg"
            >
              <Flex justifyContent="space-between">
                <Box>
                  <StatLabel fontWeight="medium">{stat.label}</StatLabel>
                  <StatNumber fontSize="2xl" fontWeight="bold">
                    {stat.value}
                  </StatNumber>
                  <StatHelpText>
                    <StatArrow type={stat.change > 0 ? 'increase' : 'decrease'} />
                    {Math.abs(stat.change)}% since last month
                  </StatHelpText>
                </Box>
                <Box
                  my="auto"
                  color={stat.color}
                  alignContent="center"
                >
                  <Icon as={stat.icon} w={8} h={8} />
                </Box>
              </Flex>
            </Stat>
          ))}
        </SimpleGrid>

        <Tabs colorScheme="brand" variant="enclosed">
          <TabList>
            <Tab>Recent Orders</Tab>
            <Tab>Pre-Orders</Tab>
            <Tab>Products</Tab>
            <Tab>Customers</Tab>
          </TabList>

          <TabPanels>
            {/* Recent Orders Panel */}
            <TabPanel>
              <HStack spacing={4} mb={4}>
                <InputGroup maxW="300px">
                  <InputLeftElement pointerEvents="none">
                    <FiSearch color="gray.300" />
                  </InputLeftElement>
                  <Input placeholder="Search orders..." />
                </InputGroup>
                <Select placeholder="Filter by status" maxW="200px">
                  <option value="all">All Statuses</option>
                  <option value="completed">Completed</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                </Select>
              </HStack>

              <Box overflowX="auto">
                <Table variant="simple">
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
                    {recentOrders.map((order) => (
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
                          <HStack spacing={2}>
                            <Select
                              size="sm"
                              defaultValue={order.status.toLowerCase()}
                              onChange={(e) => handleStatusChange(order.id, e.target.value)}
                              width="140px"
                            >
                              <option value="pending">Pending</option>
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </Select>
                            <Button size="sm" colorScheme="brand">
                              View
                            </Button>
                          </HStack>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </TabPanel>

            {/* Pre-Orders Panel */}
            <TabPanel>
              <HStack spacing={4} mb={4}>
                <InputGroup maxW="300px">
                  <InputLeftElement pointerEvents="none">
                    <FiSearch color="gray.300" />
                  </InputLeftElement>
                  <Input placeholder="Search pre-orders..." />
                </InputGroup>
                <Select placeholder="Filter by status" maxW="200px">
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="processing">Processing</option>
                  <option value="rejected">Rejected</option>
                </Select>
              </HStack>

              <Box overflowX="auto">
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Pre-Order ID</Th>
                      <Th>Customer</Th>
                      <Th>Date</Th>
                      <Th>Product Link</Th>
                      <Th>Status</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {preOrders.map((preOrder) => (
                      <Tr key={preOrder.id}>
                        <Td>{preOrder.id}</Td>
                        <Td>{preOrder.customer}</Td>
                        <Td>{preOrder.date}</Td>
                        <Td>
                          <Text
                            maxW="200px"
                            overflow="hidden"
                            textOverflow="ellipsis"
                            whiteSpace="nowrap"
                          >
                            {preOrder.productLink}
                          </Text>
                        </Td>
                        <Td>
                          <Badge
                            colorScheme={
                              preOrder.status === 'Approved'
                                ? 'green'
                                : preOrder.status === 'Rejected'
                                ? 'red'
                                : preOrder.status === 'Processing'
                                ? 'blue'
                                : 'yellow'
                            }
                          >
                            {preOrder.status}
                          </Badge>
                        </Td>
                        <Td>
                          <HStack spacing={2}>
                            <Button
                              size="sm"
                              colorScheme="green"
                              isDisabled={preOrder.status === 'Approved' || preOrder.status === 'Rejected'}
                              onClick={() => handlePreOrderAction(preOrder.id, 'approve')}
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              colorScheme="red"
                              isDisabled={preOrder.status === 'Approved' || preOrder.status === 'Rejected'}
                              onClick={() => handlePreOrderAction(preOrder.id, 'reject')}
                            >
                              Reject
                            </Button>
                            <Button size="sm" colorScheme="brand">
                              View
                            </Button>
                          </HStack>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </TabPanel>

            {/* Products Panel */}
            <TabPanel>
              <Text fontSize="lg" mb={4}>
                Products management functionality will be implemented in the next phase.
              </Text>
              <Button colorScheme="brand">Add New Product</Button>
            </TabPanel>

            {/* Customers Panel */}
            <TabPanel>
              <Text fontSize="lg" mb={4}>
                Customer management functionality will be implemented in the next phase.
              </Text>
              <Button colorScheme="brand">View All Customers</Button>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </MainLayout>
  );
}
