"use client";

import { useState, useCallback } from 'react';
import { loadRazorpayScript } from '@/lib/loadRazorpay';

export function useRazorpay() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const clearError = useCallback(() => setError(null), []);

  const initiatePayment = useCallback(
    async ({
      cartItems,
      addressData,
      total,
      user,
      onSuccess,
      onFailure,
    }) => {
      setIsProcessing(true);
      setError(null);

      try {
        // Step 1: Ensure Razorpay SDK is loaded
        const isLoaded = await loadRazorpayScript();
        if (!isLoaded) {
          throw new Error('Razorpay payment gateway failed to load. Please check your internet connection.');
        }

        // Step 2: Create Order on Server
        const createRes = await fetch('/api/payment/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cartItems,
            addressData,
            total,
          }),
        });

        const orderData = await createRes.json();
        if (!createRes.ok || !orderData.orderId) {
          throw new Error(orderData.error || 'Failed to initialize payment order');
        }

        // Step 3: Configure Razorpay Checkout Options
        const options = {
          key: orderData.keyId,
          amount: orderData.amount,
          currency: orderData.currency || 'INR',
          name: 'Prachin Luxe',
          description: `Curated Heritage Order • ${cartItems.length} Piece(s)`,
          image: '/src/assets/images/logo.png', // Optional branding logo
          order_id: orderData.orderId,
          prefill: {
            name: addressData?.name || user?.name || '',
            email: addressData?.email || user?.email || '',
            contact: addressData?.phone || user?.phoneNumber || user?.phone || '',
          },
          notes: {
            address: `${addressData?.street}, ${addressData?.city}, ${addressData?.state} - ${addressData?.zip}`,
          },
          theme: {
            color: '#0B192C', // Royal Blue
            backdrop_color: 'rgba(11, 25, 44, 0.65)',
          },
          modal: {
            ondismiss: () => {
              setIsProcessing(false);
              if (onFailure) {
                onFailure({ cancelled: true, message: 'Payment cancelled by user.' });
              }
            },
          },
          handler: async (response) => {
            try {
              // Step 4: Verify Payment Signature on Server
              const verifyRes = await fetch('/api/payment/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  cartItems,
                  addressData,
                  total,
                  userId: user?.id || user?._id,
                  userEmail: user?.email || addressData?.email,
                  userPhone: user?.phoneNumber || user?.phone || addressData?.phone,
                }),
              });

              const verifyData = await verifyRes.json();

              if (!verifyRes.ok || !verifyData.success) {
                throw new Error(verifyData.error || 'Payment verification failed');
              }

              setIsProcessing(false);
              if (onSuccess) {
                onSuccess(verifyData.order);
              }
            } catch (err) {
              console.error('Verification error:', err);
              setIsProcessing(false);
              const errMsg = err.message || 'Payment signature verification failed';
              setError(errMsg);
              if (onFailure) {
                onFailure({ cancelled: false, message: errMsg });
              }
            }
          },
        };

        const razorpayInstance = new window.Razorpay(options);

        razorpayInstance.on('payment.failed', function (response) {
          console.error('Razorpay payment failed:', response.error);
          setIsProcessing(false);
          const failMsg = response.error?.description || 'Payment transaction failed. Please try again.';
          setError(failMsg);
          if (onFailure) {
            onFailure({ cancelled: false, message: failMsg, error: response.error });
          }
        });

        razorpayInstance.open();
      } catch (err) {
        console.error('Checkout error:', err);
        setIsProcessing(false);
        const errorText = err.message || 'Unable to process checkout. Please try again.';
        setError(errorText);
        if (onFailure) {
          onFailure({ cancelled: false, message: errorText });
        }
      }
    },
    []
  );

  return {
    initiatePayment,
    isProcessing,
    error,
    clearError,
  };
}
