import Razorpay from 'razorpay';

const key_id = process.env.RAZORPAY_KEY_ID;
const key_secret = process.env.RAZORPAY_KEY_SECRET;

if (!key_id || !key_secret) {
  console.warn('⚠️ Razorpay credentials missing from environment variables.');
}

const razorpayInstance = new Razorpay({
  key_id: key_id || '',
  key_secret: key_secret || '',
});

export default razorpayInstance;
