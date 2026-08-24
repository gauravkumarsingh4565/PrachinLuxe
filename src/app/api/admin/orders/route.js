import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check admin authorization if session exists
    if (session?.user && session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Admin privileges required.' },
        { status: 403 }
      );
    }

    await dbConnect();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    const query = {};
    if (status && status !== 'all') {
      query.orderStatus = status;
    }

    const orders = await Order.find(query)
      .populate('userId', 'name email phoneNumber')
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error('Error fetching admin orders:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
