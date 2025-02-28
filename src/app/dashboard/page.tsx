'use client';

import {
  Box,
  SimpleGrid,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Icon,
  Text,
  Heading,
  useBreakpointValue,
} from '@chakra-ui/react';
import { FiUsers, FiShoppingCart, FiDollarSign, FiPackage } from 'react-icons/fi';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, Container, Table, Badge, Tabs } from '@/components/common';
import { useCommonColors } from '@/utils/colorModeValues';
import { formatPrice } from '@/utils/helpers';

// Mock data for statistics
const stats = [
  {
    id: 1,
    label: 'Total Revenue',
    value: 124500,
    change: 23.36,
    icon: FiDollarSign,
    format: (val: number) => formatPrice(val),
  },
  {
    id: 2,
    label: 'Total Orders',
    value: 842,
    change: 12.05,
    icon: FiShoppingCart,
  },
  {
    id: 3,
    label: 'Total Customers',
    value: 1249,
    change: 18.87,
    icon: FiUsers,
  },
  {
    id: 4,
    label: 'Products',
    value: 156,
    change: -2.34,
    icon: FiPackage,
  },
];

// Mock data for recent orders
const recentOrders = [
  {
    id: 'ORD-001',
    customer: 'John Doe',
    date: '2025-02-27',
    amount: 1299.99,
    status: 'completed',
  },
  {
    id: 'ORD-002',
    customer: 'Jane Smith',
    date: '2025-02-26',
    amount: 849.50,
    status: 'processing',
  },
  {
    id: 'ORD-003',
    customer: 'Robert Johnson',
    date: '2025-02-25',
    amount: 2499.99,
    status: 'completed',
  },
  {
    id: 'ORD-004',
    customer: 'Emily Davis',
    date: '2025-02-24',
    amount: 599.99,
    status: 'pending',
  },
  {
    id: 'ORD-005',
    customer: 'Michael Wilson',
    date: '2025-02-23',
    amount: 1899.99,
    status: 'completed',
  },
];

// Mock data for top products
const topProducts = [
  {
    id: 'PROD-001',
    name: 'Premium Leather Sofa',
    category: 'Furniture',
    price: 1299.99,
    stock: 15,
    sales: 42,
  },
  {
    id: 'PROD-002',
    name: 'Handcrafted Ceramic Vase',
    category: 'Home Decor',
    price: 89.99,
    stock: 28,
    sales: 36,
  },
  {
    id: 'PROD-003',
    name: 'Organic Cotton Bedding Set',
    category: 'Bedding',
    price: 199.99,
    stock: 22,
    sales: 31,
  },
  {
    id: 'PROD-004',
    name: 'Teak Wood Dining Table',
    category: 'Furniture',
    price: 899.99,
    stock: 8,
    sales: 27,
  },
  {
    id: 'PROD-005',
    name: 'Handwoven Wool Rug',
    category: 'Home Decor',
    price: 349.99,
    stock: 12,
    sales: 24,
  },
];

/**
 * Dashboard page component
 */
export default function Dashboard() {
  const colors = useCommonColors();
  const statColumns = useBreakpointValue({ base: 1, md: 2, lg: 4 });
  
  // Order status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge status="success">Completed</Badge>;
      case 'processing':
        return <Badge status="info">Processing</Badge>;
      case 'pending':
        return <Badge status="warning">Pending</Badge>;
      default:
        return <Badge status="default">{status}</Badge>;
    }
  };

  // Table columns for recent orders
  const orderColumns = [
    {
      header: 'Order ID',
      accessor: 'id',
    },
    {
      header: 'Customer',
      accessor: 'customer',
    },
    {
      header: 'Date',
      accessor: 'date',
    },
    {
      header: 'Amount',
      accessor: 'amount',
      cell: (value: number) => formatPrice(value),
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (value: string) => getStatusBadge(value),
    },
  ];

  // Table columns for top products
  const productColumns = [
    {
      header: 'Product',
      accessor: 'name',
    },
    {
      header: 'Category',
      accessor: 'category',
    },
    {
      header: 'Price',
      accessor: 'price',
      cell: (value: number) => formatPrice(value),
    },
    {
      header: 'Stock',
      accessor: 'stock',
    },
    {
      header: 'Sales',
      accessor: 'sales',
    },
  ];

  // Tabs for the dashboard
  const dashboardTabs = [
    {
      label: 'Recent Orders',
      content: (
        <Table
          columns={orderColumns}
          data={recentOrders}
          emptyMessage="No recent orders found"
          isScrollable
        />
      ),
    },
    {
      label: 'Top Products',
      content: (
        <Table
          columns={productColumns}
          data={topProducts}
          emptyMessage="No products found"
          isScrollable
        />
      ),
    },
  ];

  return (
    <DashboardLayout>
      <Container>
        <Heading as="h1" size="lg" mb={6}>
          Dashboard
        </Heading>

        {/* Stats */}
        <SimpleGrid columns={statColumns} spacing={6} mb={8}>
          {stats.map((stat) => (
            <Card key={stat.id} p={6}>
              <Flex justifyContent="space-between">
                <Box>
                  <StatLabel color={colors.textSecondary}>{stat.label}</StatLabel>
                  <StatNumber fontSize="2xl" fontWeight="bold">
                    {stat.format ? stat.format(stat.value) : stat.value.toLocaleString()}
                  </StatNumber>
                  <StatHelpText mb={0}>
                    <StatArrow type={stat.change > 0 ? 'increase' : 'decrease'} />
                    {Math.abs(stat.change)}%
                  </StatHelpText>
                </Box>
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  w={12}
                  h={12}
                  borderRadius="md"
                  bg={colors.primary + '20'}
                  color={colors.primary}
                >
                  <Icon as={stat.icon} w={6} h={6} />
                </Flex>
              </Flex>
            </Card>
          ))}
        </SimpleGrid>

        {/* Recent Activity */}
        <Card mb={8}>
          <Flex
            p={4}
            borderBottomWidth="1px"
            borderBottomColor={colors.borderColor}
            justifyContent="space-between"
            alignItems="center"
          >
            <Heading as="h2" size="md">
              Recent Activity
            </Heading>
            <Text color={colors.primary} fontSize="sm" fontWeight="medium" cursor="pointer">
              View All
            </Text>
          </Flex>
          <Box p={0}>
            <Tabs tabs={dashboardTabs} variant="enclosed" isCard />
          </Box>
        </Card>
      </Container>
    </DashboardLayout>
  );
}
