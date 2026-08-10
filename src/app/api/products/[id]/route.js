import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

/**
 * GET /api/products/[id]
 * Fetches a single product document by ID.
 */
export async function GET(req, context) {
  try {
    await dbConnect();
    const params = await context.params;
    const id = params?.id;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Product ID is required in URL path.' },
        { status: 400 }
      );
    }

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        product,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch product',
      },
      { status: 500 }
    );
  }
}

/**
 * Helper handler for product updates by ID in URL path
 */
async function handleUpdateById(req, context) {
  try {
    await dbConnect();
    const params = await context.params;
    const id = params?.id;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Product ID is required in URL path.' },
        { status: 400 }
      );
    }

    const body = await req.json();
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON request body.' },
        { status: 400 }
      );
    }

    const updateFields = { ...body };
    delete updateFields._id;
    delete updateFields.id;

    if (updateFields.price !== undefined && updateFields.price !== '') {
      updateFields.price = Number(updateFields.price);
    }
    if (updateFields.originalPrice !== undefined && updateFields.originalPrice !== '') {
      updateFields.originalPrice = Number(updateFields.originalPrice);
    }

    // Find and update document supporting dynamic/flexible schema updates
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updateFields,
      { new: true, runValidators: false }
    );

    if (!updatedProduct) {
      return NextResponse.json(
        { success: false, error: 'Product not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Product updated successfully',
        product: updatedProduct,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating product by ID:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to update product',
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/products/[id]
 */
export async function PUT(req, context) {
  return handleUpdateById(req, context);
}


/**
 * DELETE /api/products/[id]
 */
export async function DELETE(req, context) {
  try {
    await dbConnect();
    const params = await context.params;
    const id = params?.id;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Product ID is required in URL path.' },
        { status: 400 }
      );
    }

    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return NextResponse.json(
        { success: false, error: 'Product not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Product deleted successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting product by ID:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to delete product',
      },
      { status: 500 }
    );
  }
}
