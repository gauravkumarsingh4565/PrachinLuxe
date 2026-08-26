import { NextResponse } from 'next/server';
import razorpayInstance from '@/lib/razorpay';
import dbConnect from '@/lib/db';

export async function POST(req) {
  try {
    const body = await req.json();
    const { cartItems, addressData, total } = body;

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      );
    }

    if (!total || total <= 0) {
      return NextResponse.json(
        { error: 'Invalid total amount' },
        { status: 400 }
      );
    }

    // Amount must be an integer in the smallest currency unit (paise for INR)
    const amountInPaise = Math.round(Number(total) * 100);

    const options = {
      amount: amountInPaise,
      currency: 'INR',
      receipt: `rcpt_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      notes: {
        customerName: addressData?.name || '',
        customerPhone: addressData?.phone || '',
        customerEmail: addressData?.email || '',
        itemCount: String(cartItems.length),
      },
    };

    const razorpayOrder = await razorpayInstance.orders.create(options);

    return NextResponse.json({
      success: true,
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json(
      {
        error: error.message || 'Failed to create Razorpay order',
      },
      { status: 500 }
    );
  }
}
