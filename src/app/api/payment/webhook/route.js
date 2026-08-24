import { NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';

export async function POST(req) {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const bodyText = await req.text();
    const signature = req.headers.get('x-razorpay-signature');

    if (webhookSecret && signature) {
      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(bodyText)
        .digest('hex');

      if (expectedSignature !== signature) {
        return NextResponse.json(
          { error: 'Invalid webhook signature' },
          { status: 400 }
        );
      }
    }

    const event = JSON.parse(bodyText);
    await dbConnect();

    switch (event.event) {
      case 'payment.captured':
      // case 'order.paid': {
      //   const payment = event.payload?.payment?.entity;
      //   const orderId = payment?.order_id;
      //   if (orderId) {
      //     await Order.findOneAndUpdate(
      //       { 'paymentInfo.razorpayOrderId': orderId },
      //       {
      //         $set: {
      //           'paymentInfo.paymentStatus': 'Paid',
      //           'paymentInfo.razorpayPaymentId': payment.id,
      //           orderStatus: 'Confirmed',
      //         },
      //       }
      //     );
      //   }
      //   break;
      // }
      case 'payment.failed': {
        const payment = event.payload?.payment?.entity;
        const orderId = payment?.order_id;
        if (orderId) {
          await Order.findOneAndUpdate(
            { 'paymentInfo.razorpayOrderId': orderId },
            {
              $set: {
                'paymentInfo.paymentStatus': 'Failed',
                orderStatus: 'Cancelled',
              },
            }
          );
        }
        break;
      }
      default:
        console.log(`Unhandled Razorpay webhook event: ${event.event}`);
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Razorpay webhook processing error:', error);
    return NextResponse.json(
      { error: error.message || 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
