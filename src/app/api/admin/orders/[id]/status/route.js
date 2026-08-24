import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';

const VALID_STATUSES = [
  'Pending Approval',
  'Confirmed',
  'Processing',
  'Shipped',
  'Delivered',
  'Cancelled',
];

export async function PATCH(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check admin authorization if session exists
    if (session?.user && session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Forbidden. Only administrators can change order status.' },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await req.json();
    const { status, comment, adminName, adminEmail } = body;

    if (!status || !VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid status '${status}'. Must be one of: ${VALID_STATUSES.join(', ')}`,
        },
        { status: 400 }
      );
    }

    await dbConnect();

    // Query by custom orderId (e.g. PL-2026-XXXX) or MongoDB ObjectId
    const query = id.startsWith('PL-') ? { orderId: id } : { _id: id };
    const order = await Order.findOne(query);

    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    // Capture who changed the status
    const adminUser = session?.user;
    const changerName = adminUser?.name || adminName || 'Admin Curator';
    const changerEmail = adminUser?.email || adminEmail || '';
    const changerId = adminUser?.id || undefined;

    const historyEntry = {
      status,
      changedBy: {
        userId: changerId,
        name: changerName,
        email: changerEmail,
        role: 'ADMIN',
      },
      timestamp: new Date(),
      comment: comment || `Order marked as '${status}' by Administrator (${changerName})`,
    };

    order.orderStatus = status;
    order.statusHistory.push(historyEntry);
    await order.save();

    return NextResponse.json({
      success: true,
      message: `Order #${order.orderId} status successfully updated to '${status}'.`,
      order,
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update order status' },
      { status: 500 }
    );
  }
}
