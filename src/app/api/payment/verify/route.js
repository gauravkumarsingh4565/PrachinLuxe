import { NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import User from '@/models/User';

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      cartItems,
      addressData,
      total,
      userId,
      userEmail,
      userPhone,
    } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: 'Missing required Razorpay payment attributes' },
        { status: 400 }
      );
    }

    const key_secret = process.env.RAZORPAY_KEY_SECRET;
    if (!key_secret) {
      return NextResponse.json(
        { error: 'Razorpay key secret not configured on server' },
        { status: 500 }
      );
    }

    // Generate expected signature
    const generated_signature = crypto
      .createHmac('sha256', key_secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    const isAuthentic = generated_signature === razorpay_signature;

    if (!isAuthentic) {
      return NextResponse.json(
        { error: 'Payment signature verification failed. Transaction cannot be verified.' },
        { status: 400 }
      );
    }

    // Connect to database
    await dbConnect();

    // Resolve userId if not passed directly
    let resolvedUserId = userId || null;
    const customerEmail = userEmail || addressData?.email;
    if (!resolvedUserId && customerEmail) {
      const existingUser = await User.findOne({ email: customerEmail.toLowerCase() });
      if (existingUser) {
        resolvedUserId = existingUser._id;
      }
    }

    // Create formatted order object
    const customOrderId = `PL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const formattedItems = (cartItems || []).map((item) => {
      const priceNum =
        typeof item.product?.price === 'number'
          ? item.product.price
          : parseFloat(String(item.product?.price || 0).replace(/,/g, ''));
      return {
        productId: String(item.product?.id || item.productId || ''),
        name: item.product?.name || item.name || 'Heritage Item',
        price: priceNum,
        img: item.product?.img || item.img || '',
        category: item.product?.category || item.category || '',
        quantity: item.quantity || 1,
      };
    });

    const newOrder = await Order.create({
      orderId: customOrderId,
      userId: resolvedUserId,
      userEmail: customerEmail || '',
      userPhone: userPhone || addressData?.phone || '',
      items: formattedItems,
      shippingAddress: {
        name: addressData?.name || '',
        phone: addressData?.phone || '',
        email: addressData?.email || '',
        street: addressData?.street || '',
        city: addressData?.city || '',
        state: addressData?.state || '',
        zip: addressData?.zip || '',
      },
      total: Number(total) || 0,
      paymentInfo: {
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        paymentMethod: 'Razorpay',
        paymentStatus: 'Paid',
      },
      orderStatus: 'Pending Approval',
      statusHistory: [
        {
          status: 'Pending Approval',
          changedBy: {
            userId: resolvedUserId || undefined,
            name: addressData?.name || 'Customer',
            email: customerEmail || '',
            role: 'NORMALUSER',
          },
          timestamp: new Date(),
          comment: 'Order placed & payment verified via Razorpay. Awaiting admin review and confirmation.',
        },
      ],
    });

    return NextResponse.json({
      success: true,
      message: 'Payment verified and order placed successfully. Awaiting admin confirmation.',
      order: {
        id: newOrder.orderId,
        _id: newOrder._id,
        date: new Date().toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        total: newOrder.total,
        status: newOrder.orderStatus,
        paymentMethod: `Razorpay (${razorpay_payment_id})`,
        paymentId: razorpay_payment_id,
        items: newOrder.items.map((i) => ({
          product: {
            id: i.productId,
            name: i.name,
            price: i.price,
            img: i.img,
            category: i.category,
          },
          quantity: i.quantity,
        })),
        shippingAddress: newOrder.shippingAddress,
      },
    });
  } catch (error) {
    console.error('Error verifying Razorpay payment:', error);
    return NextResponse.json(
      { error: error.message || 'Payment verification failed' },
      { status: 500 }
    );
  }
}
