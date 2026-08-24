import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  img: { type: String },
  category: { type: String },
  quantity: { type: Number, required: true, min: 1 },
});

const StatusHistorySchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
      enum: ['Pending Approval', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    },
    changedBy: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      name: { type: String, default: 'System' },
      email: { type: String },
      role: { type: String, default: 'SYSTEM' }, // 'ADMIN', 'NORMALUSER', 'SYSTEM'
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    comment: {
      type: String,
      default: '',
    },
  },
  { _id: true }
);

const OrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      index: true,
    },
    userEmail: {
      type: String,
      index: true,
    },
    userPhone: {
      type: String,
    },
    items: [OrderItemSchema],
    shippingAddress: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zip: { type: String, required: true },
    },
    total: {
      type: Number,
      required: true,
    },
    paymentInfo: {
      razorpayOrderId: { type: String },
      razorpayPaymentId: { type: String },
      razorpaySignature: { type: String },
      paymentMethod: { type: String, default: 'Razorpay' },
      paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed'],
        default: 'Pending',
      },
    },
    orderStatus: {
      type: String,
      enum: ['Pending Approval', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending Approval',
    },
    statusHistory: [StatusHistorySchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
