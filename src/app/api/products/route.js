import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

// GET all products or filter by category
export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const filter = category ? { category: { $regex: category, $options: 'i' } } : {};
    const products = await Product.find(filter).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, count: products.length, data: products }, { status: 200 });
  } catch (error) {
    console.error('Error in GET /api/products:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST create a product
export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    const {
      name, price, category, subcategory, originalPrice, inStock,
      description, craftsmanship,
      images, story, material, care,
    } = body;

    if (!name || !price || !category) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: name, price, category' },
        { status: 400 }
      );
    }

    const newProduct = await Product.create({
      name,
      price,
      category,
      subcategory,
      originalPrice,
      inStock: inStock !== undefined ? inStock : true,
      description,
      craftsmanship,
      images: images || { front: '', left: '', right: '', back: '' },
      story: story || {},
      material: material || { ingdrients: [], specification: [] },
      care: care || [],
    });

    return NextResponse.json({ success: true, data: newProduct }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/products:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

