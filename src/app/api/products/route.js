import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

/**
 * POST /api/products
 * Creates a new product document with dynamic/flexible schema support.
 */
export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();

    // Basic validation for mandatory fields
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Invalid request body.' },
        { status: 400 }
      );
    }

    if (!body.name || !body.category || body.price === undefined || body.price === null || body.price === '') {
      return NextResponse.json(
        { success: false, error: 'Product name, category, and price are required fields.' },
        { status: 400 }
      );
    }

    // Prepare product payload (ensuring numerical values for pricing)
    const productData = { ...body };
    if (productData.price !== undefined) {
      productData.price = Number(productData.price);
    }
    if (productData.originalPrice !== undefined && productData.originalPrice !== '') {
      productData.originalPrice = Number(productData.originalPrice);
    }
    if (productData.position !== undefined && productData.position !== '') {
      productData.position = Number(productData.position);
    }

    // Create the product in MongoDB (supports standard & dynamic flexible fields)
    const product = await Product.create(productData);

    return NextResponse.json(
      {
        success: true,
        message: 'Product created successfully',
        product,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to create product',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/products
 * Retrieves all products sorted by creation date (newest first).
 */
export async function GET(req) {
  try {
    await dbConnect();

    const products = await Product.find({}).sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        count: products.length,
        products,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch products',
      },
      { status: 500 }
    );
  }
}
