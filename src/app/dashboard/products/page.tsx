'use client';

import { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Button,
  HStack,
  Input,
  IconButton,
  Menu as ChakraMenu,
  MenuButton as ChakraMenuButton,
  MenuList as ChakraMenuList,
  MenuItem as ChakraMenuItem,
  SimpleGrid,
  Text,
  Image,
  VStack,
  useDisclosure,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { SearchIcon, AddIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { FiGrid, FiList } from 'react-icons/fi';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, Container, Badge, Table, Modal } from '@/components/common';
import { useCommonColors } from '@/utils/colorModeValues';
import { formatPrice } from '@/utils/helpers';

// Mock data for products
const products = [
  {
    id: 'PROD-001',
    name: 'Premium Leather Sofa',
    category: 'Furniture',
    price: 1299.99,
    stock: 15,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 'PROD-002',
    name: 'Handcrafted Ceramic Vase',
    category: 'Home Decor',
    price: 89.99,
    stock: 28,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  },
  {
    id: 'PROD-003',
    name: 'Organic Cotton Bedding Set',
    category: 'Bedding',
    price: 199.99,
    stock: 22,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80',
  },
  {
    id: 'PROD-004',
    name: 'Teak Wood Dining Table',
    category: 'Furniture',
    price: 899.99,
    stock: 8,
    status: 'low_stock',
    image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
  },
  {
    id: 'PROD-005',
    name: 'Handwoven Wool Rug',
    category: 'Home Decor',
    price: 349.99,
    stock: 12,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1575414003880-048b61ae26bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 'PROD-006',
    name: 'Marble Coffee Table',
    category: 'Furniture',
    price: 599.99,
    stock: 0,
    status: 'out_of_stock',
    image: 'https://images.unsplash.com/photo-1619596662481-5c4e31900094?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  },
  {
    id: 'PROD-007',
    name: 'Bamboo Cutting Board Set',
    category: 'Kitchen',
    price: 49.99,
    stock: 35,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 'PROD-008',
    name: 'Linen Curtains',
    category: 'Home Decor',
    price: 129.99,
    stock: 18,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80',
  },
];

// View types
type ViewType = 'grid' | 'list';

/**
 * Products dashboard page component
 */
export default function ProductsDashboard() {
  const colors = useCommonColors();
  const [viewType, setViewType] = useState<ViewType>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  // Filter products by search query
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Product status badge
  const getStatusBadge = (status: string, stock: number) => {
    switch (status) {
      case 'active':
        return <Badge status="success">Active</Badge>;
      case 'low_stock':
        return <Badge status="warning">Low Stock ({stock})</Badge>;
      case 'out_of_stock':
        return <Badge status="error">Out of Stock</Badge>;
      default:
        return <Badge status="default">{status}</Badge>;
    }
  };

  // Table columns for products
  const productColumns = [
    {
      header: 'Product',
      accessor: 'name',
      cell: (value: string, item: Record<string, unknown>) => (
        <HStack spacing={3}>
          <Image
            src={item.image as string}
            alt={value}
            boxSize="40px"
            objectFit="cover"
            borderRadius="md"
          />
          <Text fontWeight="medium">{value}</Text>
        </HStack>
      ),
    },
    {
      header: 'ID',
      accessor: 'id',
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
      header: 'Status',
      accessor: 'status',
      cell: (value: string, item: Record<string, unknown>) => getStatusBadge(value, item.stock as number),
    },
    {
      header: 'Actions',
      accessor: 'id',
      cell: () => (
        <HStack spacing={2}>
          <Button size="sm" variant="ghost">Edit</Button>
          <Button size="sm" variant="ghost" colorScheme="red">Delete</Button>
        </HStack>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <Container>
        <Flex justifyContent="space-between" alignItems="center" mb={6}>
          <Heading as="h1" size="lg">
            Products
          </Heading>
          <Button
            leftIcon={<AddIcon />}
            colorScheme="blue"
            onClick={onOpen}
          >
            Add Product
          </Button>
        </Flex>

        {/* Filters and search */}
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ base: 'stretch', md: 'center' }}
          mb={6}
          gap={4}
        >
          <InputGroup maxW={{ base: 'full', md: '320px' }}>
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              bg={colors.inputBg}
              borderColor={colors.borderColor}
            />
            <InputRightElement>
              <SearchIcon color={colors.textSecondary} />
            </InputRightElement>
          </InputGroup>

          <HStack spacing={4}>
            <ChakraMenu>
              <ChakraMenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                variant="outline"
                size="md"
              >
                Category
              </ChakraMenuButton>
              <ChakraMenuList>
                <ChakraMenuItem>All Categories</ChakraMenuItem>
                <ChakraMenuItem>Furniture</ChakraMenuItem>
                <ChakraMenuItem>Home Decor</ChakraMenuItem>
                <ChakraMenuItem>Bedding</ChakraMenuItem>
                <ChakraMenuItem>Kitchen</ChakraMenuItem>
              </ChakraMenuList>
            </ChakraMenu>

            <ChakraMenu>
              <ChakraMenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                variant="outline"
                size="md"
              >
                Status
              </ChakraMenuButton>
              <ChakraMenuList>
                <ChakraMenuItem>All Status</ChakraMenuItem>
                <ChakraMenuItem>Active</ChakraMenuItem>
                <ChakraMenuItem>Low Stock</ChakraMenuItem>
                <ChakraMenuItem>Out of Stock</ChakraMenuItem>
              </ChakraMenuList>
            </ChakraMenu>

            <HStack spacing={2} display={{ base: 'none', md: 'flex' }}>
              <IconButton
                aria-label="Grid view"
                icon={<FiGrid />}
                variant={viewType === 'grid' ? 'solid' : 'outline'}
                colorScheme={viewType === 'grid' ? 'blue' : 'gray'}
                onClick={() => setViewType('grid')}
              />
              <IconButton
                aria-label="List view"
                icon={<FiList />}
                variant={viewType === 'list' ? 'solid' : 'outline'}
                colorScheme={viewType === 'list' ? 'blue' : 'gray'}
                onClick={() => setViewType('list')}
              />
            </HStack>
          </HStack>
        </Flex>

        {/* Products list/grid */}
        {viewType === 'list' ? (
          <Card>
            <Table
              columns={productColumns}
              data={filteredProducts}
              emptyMessage="No products found"
              isScrollable
            />
          </Card>
        ) : (
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
            {filteredProducts.map((product) => (
              <Card key={product.id} p={0} overflow="hidden" h="100%">
                <Image
                  src={product.image}
                  alt={product.name}
                  h="180px"
                  w="full"
                  objectFit="cover"
                />
                <Box p={4}>
                  <VStack align="start" spacing={2}>
                    <Heading as="h3" size="sm" noOfLines={2}>
                      {product.name}
                    </Heading>
                    <Text fontSize="sm" color={colors.textSecondary}>
                      {product.category}
                    </Text>
                    <Text fontWeight="bold" fontSize="lg">
                      {formatPrice(product.price)}
                    </Text>
                    <HStack justifyContent="space-between" w="full">
                      <Text fontSize="sm">Stock: {product.stock}</Text>
                      {getStatusBadge(product.status, product.stock)}
                    </HStack>
                    <HStack spacing={2} pt={2} w="full">
                      <Button size="sm" variant="outline" flex={1}>
                        Edit
                      </Button>
                      <Button size="sm" colorScheme="red" variant="ghost">
                        Delete
                      </Button>
                    </HStack>
                  </VStack>
                </Box>
              </Card>
            ))}
          </SimpleGrid>
        )}

        {/* Add Product Modal */}
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          title="Add New Product"
          size="xl"
          showCancelButton
          showConfirmButton
          confirmText="Save Product"
        >
          <VStack spacing={4} align="stretch">
            <Input label="Product Name" placeholder="Enter product name" />
            <Input label="Product ID" placeholder="Enter product ID" />
            <Input label="Price" placeholder="Enter price" type="number" />
            <Input label="Stock" placeholder="Enter stock quantity" type="number" />
            <Input label="Image URL" placeholder="Enter image URL" />
          </VStack>
        </Modal>
      </Container>
    </DashboardLayout>
  );
}
