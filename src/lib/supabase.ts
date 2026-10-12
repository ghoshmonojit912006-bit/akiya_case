import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://rabhrvelzsivfpyxdmzu.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmhydmVsenNpdmZweXhkbXp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE3ODU4NDUsImV4cCI6MjEwNzM2MTg0NX0.jiNaluGhQ6JPwHOjrEcRAcV-Motcoosg-OqXHD7WQno';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 1. Submit Contact Form Enquiry
export interface EnquiryData {
  full_name: string;
  email: string;
  phone?: string;
  message: string;
}

export async function submitEnquiry(data: EnquiryData) {
  const { data: record, error } = await supabase
    .from('enquiries')
    .insert([
      {
        full_name: data.full_name,
        email: data.email,
        phone: data.phone || null,
        message: data.message,
        status: 'new',
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error submitting enquiry to Supabase:', error);
    throw error;
  }

  return record;
}

// 2. Create Order in Supabase
export interface CreateOrderParams {
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  delivery_address: string;
  apartment?: string;
  city: string;
  state: string;
  pincode: string;
  payment_method: string;
  items: Array<{
    id: string;
    product_id: string;
    name: string;
    selected_model: string;
    selected_color: string;
    quantity: number;
    price: number;
    image: string;
  }>;
  total_items: number;
  subtotal: number;
  discount: number;
  bundle_applied: boolean;
  bundle_name?: string;
  shipping_fee: number;
  total_amount: number;
  notes?: string;
}

export async function createOrder(order: CreateOrderParams) {
  const { data: record, error } = await supabase
    .from('orders')
    .insert([
      {
        order_number: order.order_number,
        customer_name: order.customer_name,
        customer_email: order.customer_email,
        customer_phone: order.customer_phone,
        delivery_address: order.delivery_address,
        apartment: order.apartment || null,
        city: order.city,
        state: order.state,
        pincode: order.pincode,
        payment_method: order.payment_method,
        items: order.items,
        total_items: order.total_items,
        subtotal: order.subtotal,
        discount: order.discount,
        bundle_applied: order.bundle_applied,
        bundle_name: order.bundle_name || null,
        shipping_fee: order.shipping_fee,
        total_amount: order.total_amount,
        order_status: 'pending',
        notes: order.notes || null,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error creating order in Supabase:', error);
    throw error;
  }

  return record;
}

// 3. Subscribe to Newsletter
export async function subscribeNewsletter(email: string, source = 'website_homepage') {
  const { data: record, error } = await supabase
    .from('newsletter_subscribers')
    .insert([
      {
        email: email.toLowerCase().trim(),
        source,
      },
    ])
    .select()
    .single();

  if (error) {
    // If already subscribed (unique constraint violation code 23505), treat as success
    if (error.code === '23505') {
      return { email, already_subscribed: true };
    }
    console.error('Error subscribing to newsletter in Supabase:', error);
    throw error;
  }

  return record;
}
