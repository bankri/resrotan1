import { query } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/menus
 * Mendapatkan daftar semua menu dengan kategorinya
 * 
 * Query parameters:
 * - category_id (optional): Filter berdasarkan kategori
 * - available_only (optional): true untuk hanya menu yang tersedia
 * 
 * Contoh:
 * - GET /api/menus
 * - GET /api/menus?category_id=1
 * - GET /api/menus?available_only=true
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categoryId = searchParams.get('category_id');
    const availableOnly = searchParams.get('available_only') === 'true';

    let sql = `
      SELECT 
        m.id,
        m.name,
        m.description,
        m.price,
        m.portion_size,
        m.rating,
        m.review_count,
        m.category_id,
        c.name as category_name
      FROM menus m
      JOIN categories c ON m.category_id = c.id
      WHERE 1=1
    `;

    const params: any[] = [];

    if (categoryId) {
      sql += ' AND m.category_id = ?';
      params.push(parseInt(categoryId));
    }

    if (availableOnly) {
      sql += ' AND m.is_available = true';
    }

    sql += ' ORDER BY c.id, m.name';

    const menus = await query(sql, params);
    
    return NextResponse.json(
      {
        success: true,
        data: menus,
        count: Array.isArray(menus) ? menus.length : 0
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching menus:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch menus',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/menus
 * Membuat menu baru (untuk admin)
 * 
 * Body:
 * {
 *   "category_id": 1,
 *   "name": "Menu Baru",
 *   "description": "Deskripsi",
 *   "price": 25000,
 *   "portion_size": "1 porsi"
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { category_id, name, description, price, portion_size } = body;

    // Validasi
    if (!category_id || !name || !price) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: category_id, name, price'
        },
        { status: 400 }
      );
    }

    const sql = `
      INSERT INTO menus (category_id, name, description, price, portion_size, is_available, rating, review_count)
      VALUES (?, ?, ?, ?, ?, true, 0, 0)
    `;

    const params = [category_id, name, description || null, price, portion_size || '1 porsi'];

    const result = await query(sql, params);

    return NextResponse.json(
      {
        success: true,
        message: 'Menu created successfully',
        data: result
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating menu:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create menu',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
