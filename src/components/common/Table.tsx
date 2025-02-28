'use client';

import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  TableProps as ChakraTableProps,
  Box,
  Text,
  Flex,
  Spinner,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useCommonColors } from '@/utils/colorModeValues';
import Card from './Card';

/**
 * Column definition for the table
 */
export interface TableColumn<T = any> {
  /**
   * Unique key for the column
   */
  key: string;
  
  /**
   * Header text for the column
   */
  header: string;
  
  /**
   * Function to render the cell content
   */
  render?: (item: T, index: number) => ReactNode;
  
  /**
   * Width of the column
   */
  width?: string | number;
}

/**
 * Extended table props
 */
export interface CustomTableProps<T = any> extends Omit<ChakraTableProps, 'children'> {
  /**
   * Columns definition for the table
   */
  columns: TableColumn<T>[];
  
  /**
   * Data to display in the table
   */
  data: T[];
  
  /**
   * Whether the table is loading
   * @default false
   */
  isLoading?: boolean;
  
  /**
   * Text to display when there is no data
   * @default 'No data available'
   */
  emptyText?: string;
  
  /**
   * Whether to display the table in a card
   * @default true
   */
  withCard?: boolean;
  
  /**
   * Whether the table is scrollable
   * @default true
   */
  isScrollable?: boolean;
  
  /**
   * Title for the table
   */
  title?: string;
}

/**
 * Custom table component with standardized styling
 */
export function Table<T = any>({
  columns,
  data,
  isLoading = false,
  emptyText = 'No data available',
  withCard = true,
  isScrollable = true,
  title,
  ...props
}: CustomTableProps<T>) {
  const colors = useCommonColors();
  
  const tableContent = (
    <>
      {title && (
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          {title}
        </Text>
      )}
      
      <TableContainer width="100%" overflowX={isScrollable ? 'auto' : 'hidden'}>
        <ChakraTable {...props}>
          <Thead>
            <Tr>
              {columns.map((column) => (
                <Th 
                  key={column.key}
                  width={column.width}
                  color={colors.textSecondary}
                >
                  {column.header}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {isLoading ? (
              <Tr>
                <Td colSpan={columns.length} textAlign="center" py={8}>
                  <Flex justify="center" align="center">
                    <Spinner size="md" color="brand.500" mr={3} />
                    <Text>Loading...</Text>
                  </Flex>
                </Td>
              </Tr>
            ) : data.length === 0 ? (
              <Tr>
                <Td colSpan={columns.length} textAlign="center" py={8}>
                  {emptyText}
                </Td>
              </Tr>
            ) : (
              data.map((item, index) => (
                <Tr key={index}>
                  {columns.map((column) => (
                    <Td key={`${index}-${column.key}`}>
                      {column.render ? column.render(item, index) : (item as any)[column.key]}
                    </Td>
                  ))}
                </Tr>
              ))
            )}
          </Tbody>
        </ChakraTable>
      </TableContainer>
    </>
  );
  
  if (withCard) {
    return (
      <Card p={0} overflow="hidden">
        <Box p={4}>
          {tableContent}
        </Box>
      </Card>
    );
  }
  
  return tableContent;
}

export default Table;
