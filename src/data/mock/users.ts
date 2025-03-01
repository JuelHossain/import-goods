/**
 * Centralized mock users data for the Import Goods application
 * Used across various pages including admin dashboard, user profiles, and authentication
 */

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer' | 'merchant';
  createdAt: string;
  lastLogin?: string;
  profilePicture?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethods?: PaymentMethod[];
  wishlist?: string[]; // Product IDs
  preferences?: UserPreferences;
}

export interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'paypal' | 'apple_pay' | 'google_pay';
  lastFour?: string;
  expiryDate?: string;
  isDefault: boolean;
}

export interface UserPreferences {
  darkMode: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  language: string;
  currency: string;
}

// Mock users data
const mockUsers: User[] = [
  {
    id: 'USR-001',
    name: 'John Smith',
    email: 'john.smith@example.com',
    role: 'customer',
    createdAt: '2023-01-15',
    lastLogin: '2023-05-15',
    profilePicture: '/images/avatars/avatar-1.jpg',
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    paymentMethods: [
      {
        id: 'PM-001',
        type: 'credit_card',
        lastFour: '4242',
        expiryDate: '05/25',
        isDefault: true
      },
      {
        id: 'PM-002',
        type: 'paypal',
        isDefault: false
      }
    ],
    wishlist: ['1', '5', '8'],
    preferences: {
      darkMode: true,
      emailNotifications: true,
      smsNotifications: false,
      language: 'en',
      currency: 'USD'
    }
  },
  {
    id: 'USR-002',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    role: 'customer',
    createdAt: '2023-02-10',
    lastLogin: '2023-05-14',
    profilePicture: '/images/avatars/avatar-2.jpg',
    address: {
      street: '456 Park Ave',
      city: 'Boston',
      state: 'MA',
      zipCode: '02108',
      country: 'USA'
    },
    paymentMethods: [
      {
        id: 'PM-003',
        type: 'paypal',
        isDefault: true
      }
    ],
    wishlist: ['3', '6'],
    preferences: {
      darkMode: false,
      emailNotifications: true,
      smsNotifications: true,
      language: 'en',
      currency: 'USD'
    }
  },
  {
    id: 'USR-003',
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    role: 'customer',
    createdAt: '2023-01-05',
    lastLogin: '2023-05-14',
    profilePicture: '/images/avatars/avatar-3.jpg',
    address: {
      street: '789 Oak St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      country: 'USA'
    },
    paymentMethods: [
      {
        id: 'PM-004',
        type: 'credit_card',
        lastFour: '1234',
        expiryDate: '09/24',
        isDefault: true
      }
    ],
    wishlist: ['2', '7'],
    preferences: {
      darkMode: true,
      emailNotifications: false,
      smsNotifications: false,
      language: 'en',
      currency: 'USD'
    }
  },
  {
    id: 'USR-004',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    role: 'customer',
    createdAt: '2023-03-20',
    lastLogin: '2023-05-13',
    profilePicture: '/images/avatars/avatar-4.jpg',
    address: {
      street: '321 Pine St',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101',
      country: 'USA'
    },
    paymentMethods: [
      {
        id: 'PM-005',
        type: 'credit_card',
        lastFour: '5678',
        expiryDate: '12/24',
        isDefault: true
      }
    ],
    wishlist: ['4', '9'],
    preferences: {
      darkMode: false,
      emailNotifications: true,
      smsNotifications: false,
      language: 'en',
      currency: 'USD'
    }
  },
  {
    id: 'USR-005',
    name: 'David Wilson',
    email: 'david.wilson@example.com',
    role: 'customer',
    createdAt: '2023-02-18',
    lastLogin: '2023-05-12',
    profilePicture: '/images/avatars/avatar-5.jpg',
    address: {
      street: '654 Maple Ave',
      city: 'Austin',
      state: 'TX',
      zipCode: '78701',
      country: 'USA'
    },
    paymentMethods: [
      {
        id: 'PM-006',
        type: 'apple_pay',
        isDefault: true
      }
    ],
    wishlist: ['1', '2', '3'],
    preferences: {
      darkMode: true,
      emailNotifications: true,
      smsNotifications: true,
      language: 'en',
      currency: 'USD'
    }
  },
  {
    id: 'ADMIN-001',
    name: 'Admin User',
    email: 'admin@importgoods.com',
    role: 'admin',
    createdAt: '2022-12-01',
    lastLogin: '2023-05-15',
    profilePicture: '/images/avatars/admin-avatar.jpg',
    preferences: {
      darkMode: true,
      emailNotifications: true,
      smsNotifications: true,
      language: 'en',
      currency: 'USD'
    }
  },
  {
    id: 'MERCH-001',
    name: 'Global Artisans Co.',
    email: 'contact@globalartisans.com',
    role: 'merchant',
    createdAt: '2023-01-10',
    lastLogin: '2023-05-14',
    profilePicture: '/images/merchants/logo-1.jpg',
    address: {
      street: '1 Artisan Way',
      city: 'Portland',
      state: 'OR',
      zipCode: '97201',
      country: 'USA'
    },
    preferences: {
      darkMode: false,
      emailNotifications: true,
      smsNotifications: false,
      language: 'en',
      currency: 'USD'
    }
  },
  {
    id: 'MERCH-002',
    name: 'Exotic Spices & Herbs',
    email: 'sales@exoticspices.com',
    role: 'merchant',
    createdAt: '2023-02-05',
    lastLogin: '2023-05-13',
    profilePicture: '/images/merchants/logo-2.jpg',
    address: {
      street: '42 Spice Market',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94110',
      country: 'USA'
    },
    preferences: {
      darkMode: true,
      emailNotifications: true,
      smsNotifications: true,
      language: 'en',
      currency: 'USD'
    }
  }
];

// Helper functions
export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const getUserByEmail = (email: string): User | undefined => {
  return mockUsers.find(user => user.email.toLowerCase() === email.toLowerCase());
};

export const getUsersByRole = (role: string): User[] => {
  return mockUsers.filter(user => user.role === role);
};

export const getAdminUsers = (): User[] => {
  return mockUsers.filter(user => user.role === 'admin');
};

export const getMerchantUsers = (): User[] => {
  return mockUsers.filter(user => user.role === 'merchant');
};

export const getCustomerUsers = (): User[] => {
  return mockUsers.filter(user => user.role === 'customer');
};

export { mockUsers };

export default mockUsers;
