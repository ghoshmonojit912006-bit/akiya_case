import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rabhrvelzsivfpyxdmzu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmhydmVsenNpdmZweXhkbXp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE3ODU4NDUsImV4cCI6MjEwNzM2MTg0NX0.jiNaluGhQ6JPwHOjrEcRAcV-Motcoosg-OqXHD7WQno';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testBackend() {
  console.log('Testing Supabase Backend for AKIYA CASES...\n');

  // 1. Test Newsletter Subscriber
  console.log('1. Testing Newsletter Subscription...');
  const { data: subData, error: subError } = await supabase
    .from('newsletter_subscribers')
    .insert([
      { email: 'pookie.lover@akiyacases.com', source: 'website_test' }
    ])
    .select()
    .single();

  if (subError) {
    console.error('Newsletter error:', subError);
  } else {
    console.log('Newsletter subscriber created:', subData.id, subData.email);
  }

  // 2. Test Contact Enquiry
  console.log('\n2. Testing Contact Enquiry Submission...');
  const { data: enqData, error: enqError } = await supabase
    .from('enquiries')
    .insert([
      {
        full_name: 'Ananya Roy',
        email: 'ananya.roy@example.com',
        phone: '+91 98765 43210',
        message: 'Hello! Are the Hello Kitty mirror cases available for iPhone 16 Pro Max in pink?',
        status: 'new'
      }
    ])
    .select()
    .single();

  if (enqError) {
    console.error('Enquiry error:', enqError);
  } else {
    console.log('Contact Enquiry created:', enqData.id, enqData.full_name, enqData.status);
  }

  // 3. Test Order Creation
  console.log('\n3. Testing Order Placement...');
  const orderNumber = `AKIYA-${Math.floor(100000 + Math.random() * 900000)}`;
  const { data: orderData, error: orderError } = await supabase
    .from('orders')
    .insert([
      {
        order_number: orderNumber,
        customer_name: 'Rhea Sen',
        customer_email: 'rhea.sen@example.com',
        customer_phone: '+91 98300 12345',
        delivery_address: '42 Salt Lake Sector 1',
        apartment: 'Block AC, Flat 3B',
        city: 'Kolkata',
        state: 'West Bengal',
        pincode: '700064',
        payment_method: 'upi',
        items: [
          {
            product_id: 'bow-crush',
            name: 'Bow Crush',
            selected_model: 'iPhone 16 Pro',
            selected_color: 'Blush & Ribbon Tint',
            quantity: 1,
            price: 699
          },
          {
            product_id: 'hello-kitty-heart',
            name: 'Hello Kitty Heart Mirror',
            selected_model: 'iPhone 16 Pro',
            selected_color: 'Pink & Silver Quilted',
            quantity: 1,
            price: 799
          }
        ],
        total_items: 2,
        subtotal: 1498,
        discount: 299,
        bundle_applied: true,
        bundle_name: 'Pujo Special Duo Bundle',
        shipping_fee: 0,
        total_amount: 1199,
        order_status: 'pending',
        notes: 'Please gift wrap if possible ♡'
      }
    ])
    .select()
    .single();

  if (orderError) {
    console.error('Order error:', orderError);
  } else {
    console.log('Order created successfully:', orderData.id, orderData.order_number, 'Total: ₹' + orderData.total_amount);
  }

  console.log('\nAll Supabase backend tests finished successfully!');
}

testBackend();
