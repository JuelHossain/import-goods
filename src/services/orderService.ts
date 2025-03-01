/**
 * Service layer for order-related operations
 * Acts as a bridge between UI components and data sources (Supabase or mock data)
 */

import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { 
  mockOrders, 
  mockPreOrders,
  getOrderById,
  getOrdersByStatus,
  getOrdersByCustomerId,
  getPreOrderById
} from '@/data/mock/orders';
import { Order, PreOrder, OrderItem } from '@/data/mock/orders';

/**
 * Fetch all orders
 */
export async function getAllOrders(): Promise<Order[]> {
  try {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*)');
      
      if (error) throw error;
      
      // Transform Supabase data to match our Order interface
      return data.map((order: any) => ({
        id: order.id,
        customer: order.user_name || 'Customer',
        customerId: order.user_id,
        date: order.created_at.split('T')[0],
        amount: `$${order.total_amount.toFixed(2)}`,
        status: order.status,
        items: order.order_items,
        shippingAddress: order.shipping_address,
        paymentMethod: order.payment_method,
        trackingNumber: order.tracking_number
      }));
    } else {
      // Use mock data when Supabase is not configured
      return mockOrders;
    }
  } catch (error) {
    console.error('Error fetching orders:', error);
    // Fallback to mock data in case of error
    return mockOrders;
  }
}

/**
 * Fetch order by ID
 */
export async function fetchOrderById(id: string): Promise<Order | null> {
  try {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      // Transform Supabase data to match our Order interface
      return {
        id: data.id,
        customer: data.user_name || 'Customer',
        customerId: data.user_id,
        date: data.created_at.split('T')[0],
        amount: `$${data.total_amount.toFixed(2)}`,
        status: data.status,
        items: data.order_items,
        shippingAddress: data.shipping_address,
        paymentMethod: data.payment_method,
        trackingNumber: data.tracking_number
      };
    } else {
      // Use mock data when Supabase is not configured
      return getOrderById(id) || null;
    }
  } catch (error) {
    console.error(`Error fetching order ${id}:`, error);
    // Fallback to mock data in case of error
    return getOrderById(id) || null;
  }
}

/**
 * Fetch orders by status
 */
export async function fetchOrdersByStatus(status: string): Promise<Order[]> {
  try {
    if (isSupabaseConfigured()) {
      const query = status.toLowerCase() === 'all'
        ? supabase.from('orders').select('*, order_items(*)')
        : supabase.from('orders').select('*, order_items(*)').eq('status', status);
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      // Transform Supabase data to match our Order interface
      return data.map((order: any) => ({
        id: order.id,
        customer: order.user_name || 'Customer',
        customerId: order.user_id,
        date: order.created_at.split('T')[0],
        amount: `$${order.total_amount.toFixed(2)}`,
        status: order.status,
        items: order.order_items,
        shippingAddress: order.shipping_address,
        paymentMethod: order.payment_method,
        trackingNumber: order.tracking_number
      }));
    } else {
      // Use mock data when Supabase is not configured
      return getOrdersByStatus(status);
    }
  } catch (error) {
    console.error(`Error fetching orders with status ${status}:`, error);
    // Fallback to mock data in case of error
    return getOrdersByStatus(status);
  }
}

/**
 * Fetch orders by customer ID
 */
export async function fetchOrdersByCustomerId(customerId: string): Promise<Order[]> {
  try {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .eq('user_id', customerId);
      
      if (error) throw error;
      
      // Transform Supabase data to match our Order interface
      return data.map((order: any) => ({
        id: order.id,
        customer: order.user_name || 'Customer',
        customerId: order.user_id,
        date: order.created_at.split('T')[0],
        amount: `$${order.total_amount.toFixed(2)}`,
        status: order.status,
        items: order.order_items,
        shippingAddress: order.shipping_address,
        paymentMethod: order.payment_method,
        trackingNumber: order.tracking_number
      }));
    } else {
      // Use mock data when Supabase is not configured
      return getOrdersByCustomerId(customerId);
    }
  } catch (error) {
    console.error(`Error fetching orders for customer ${customerId}:`, error);
    // Fallback to mock data in case of error
    return getOrdersByCustomerId(customerId);
  }
}

/**
 * Fetch all pre-orders
 */
export async function getAllPreOrders(): Promise<PreOrder[]> {
  try {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('pre_orders')
        .select('*');
      
      if (error) throw error;
      
      // Transform Supabase data to match our PreOrder interface
      return data.map((preOrder: any) => ({
        id: preOrder.id,
        customer: preOrder.user_name || 'Customer',
        customerId: preOrder.user_id,
        date: preOrder.created_at.split('T')[0],
        amount: '$0.00', // Placeholder since pre-orders don't have amounts yet
        estimatedShipping: preOrder.estimated_shipping || 'TBD',
        status: preOrder.status,
        shippingAddress: preOrder.shipping_address,
        specialRequirements: preOrder.notes
      }));
    } else {
      // Use mock data when Supabase is not configured
      return mockPreOrders;
    }
  } catch (error) {
    console.error('Error fetching pre-orders:', error);
    // Fallback to mock data in case of error
    return mockPreOrders;
  }
}

/**
 * Fetch pre-order by ID
 */
export async function fetchPreOrderById(id: string): Promise<PreOrder | null> {
  try {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('pre_orders')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      // Transform Supabase data to match our PreOrder interface
      return {
        id: data.id,
        customer: data.user_name || 'Customer',
        customerId: data.user_id,
        date: data.created_at.split('T')[0],
        amount: '$0.00', // Placeholder since pre-orders don't have amounts yet
        estimatedShipping: data.estimated_shipping || 'TBD',
        status: data.status,
        shippingAddress: data.shipping_address,
        specialRequirements: data.notes
      };
    } else {
      // Use mock data when Supabase is not configured
      return getPreOrderById(id) || null;
    }
  } catch (error) {
    console.error(`Error fetching pre-order ${id}:`, error);
    // Fallback to mock data in case of error
    return getPreOrderById(id) || null;
  }
}

/**
 * Create a new order
 */
export async function createOrder(order: {
  customerId: string, 
  items: Omit<OrderItem, 'totalPrice'>[],
  shippingAddress: string,
  paymentMethod?: string
}): Promise<Order | null> {
  try {
    if (isSupabaseConfigured()) {
      // Calculate total price
      const totalAmount = order.items.reduce((total, item) => 
        total + (item.price * item.quantity), 0);
      
      // First, create the order
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([{
          user_id: order.customerId,
          total_amount: totalAmount,
          shipping_address: order.shippingAddress,
          payment_method: order.paymentMethod,
          status: 'Processing'
        }])
        .select()
        .single();
      
      if (orderError) throw orderError;
      
      // Then, create order items
      const orderItems = order.items.map(item => ({
        order_id: orderData.id,
        product_id: item.productId,
        quantity: item.quantity,
        price: item.price
      }));
      
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);
      
      if (itemsError) throw itemsError;
      
      // Finally, get the complete order with items
      const { data: completeOrder, error: fetchError } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .eq('id', orderData.id)
        .single();
      
      if (fetchError) throw fetchError;
      
      // Transform to our Order interface
      return {
        id: completeOrder.id,
        customer: completeOrder.user_name || 'Customer',
        customerId: completeOrder.user_id,
        date: completeOrder.created_at.split('T')[0],
        amount: `$${completeOrder.total_amount.toFixed(2)}`,
        status: completeOrder.status,
        items: completeOrder.order_items,
        shippingAddress: completeOrder.shipping_address,
        paymentMethod: completeOrder.payment_method
      };
    } else {
      // In mock mode, we would normally add to the mock array
      // But since we can't mutate the imports, we'll just return a mock order
      const mockId = `ORD-${(mockOrders.length + 1).toString().padStart(3, '0')}`;
      const totalAmount = order.items.reduce((total, item) => 
        total + (item.price * item.quantity), 0);
      
      const items = order.items.map(item => ({
        ...item,
        totalPrice: item.price * item.quantity
      }));
      
      return {
        id: mockId,
        customer: 'Mock Customer',
        customerId: order.customerId,
        date: new Date().toISOString().split('T')[0],
        amount: `$${totalAmount.toFixed(2)}`,
        status: 'Processing',
        items,
        shippingAddress: order.shippingAddress,
        paymentMethod: order.paymentMethod
      };
    }
  } catch (error) {
    console.error('Error creating order:', error);
    return null;
  }
}

/**
 * Create a new pre-order
 */
export async function createPreOrder(preOrder: {
  customerId: string,
  productLink: string,
  shippingAddress: string,
  specialRequirements?: string
}): Promise<PreOrder | null> {
  try {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('pre_orders')
        .insert([{
          user_id: preOrder.customerId,
          product_link: preOrder.productLink,
          shipping_address: preOrder.shippingAddress,
          notes: preOrder.specialRequirements,
          status: 'Pending'
        }])
        .select()
        .single();
      
      if (error) throw error;
      
      // Transform to our PreOrder interface
      return {
        id: data.id,
        customer: 'Customer',
        customerId: data.user_id,
        date: data.created_at.split('T')[0],
        amount: '$0.00', // Placeholder
        estimatedShipping: 'TBD',
        status: data.status,
        shippingAddress: data.shipping_address,
        specialRequirements: data.notes
      };
    } else {
      // In mock mode, we would normally add to the mock array
      // But since we can't mutate the imports, we'll just return a mock pre-order
      const mockId = `PRE-${(mockPreOrders.length + 1).toString().padStart(3, '0')}`;
      
      return {
        id: mockId,
        customer: 'Mock Customer',
        customerId: preOrder.customerId,
        date: new Date().toISOString().split('T')[0],
        amount: '$0.00',
        estimatedShipping: 'TBD',
        status: 'Pending',
        shippingAddress: preOrder.shippingAddress,
        specialRequirements: preOrder.specialRequirements
      };
    }
  } catch (error) {
    console.error('Error creating pre-order:', error);
    return null;
  }
}

/**
 * Update order status
 */
export async function updateOrderStatus(orderId: string, status: string): Promise<boolean> {
  try {
    if (isSupabaseConfigured()) {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId);
      
      if (error) throw error;
      return true;
    } else {
      // In mock mode, we would normally update the mock array
      // But since we can't mutate the imports, we'll just return success
      return true;
    }
  } catch (error) {
    console.error(`Error updating order ${orderId} status:`, error);
    return false;
  }
}
