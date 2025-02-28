'use client';

import {
  Box,
  Container,
  Heading,
  Text,
  useColorMode,
  Stack,
  TableContainer,
  Table,
  Tbody,
  Thead,
  Tr,
  Th,
  Td,
  Badge,
  Button,
  Spinner,
  Center,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import NextLink from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';
// import { supabase } from '@/lib/supabase';

type Order = {
  id: string;
  created_at: string;
  status: string;
  total_amount: number;
  tracking_number: string | null;
  order_items: OrderItem[];
};

type OrderItem = {
  id: string;
  product_id: string;
  quantity: number;
  price: number;
  product: {
    name: string;
    image_url: string;
  };
};

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { colorMode } = useColorMode();

  const bgColor = colorMode === 'light' ? 'white' : 'gray.700';

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        
        // For now, we'll use mock data
        // In a real app, you would fetch from Supabase
        // const { data, error } = await supabase
        //   .from('orders')
        //   .select('*, order_items(*, product(name, image_url))')
        //   .eq('user_id', user.id)
        //   .order('created_at', { ascending: false });
        
        // if (error) throw error;
        
        // Mock data for demonstration
        const mockOrders: Order[] = [
          {
            id: '1',
            created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'delivered',
            total_amount: 1299.99,
            tracking_number: 'TRK123456789',
            order_items: [
              {
                id: '1',
                product_id: '1',
                quantity: 1,
                price: 1299.99,
                product: {
                  name: 'Premium Leather Sofa',
                  image_url: '/images/products/sofa.jpg',
                },
              },
            ],
          },
          {
            id: '2',
            created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'shipped',
            total_amount: 499.98,
            tracking_number: 'TRK987654321',
            order_items: [
              {
                id: '2',
                product_id: '2',
                quantity: 2,
                price: 249.99,
                product: {
                  name: 'Modern Coffee Table',
                  image_url: '/images/products/table.jpg',
                },
              },
            ],
          },
          {
            id: '3',
            created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'processing',
            total_amount: 799.99,
            tracking_number: null,
            order_items: [
              {
                id: '3',
                product_id: '3',
                quantity: 1,
                price: 799.99,
                product: {
                  name: 'Ergonomic Office Chair',
                  image_url: '/images/products/chair.jpg',
                },
              },
            ],
          },
        ];
        
        setOrders(mockOrders);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load your orders. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'green';
      case 'shipped':
        return 'blue';
      case 'processing':
        return 'orange';
      case 'cancelled':
        return 'red';
      default:
        return 'gray';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <ProtectedRoute>
      <MainLayout>
        <Container maxW="container.xl" py={{ base: 12, md: 24 }}>
          <Stack spacing={8}>
            <Heading fontSize="4xl">Your Orders</Heading>
            
            {isLoading ? (
              <Center py={10}>
                <Spinner size="xl" color="brand.500" />
              </Center>
            ) : error ? (
              <Alert status="error" borderRadius="md">
                <AlertIcon />
                {error}
              </Alert>
            ) : orders.length === 0 ? (
              <Box
                rounded="lg"
                bg={bgColor}
                boxShadow="lg"
                p={8}
                textAlign="center"
              >
                <Text fontSize="lg" mb={4}>You haven&apos;t placed any orders yet.</Text>
                <Button
                  as={NextLink}
                  href="/products"
                  colorScheme="blue"
                >
                  Browse Products
                </Button>
              </Box>
            ) : (
              <Box
                rounded="lg"
                bg={bgColor}
                boxShadow="lg"
                p={8}
                overflowX="auto"
              >
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Order ID</Th>
                        <Th>Date</Th>
                        <Th>Items</Th>
                        <Th>Total</Th>
                        <Th>Status</Th>
                        <Th>Tracking</Th>
                        <Th>Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {orders.map((order) => (
                        <Tr key={order.id}>
                          <Td>#{order.id}</Td>
                          <Td>{formatDate(order.created_at)}</Td>
                          <Td>
                            {order.order_items.map((item) => (
                              <Text key={item.id}>
                                {item.quantity} x {item.product.name}
                              </Text>
                            ))}
                          </Td>
                          <Td>{formatCurrency(order.total_amount)}</Td>
                          <Td>
                            <Badge colorScheme={getStatusColor(order.status)}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </Badge>
                          </Td>
                          <Td>
                            {order.tracking_number ? (
                              order.tracking_number
                            ) : (
                              <Text color="gray.500">Not available</Text>
                            )}
                          </Td>
                          <Td>
                            <Button
                              as={NextLink}
                              href={`/orders/${order.id}`}
                              size="sm"
                              colorScheme="blue"
                            >
                              View Details
                            </Button>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
            )}
          </Stack>
        </Container>
      </MainLayout>
    </ProtectedRoute>
  );
}
