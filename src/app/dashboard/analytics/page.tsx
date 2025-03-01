'use client';

import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  HStack,
  VStack,
  Select as ChakraSelect,
  Divider,
} from '@chakra-ui/react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, Container, Tabs } from '@/components/common';
import { useCommonColors } from '@/utils/colorModeValues';
import { formatPrice } from '@/utils/helpers';

/**
 * Analytics dashboard page component
 */
export default function AnalyticsDashboard() {
  const colors = useCommonColors();

  // Mock data for revenue chart
  const revenueData = [
    { month: 'Jan', revenue: 42500 },
    { month: 'Feb', revenue: 47800 },
    { month: 'Mar', revenue: 54200 },
    { month: 'Apr', revenue: 58900 },
    { month: 'May', revenue: 63400 },
    { month: 'Jun', revenue: 69800 },
    { month: 'Jul', revenue: 75200 },
    { month: 'Aug', revenue: 82500 },
    { month: 'Sep', revenue: 89700 },
    { month: 'Oct', revenue: 96300 },
    { month: 'Nov', revenue: 105800 },
    { month: 'Dec', revenue: 124500 },
  ];

  // Mock data for top categories
  const topCategories = [
    { name: 'Furniture', sales: 245, percentage: 35 },
    { name: 'Home Decor', sales: 189, percentage: 27 },
    { name: 'Bedding', sales: 132, percentage: 19 },
    { name: 'Kitchen', sales: 98, percentage: 14 },
    { name: 'Lighting', sales: 35, percentage: 5 },
  ];

  // Mock data for top countries
  const topCountries = [
    { name: 'United States', sales: 312, percentage: 37 },
    { name: 'Canada', sales: 198, percentage: 23 },
    { name: 'United Kingdom', sales: 154, percentage: 18 },
    { name: 'Australia', sales: 87, percentage: 10 },
    { name: 'Germany', sales: 65, percentage: 8 },
    { name: 'Others', sales: 26, percentage: 4 },
  ];

  // Tabs for the analytics
  const analyticsTabs = [
    {
      label: 'Categories',
      content: (
        <VStack spacing={4} align="stretch">
          {topCategories.map((category, index) => (
            <Box key={index}>
              <Flex justify="space-between" mb={2}>
                <Text fontWeight="medium">{category.name}</Text>
                <Text>{category.sales} sales</Text>
              </Flex>
              <Box
                w="100%"
                h="8px"
                bg={colors.hoverBg}
                borderRadius="full"
                overflow="hidden"
              >
                <Box
                  h="100%"
                  w={`${category.percentage}%`}
                  bg={colors.bgPrimary}
                  borderRadius="full"
                />
              </Box>
              <Text fontSize="sm" color={colors.textSecondary} mt={1}>
                {category.percentage}% of total sales
              </Text>
              {index < topCategories.length - 1 && <Divider my={3} />}
            </Box>
          ))}
        </VStack>
      ),
    },
    {
      label: 'Countries',
      content: (
        <VStack spacing={4} align="stretch">
          {topCountries.map((country, index) => (
            <Box key={index}>
              <Flex justify="space-between" mb={2}>
                <Text fontWeight="medium">{country.name}</Text>
                <Text>{country.sales} sales</Text>
              </Flex>
              <Box
                w="100%"
                h="8px"
                bg={colors.hoverBg}
                borderRadius="full"
                overflow="hidden"
              >
                <Box
                  h="100%"
                  w={`${country.percentage}%`}
                  bg={colors.bgPrimary}
                  borderRadius="full"
                />
              </Box>
              <Text fontSize="sm" color={colors.textSecondary} mt={1}>
                {country.percentage}% of total sales
              </Text>
              {index < topCountries.length - 1 && <Divider my={3} />}
            </Box>
          ))}
        </VStack>
      ),
    },
  ];

  // Revenue stats
  const revenueStats = [
    {
      label: 'Total Revenue',
      value: formatPrice(124500),
    },
    {
      label: 'Average Order Value',
      value: formatPrice(147.86),
    },
    {
      label: 'Conversion Rate',
      value: '3.2%',
    },
    {
      label: 'Profit Margin',
      value: '24.8%',
    },
  ];

  return (
    <DashboardLayout>
      <Container>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          mb={6}
          flexDir={{ base: 'column', md: 'row' }}
          gap={{ base: 4, md: 0 }}
        >
          <Heading as="h1" size="lg">
            Analytics
          </Heading>
          <HStack spacing={4}>
            <ChakraSelect
              defaultValue="last30days"
              w={{ base: 'full', md: '200px' }}
              bg={colors.inputBg}
              borderColor={colors.borderPrimary}
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="last7days">Last 7 Days</option>
              <option value="last30days">Last 30 Days</option>
              <option value="thisMonth">This Month</option>
              <option value="lastMonth">Last Month</option>
              <option value="thisYear">This Year</option>
            </ChakraSelect>
          </HStack>
        </Flex>

        {/* Revenue Stats */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
          {revenueStats.map((stat, index) => (
            <Card key={index} p={6}>
              <VStack spacing={1} align="start">
                <Text color={colors.textSecondary}>{stat.label}</Text>
                <Text fontSize="2xl" fontWeight="bold">
                  {stat.value}
                </Text>
              </VStack>
            </Card>
          ))}
        </SimpleGrid>

        {/* Revenue Chart */}
        <Card mb={8}>
          <Flex
            p={4}
            borderBottomWidth="1px"
            borderBottomColor={colors.borderPrimary}
            justifyContent="space-between"
            alignItems="center"
          >
            <Heading as="h2" size="md">
              Revenue Overview
            </Heading>
            <ChakraSelect
              defaultValue="thisYear"
              w="150px"
              size="sm"
              bg={colors.inputBg}
              borderColor={colors.borderPrimary}
            >
              <option value="thisYear">This Year</option>
              <option value="lastYear">Last Year</option>
              <option value="last2Years">Last 2 Years</option>
            </ChakraSelect>
          </Flex>
          <Box p={4} h="300px">
            {/* This would be a chart component in a real application */}
            <Flex h="100%" align="flex-end">
              {revenueData.map((item, index) => (
                <Flex
                  key={index}
                  direction="column"
                  align="center"
                  flex={1}
                  h="100%"
                  justify="flex-end"
                >
                  <Box
                    w="70%"
                    bg={colors.bgPrimary}
                    h={`${(item.revenue / 124500) * 100}%`}
                    borderRadius="sm"
                    transition="height 0.3s"
                    _hover={{
                      bg: colors.hoverBg,
                    }}
                  />
                  <Text fontSize="xs" mt={2} color={colors.textSecondary}>
                    {item.month}
                  </Text>
                </Flex>
              ))}
            </Flex>
          </Box>
        </Card>

        {/* Sales by Category and Country */}
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} mb={8}>
          <Card>
            <Flex
              p={4}
              borderBottomWidth="1px"
              borderBottomColor={colors.borderPrimary}
              justifyContent="space-between"
              alignItems="center"
            >
              <Heading as="h2" size="md">
                Sales Distribution
              </Heading>
            </Flex>
            <Box p={4}>
              <Tabs tabs={analyticsTabs} variant="enclosed" isCard />
            </Box>
          </Card>

          <Card>
            <Flex
              p={4}
              borderBottomWidth="1px"
              borderBottomColor={colors.borderPrimary}
              justifyContent="space-between"
              alignItems="center"
            >
              <Heading as="h2" size="md">
                Sales Performance
              </Heading>
            </Flex>
            <Box p={4}>
              <SimpleGrid columns={2} spacing={4}>
                <Card p={4} bg={colors.bgSecondary}>
                  <VStack spacing={1} align="center">
                    <Text color={colors.textSecondary}>Total Orders</Text>
                    <Text fontSize="3xl" fontWeight="bold">
                      842
                    </Text>
                    <Text fontSize="sm" color="green.500">
                      +12.5% vs last period
                    </Text>
                  </VStack>
                </Card>
                <Card p={4} bg={colors.bgSecondary}>
                  <VStack spacing={1} align="center">
                    <Text color={colors.textSecondary}>Conversion Rate</Text>
                    <Text fontSize="3xl" fontWeight="bold">
                      3.2%
                    </Text>
                    <Text fontSize="sm" color="green.500">
                      +0.8% vs last period
                    </Text>
                  </VStack>
                </Card>
                <Card p={4} bg={colors.bgSecondary}>
                  <VStack spacing={1} align="center">
                    <Text color={colors.textSecondary}>Avg. Order Value</Text>
                    <Text fontSize="3xl" fontWeight="bold">
                      $148
                    </Text>
                    <Text fontSize="sm" color="green.500">
                      +5.2% vs last period
                    </Text>
                  </VStack>
                </Card>
                <Card p={4} bg={colors.bgSecondary}>
                  <VStack spacing={1} align="center">
                    <Text color={colors.textSecondary}>Return Rate</Text>
                    <Text fontSize="3xl" fontWeight="bold">
                      2.4%
                    </Text>
                    <Text fontSize="sm" color="red.500">
                      +0.3% vs last period
                    </Text>
                  </VStack>
                </Card>
              </SimpleGrid>
            </Box>
          </Card>
        </SimpleGrid>
      </Container>
    </DashboardLayout>
  );
}
