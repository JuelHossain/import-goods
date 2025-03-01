/**
 * Centralized mock orders data for the Import Goods application
 * Used across various pages including admin dashboard, orders page, and user profiles
 */

import mockProducts from './products';

export interface Order {
  id: string;
  customer: string;
  customerId?: string;
  date: string;
  amount: string;
  status: 'Completed' | 'Processing' | 'Shipped' | 'Cancelled';
  items?: OrderItem[];
  shippingAddress?: string;
  paymentMethod?: string;
  trackingNumber?: string;
}

export interface OrderItem {
  productId: string | number;
  productName: string;
  quantity: number;
  price: number;
  totalPrice: number;
}

export interface PreOrder {
  id: string;
  customer: string;
  customerId?: string;
  date: string;
  amount: string;
  estimatedShipping: string;
  items?: OrderItem[];
  status?: 'Pending' | 'Approved' | 'Rejected';
  shippingAddress?: string;
  specialRequirements?: string;
}

// Mock orders data
const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customer: 'John Smith',
    customerId: 'USR-001',
    date: '2023-05-15',
    amount: '$245.99',
    status: 'Completed',
    items: [
      {
        productId: '1',
        productName: 'Handcrafted Leather Bag',
        quantity: 1,
        price: 299.99,
        totalPrice: 299.99
      }
    ],
    shippingAddress: '123 Main St, New York, NY 10001',
    paymentMethod: 'Credit Card ending in 4242',
    trackingNumber: 'TRK123456789'
  },
  {
    id: 'ORD-002',
    customer: 'Sarah Johnson',
    customerId: 'USR-002',
    date: '2023-05-14',
    amount: '$189.50',
    status: 'Processing',
    items: [
      {
        productId: '3',
        productName: 'Ceramic Dining Set',
        quantity: 1,
        price: 189.99,
        totalPrice: 189.99
      }
    ],
    shippingAddress: '456 Park Ave, Boston, MA 02108',
    paymentMethod: 'PayPal'
  },
  {
    id: 'ORD-003',
    customer: 'Michael Brown',
    customerId: 'USR-003',
    date: '2023-05-14',
    amount: '$532.20',
    status: 'Shipped',
    items: [
      {
        productId: '5',
        productName: 'Handwoven Carpet',
        quantity: 1,
        price: 599.99,
        totalPrice: 599.99
      }
    ],
    shippingAddress: '789 Oak St, Chicago, IL 60601',
    paymentMethod: 'Credit Card ending in 1234',
    trackingNumber: 'TRK987654321'
  },
  {
    id: 'ORD-004',
    customer: 'Emily Davis',
    customerId: 'USR-004',
    date: '2023-05-13',
    amount: '$76.00',
    status: 'Completed',
    items: [
      {
        productId: '4',
        productName: 'Organic Olive Oil',
        quantity: 3,
        price: 24.99,
        totalPrice: 74.97
      }
    ],
    shippingAddress: '321 Pine St, Seattle, WA 98101',
    paymentMethod: 'Credit Card ending in 5678',
    trackingNumber: 'TRK456789123'
  },
  {
    id: 'ORD-005',
    customer: 'David Wilson',
    customerId: 'USR-005',
    date: '2023-05-12',
    amount: '$124.30',
    status: 'Processing',
    items: [
      {
        productId: '2',
        productName: 'Premium Coffee Beans',
        quantity: 2,
        price: 49.99,
        totalPrice: 99.98
      },
      {
        productId: '4',
        productName: 'Organic Olive Oil',
        quantity: 1,
        price: 24.99,
        totalPrice: 24.99
      }
    ],
    shippingAddress: '654 Maple Ave, Austin, TX 78701',
    paymentMethod: 'Apple Pay'
  },
  {
    id: 'ORD-006',
    customer: 'Jessica Taylor',
    customerId: 'USR-006',
    date: '2023-05-11',
    amount: '$89.99',
    status: 'Completed',
    items: [
      {
        productId: '6',
        productName: 'Artisanal Ceramic Vase',
        quantity: 1,
        price: 89.99,
        totalPrice: 89.99
      }
    ],
    shippingAddress: '987 Cedar St, San Francisco, CA 94102',
    paymentMethod: 'Credit Card ending in 9876',
    trackingNumber: 'TRK789123456'
  },
  {
    id: 'ORD-007',
    customer: 'Robert Martinez',
    customerId: 'USR-007',
    date: '2023-05-10',
    amount: '$349.98',
    status: 'Shipped',
    items: [
      {
        productId: '3',
        productName: 'Ceramic Dining Set',
        quantity: 1,
        price: 189.99,
        totalPrice: 189.99
      },
      {
        productId: '6',
        productName: 'Artisanal Ceramic Vase',
        quantity: 1,
        price: 89.99,
        totalPrice: 89.99
      },
      {
        productId: '4',
        productName: 'Organic Olive Oil',
        quantity: 2,
        price: 24.99,
        totalPrice: 49.98
      }
    ],
    shippingAddress: '321 Birch Rd, Miami, FL 33101',
    paymentMethod: 'Credit Card ending in 5432',
    trackingNumber: 'TRK321654987'
  }
];

// Mock pre-orders data
const mockPreOrders: PreOrder[] = [
  {
    id: 'PRE-001',
    customer: 'Alice Williams',
    customerId: 'USR-008',
    date: '2023-05-10',
    amount: '$349.99',
    estimatedShipping: '2023-06-15',
    status: 'Pending',
    items: [
      {
        productId: '1',
        productName: 'Handcrafted Leather Bag - Limited Edition',
        quantity: 1,
        price: 349.99,
        totalPrice: 349.99
      }
    ],
    shippingAddress: '741 Elm St, Denver, CO 80202',
    specialRequirements: 'Gift wrapping requested'
  },
  {
    id: 'PRE-002',
    customer: 'Robert Jones',
    customerId: 'USR-009',
    date: '2023-05-09',
    amount: '$189.50',
    estimatedShipping: '2023-06-20',
    status: 'Approved',
    items: [
      {
        productId: '2',
        productName: 'Premium Coffee Beans - Special Reserve',
        quantity: 3,
        price: 59.99,
        totalPrice: 179.97
      }
    ],
    shippingAddress: '852 Aspen Way, Portland, OR 97201',
    specialRequirements: 'Please include a sample of the light roast if available'
  },
  {
    id: 'PRE-003',
    customer: 'Jennifer Miller',
    customerId: 'USR-010',
    date: '2023-05-08',
    amount: '$432.20',
    estimatedShipping: '2023-06-10',
    status: 'Pending',
    items: [
      {
        productId: '5',
        productName: 'Handwoven Carpet - Custom Size',
        quantity: 1,
        price: 449.99,
        totalPrice: 449.99
      }
    ],
    shippingAddress: '963 Spruce St, Philadelphia, PA 19019',
    specialRequirements: 'Custom size: 4\' x 6\', preferred colors: blue and ivory'
  },
  {
    id: 'PRE-004',
    customer: 'Thomas Anderson',
    customerId: 'USR-011',
    date: '2023-05-07',
    amount: '$99.99',
    estimatedShipping: '2023-06-25',
    status: 'Approved',
    items: [
      {
        productId: '6',
        productName: 'Artisanal Ceramic Vase - Limited Collection',
        quantity: 1,
        price: 99.99,
        totalPrice: 99.99
      }
    ],
    shippingAddress: '159 Redwood Ave, Nashville, TN 37203',
    specialRequirements: 'Please ensure it\'s the blue pattern with gold accents'
  }
];

export { mockOrders, mockPreOrders };

// Helper functions to work with mock orders
export const getOrderById = (id: string): Order | undefined => {
  return mockOrders.find(order => order.id === id);
};

export const getOrdersByCustomerId = (customerId: string): Order[] => {
  return mockOrders.filter(order => order.customerId === customerId);
};

export const getOrdersByStatus = (status: string): Order[] => {
  return status.toLowerCase() === 'all'
    ? mockOrders
    : mockOrders.filter(order => 
        order.status.toLowerCase() === status.toLowerCase()
      );
};

export const getPreOrderById = (id: string): PreOrder | undefined => {
  return mockPreOrders.find(preOrder => preOrder.id === id);
};

export const getPreOrdersByCustomerId = (customerId: string): PreOrder[] => {
  return mockPreOrders.filter(preOrder => preOrder.customerId === customerId);
};

export default { 
  orders: mockOrders, 
  preOrders: mockPreOrders 
};
