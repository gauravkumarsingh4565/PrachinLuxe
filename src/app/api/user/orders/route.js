import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import mongoose from 'mongoose';

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(req.url);
    const queryEmail = searchParams.get('email');
    const queryUserId = searchParams.get('userId');

    const userEmail = session?.user?.email || queryEmail;
    const userId = session?.user?.id || queryUserId;

    if (!userEmail && !userId) {
      return NextResponse.json(
        { success: false, error: 'User identification (session, email, or userId) required' },
        { status: 401 }
      );
    }

    await dbConnect();

    const orConditions = [];

    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
      orConditions.push({ userId: new mongoose.Types.ObjectId(userId) });
    }

    if (userEmail) {
      orConditions.push({ userEmail: userEmail.toLowerCase() });
      orConditions.push({ 'shippingAddress.email': userEmail.toLowerCase() });
    }

    const orders = await Order.find({ $or: orConditions }).sort({ createdAt: -1 });

    const formattedOrders = orders.map((order) => ({
      id: order.orderId,
      _id: order._id,
      date: new Date(order.createdAt).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      createdAt: order.createdAt,
      total: order.total,
      status: order.orderStatus,
      paymentMethod: order.paymentInfo?.paymentMethod || 'Razorpay',
      paymentId: order.paymentInfo?.razorpayPaymentId || '',
      paymentStatus: order.paymentInfo?.paymentStatus || 'Paid',
      items: (order.items || []).map((item) => ({
        product: {
          id: item.productId,
          name: item.name,
          price: item.price,
          img: item.img,
          category: item.category,
        },
        quantity: item.quantity,
      })),
      shippingAddress: order.shippingAddress,
      statusHistory: order.statusHistory || [],
    }));

    return NextResponse.json({
      success: true,
      count: formattedOrders.length,
      orders: formattedOrders,
    });
  } catch (error) {
    console.error('Error fetching user orders:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch user orders' },
      { status: 500 }
    );
  }
}
