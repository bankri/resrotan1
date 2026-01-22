import { query } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/orders
 * Membuat pesanan baru
 * 
 * Body:
 * {
 *   "customer": {
 *     "name": "John Doe",
 *     "phone": "081234567890",
 *     "address": "Jl. Raya No. 123",
 *     "city": "Jakarta"
 *   },
 *   "items": [
 *     { "menu_id": 1, "quantity": 2 },
 *     { "menu_id": 3, "quantity": 1 }
 *   ],
 *   "delivery_date": "2026-01-25",
 *   "delivery_time": "12:00",
 *   "special_notes": "Tidak pedas"
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customer, items, delivery_date, delivery_time, special_notes } = body;

    // Validasi input
    if (!customer?.name || !customer?.phone || !customer?.address) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing customer information'
        },
        { status: 400 }
      );
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'No items in order'
        },
        { status: 400 }
      );
    }

    if (!delivery_date) {
      return NextResponse.json(
        {
          success: false,
          error: 'Delivery date is required'
        },
        { status: 400 }
      );
    }

    // Generate order number
    const timestamp = Date.now().toString().slice(-6);
    const orderNumber = `LPD-${new Date().getFullYear()}-${timestamp}`;

    try {
      // 1. Insert atau get customer
      let customerId: number;
      
      const existingCustomer = await query(
        'SELECT id FROM customers WHERE phone = ?',
        [customer.phone]
      );

      if (Array.isArray(existingCustomer) && existingCustomer.length > 0) {
        customerId = (existingCustomer[0] as any).id;
        
        // Update customer data
        await query(
          `UPDATE customers SET name = ?, address = ?, city = ? WHERE id = ?`,
          [customer.name, customer.address, customer.city || '', customerId]
        );
      } else {
        // Create new customer
        const customerResult = await query(
          `INSERT INTO customers (name, phone, address, city) VALUES (?, ?, ?, ?)`,
          [customer.name, customer.phone, customer.address, customer.city || '']
        );
        customerId = (customerResult as any).insertId;
      }

      // 2. Calculate total price
      let totalPrice = 0;
      const menuIds = items.map((item: any) => item.menu_id);
      
      const menuPrices = await query(
        `SELECT id, price FROM menus WHERE id IN (${menuIds.map(() => '?').join(',')})`,
        menuIds
      );

      const priceMap = new Map((menuPrices as any[]).map(m => [m.id, m.price]));

      for (const item of items) {
        const price = priceMap.get(item.menu_id);
        if (price) {
          totalPrice += price * item.quantity;
        }
      }

      // 3. Insert order
      const orderResult = await query(
        `INSERT INTO orders (order_number, customer_id, total_price, status, delivery_date, delivery_time, special_notes)
         VALUES (?, ?, ?, 'pending', ?, ?, ?)`,
        [orderNumber, customerId, totalPrice, delivery_date, delivery_time || null, special_notes || null]
      );

      const orderId = (orderResult as any).insertId;

      // 4. Insert order items
      for (const item of items) {
        const price = priceMap.get(item.menu_id);
        await query(
          `INSERT INTO order_items (order_id, menu_id, quantity, price_at_purchase)
           VALUES (?, ?, ?, ?)`,
          [orderId, item.menu_id, item.quantity, price]
        );
      }

      return NextResponse.json(
        {
          success: true,
          message: 'Order created successfully',
          data: {
            order_id: orderId,
            order_number: orderNumber,
            total_price: totalPrice,
            status: 'pending',
            customer_id: customerId
          }
        },
        { status: 201 }
      );
    } catch (dbError) {
      throw dbError;
    }
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create order',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/orders?phone=081234567890
 * Mendapatkan pesanan pelanggan berdasarkan nomor telepon
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const phone = searchParams.get('phone');

    if (!phone) {
      return NextResponse.json(
        {
          success: false,
          error: 'Phone number is required'
        },
        { status: 400 }
      );
    }

    const orders = await query(
      `SELECT 
        o.id,
        o.order_number,
        o.total_price,
        o.status,
        o.delivery_date,
        o.delivery_time,
        o.created_at,
        c.name as customer_name,
        c.phone,
        c.address
      FROM orders o
      JOIN customers c ON o.customer_id = c.id
      WHERE c.phone = ?
      ORDER BY o.created_at DESC`,
      [phone]
    );

    return NextResponse.json(
      {
        success: true,
        data: orders,
        count: Array.isArray(orders) ? orders.length : 0
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch orders',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
