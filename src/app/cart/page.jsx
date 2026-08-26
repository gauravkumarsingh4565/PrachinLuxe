"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCartItems,
  selectIsCartLoaded,
  selectCartTotal,
  updateQuantity as updateQuantityAction,
  removeFromCart as removeFromCartAction,
  clearCart as clearCartAction,
} from '@/redux/slices/cartSlice';
import { useRouter } from 'next/navigation';
import CheckoutForm from '@/components/CheckoutForm';
import {
  addOrder as addOrderAction,
  selectUser,
  selectAddresses,
} from '@/redux/slices/authSlice';
import { useSession } from 'next-auth/react';
import { useRazorpay } from '@/hooks/useRazorpay';
import Image from 'next/image';
import confetti from 'canvas-confetti';

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const isLoaded = useSelector(selectIsCartLoaded);
  const cartTotal = useSelector(selectCartTotal);
  const router = useRouter();

  const phoneUser = useSelector(selectUser);
  const savedAddresses = useSelector(selectAddresses);
  const { data: session } = useSession();
  const currentUser = phoneUser || session?.user;

  const [checkoutStep, setCheckoutStep] = useState(1); // 1 = Review, 2 = Details Form, 3 = Success
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const defaultAddr = savedAddresses?.find((a) => a.isDefault) || savedAddresses?.[0];

  useEffect(() => {
    if (checkoutStep === 3) {
      const end = Date.now() + 3 * 1000; // 3 seconds
      const colors = ['#C9A84C', '#1e3a8a', '#ffffff', '#fde68a']; // Prachin Luxe themed colors

      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.6 },
          colors: colors,
          zIndex: 9999
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.6 },
          colors: colors,
          zIndex: 9999
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    }
  }, [checkoutStep]);

  const [addressData, setAddressData] = useState({
    name: '',
    phone: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip: '',
  });

  // Pre-populate address if user is logged in
  useEffect(() => {
    if (defaultAddr) {
      setAddressData({
        name: defaultAddr.name || currentUser?.name || '',
        phone: defaultAddr.phone || currentUser?.phoneNumber || currentUser?.phone || '',
        email: defaultAddr.email || currentUser?.email || '',
        street: defaultAddr.street || '',
        city: defaultAddr.city || '',
        state: defaultAddr.state || '',
        zip: defaultAddr.zip || '',
      });
    } else if (currentUser) {
      setAddressData((prev) => ({
        ...prev,
        name: prev.name || currentUser.name || '',
        email: prev.email || currentUser.email || '',
        phone: prev.phone || currentUser.phoneNumber || currentUser.phone || '',
      }));
    }
  }, [currentUser, defaultAddr]);

  const { initiatePayment, isProcessing, error, clearError } = useRazorpay();

  const subtotal = cartTotal;
  const finalTotal = subtotal;

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();

    initiatePayment({
      cartItems,
      addressData,
      total: finalTotal,
      user: currentUser,
      onSuccess: (savedOrder) => {
        dispatch(addOrderAction(savedOrder));
        dispatch(clearCartAction());
        setConfirmedOrder(savedOrder);
        setCheckoutStep(3);
      },
      onFailure: (err) => {
        console.error('Checkout failed:', err);
      },
    });
  };

  if (!isLoaded) {
    return (
      <div className="w-full min-h-screen bg-sand-100 py-12 px-4 flex items-center justify-center font-cormorant">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-cinzel text-lg font-semibold text-royal-blue-900 tracking-wider">
            Loading Your Bag...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-sand-100 py-12 px-4 md:px-8 font-cormorant">
      <div className="max-w-[1280px] mx-auto">
        {checkoutStep === 3 ? (
          /* ================= SUCCESS STATE ================= */
          <div className="bg-white max-w-[700px] mx-auto rounded-2xl p-8 md:p-12 border border-gold-500/20 shadow-gold text-center animate-fade-in-up">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-200 shadow-sm">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="font-cinzel text-3xl font-bold text-royal-blue-950 tracking-wider mb-2">
              Order Placed Successfully!
            </h1>
            <p className="text-gold-700 font-cinzel text-xs tracking-widest uppercase mb-6">
              Payment Verified • Awaiting Admin Review & Confirmation
            </p>

            <div className="h-px bg-gold-200/50 w-full mb-6" />

            {/* Order Details Badge */}
            {confirmedOrder && (
              <div className="bg-sand-50/70 border border-gold-500/20 rounded-xl p-5 mb-6 text-left space-y-2.5 font-sans text-xs">
                <div className="flex justify-between items-center text-royal-blue-950 font-semibold border-b border-gold-500/10 pb-2">
                  <span className="font-cinzel uppercase tracking-wider text-[11px]">Order Reference</span>
                  <span className="font-mono font-bold text-sm text-royal-blue-900">
                    {confirmedOrder.id || confirmedOrder.orderId}
                  </span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <span>Order Status:</span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    {confirmedOrder.status || 'Pending Approval'}
                  </span>
                </div>
                {confirmedOrder.paymentId && (
                  <div className="flex justify-between items-center text-gray-600">
                    <span>Razorpay Payment ID:</span>
                    <span className="font-mono text-gray-900 font-medium">
                      {confirmedOrder.paymentId}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center text-gray-600">
                  <span>Date:</span>
                  <span>{confirmedOrder.date || new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <span>Paid Total:</span>
                  <span className="font-bold text-royal-blue-900 font-cinzel text-sm">
                    Rs. {Number(confirmedOrder.total).toLocaleString('en-IN')}
                  </span>
                </div>
                {confirmedOrder.shippingAddress && (
                  <div className="pt-2 border-t border-gold-500/10 text-gray-500 text-[11px]">
                    <span className="font-semibold text-gray-700">Delivering to: </span>
                    {confirmedOrder.shippingAddress.name}, {confirmedOrder.shippingAddress.street},{' '}
                    {confirmedOrder.shippingAddress.city}, {confirmedOrder.shippingAddress.state} -{' '}
                    {confirmedOrder.shippingAddress.zip}
                  </div>
                )}
              </div>
            )}

            <p className="text-gray-600 text-base leading-relaxed mb-8">
              Thank you for choosing <span className="font-bold text-royal-blue-900">Prachin Luxe</span>. Your order of handcrafted heritage treasures has been securely placed. A confirmation and tracking receipt has been forwarded to your email.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/orders"
                className="px-8 py-3.5 bg-royal-blue-900 text-white rounded-lg font-cinzel text-xs font-bold tracking-widest hover:bg-gold-600 hover:shadow-lg transition-all duration-300 uppercase"
              >
                View My Orders
              </Link>
              <Link
                href="/"
                className="px-8 py-3.5 bg-white text-royal-blue-900 border border-royal-blue-900 rounded-lg font-cinzel text-xs font-bold tracking-widest hover:bg-royal-blue-50 transition-all duration-300 uppercase"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : cartItems.length === 0 && checkoutStep !== 3 ? (
          /* ================= EMPTY CART STATE ================= */
          <div className="bg-white max-w-[650px] mx-auto rounded-2xl p-10 md:p-16 border border-gold-500/10 shadow-sm text-center">
            <div className="w-24 h-24 bg-sand-100 rounded-full flex items-center justify-center mx-auto mb-8 border border-gold-500/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-gold-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </div>
            <h1 className="font-cinzel text-2xl md:text-3xl font-bold text-royal-blue-950 tracking-wider mb-4">
              Your Shopping Bag is Empty
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-md mx-auto">
              You haven't added any luxury pieces or antique treasures to your collection yet. Start exploring our curations to find something unique.
            </p>
            <Link
              href="/"
              className="inline-block px-10 py-4 bg-royal-blue-900 hover:bg-gold-600 text-white rounded-lg font-cinzel text-xs font-bold tracking-widest transition-all duration-300 hover:shadow-lg uppercase"
            >
              Explore Collections
            </Link>
          </div>
        ) : (
          /* ================= ACTIVE STATE ================= */
          <div className="animate-fade-in">
            {/* Page Header */}
            <div className="text-center mb-10">
              <h1 className="font-cinzel text-3xl sm:text-4xl font-bold text-royal-blue-950 tracking-widest uppercase mb-2">
                Shopping Bag
              </h1>
              <p className="text-gold-700 font-cinzel text-[10px] sm:text-xs tracking-widest uppercase">
                Review & Checkout Your Curated Treasures
              </p>
              <div className="ornamental-divider mt-4" />
            </div>

            {/* Main Cart Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Left Side: Items or Details Form */}
              <div className="lg:col-span-2 space-y-6">
                {checkoutStep === 1 ? (
                  /* ================= STEP 1: ITEM LIST ================= */
                  <div className="bg-white rounded-2xl border border-gold-500/10 shadow-sm overflow-hidden">
                    <div className="p-5 bg-stone-50/50 border-b border-gold-500/10 flex justify-between items-center">
                      <h2 className="font-cinzel text-sm font-bold text-royal-blue-900 tracking-wider">
                        Bagged Items ({cartItems.length})
                      </h2>
                      <button
                        onClick={() => dispatch(clearCartAction())}
                        className="text-xs font-cinzel font-bold text-red-600 hover:text-red-800 transition-colors uppercase tracking-wider"
                      >
                        Clear All
                      </button>
                    </div>

                    <div className="divide-y divide-gray-100">
                      {cartItems.map((item) => {
                        const priceNum =
                          typeof item.product.price === 'number'
                            ? item.product.price
                            : parseFloat(
                                String(item.product.price || 0).replace(/,/g, '')
                              );
                        const itemTotal = priceNum * item.quantity;
                        return (
                          <div
                            key={item.product.id}
                            className="p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center"
                          >
                            {/* Product Image */}
                            <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 bg-sand-50 rounded-xl overflow-hidden border border-gold-500/15 p-1 shadow-sm">
                              <Image
                                src={item.product.img}
                                alt={item.product.name}
                                fill
                                sizes="(max-width: 640px) 96px, 112px"
                                className="object-cover rounded-lg"
                              />
                            </div>

                            {/* Details & Action */}
                            <div className="flex-grow flex flex-col sm:flex-row justify-between w-full gap-4">
                              <div className="space-y-1">
                                <span className="text-[10px] sm:text-xs font-bold text-gold-600 uppercase tracking-widest">
                                  {item.product.category}
                                </span>
                                <h3
                                  onClick={() =>
                                    router.push(`/product/${item.product.id}`)
                                  }
                                  className="font-cinzel text-base sm:text-lg font-bold text-royal-blue-900 hover:text-gold-600 cursor-pointer transition-colors leading-tight"
                                >
                                  {item.product.name}
                                </h3>
                                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">
                                  ID: {item.product.id}
                                </p>
                                <div className="text-royal-blue-950 font-bold text-sm sm:text-base mt-2">
                                  Rs. {item.product.price}
                                </div>
                              </div>

                              {/* Quantity & Total Column */}
                              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3">
                                {/* Quantity controls */}
                                <div className="flex items-center border border-gold-500/30 rounded-lg overflow-hidden bg-white shadow-sm w-fit scale-90 sm:scale-100">
                                  <button
                                    onClick={() =>
                                      dispatch(
                                        updateQuantityAction({
                                          productId: item.product.id,
                                          action: 'dec',
                                        })
                                      )
                                    }
                                    className="px-2.5 py-1 hover:bg-gold-50 text-royal-blue-900 font-bold transition-colors text-base"
                                    aria-label="Decrease quantity"
                                  >
                                    -
                                  </button>
                                  <span className="px-4 py-1 text-royal-blue-900 font-bold text-xs min-w-[32px] text-center border-l border-r border-gold-500/20">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() =>
                                      dispatch(
                                        updateQuantityAction({
                                          productId: item.product.id,
                                          action: 'inc',
                                        })
                                      )
                                    }
                                    className="px-2.5 py-1 hover:bg-gold-50 text-royal-blue-900 font-bold transition-colors text-base"
                                    aria-label="Increase quantity"
                                  >
                                    +
                                  </button>
                                </div>

                                {/* Total and Remove action */}
                                <div className="flex items-center gap-4">
                                  <span className="font-cinzel font-bold text-royal-blue-950 text-sm sm:text-base">
                                    Rs. {itemTotal.toLocaleString('en-IN')}
                                  </span>
                                  <button
                                    onClick={() =>
                                      dispatch(
                                        removeFromCartAction(item.product.id)
                                      )
                                    }
                                    className="text-gray-400 hover:text-red-600 transition-colors duration-300 p-1"
                                    aria-label="Remove item"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-5 w-5"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      strokeWidth={2}
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  /* ================= STEP 2: DETAILS/SHIPPING FORM ================= */
                  <CheckoutForm
                    addressData={addressData}
                    setAddressData={setAddressData}
                    onSubmit={handleCheckoutSubmit}
                    isCheckingOut={isProcessing}
                    error={error}
                    onClearError={clearError}
                    onBack={() => setCheckoutStep(1)}
                  />
                )}
              </div>

              {/* Right Side: Order Summary Panel */}
              <div className="bg-white rounded-2xl border border-gold-500/20 shadow-gold p-6 md:p-8 flex flex-col gap-6 sticky top-24">
                <div>
                  <h2 className="font-cinzel text-base font-bold text-royal-blue-900 tracking-wider">
                    Order Summary
                  </h2>
                  <div className="h-0.5 bg-gold-500/20 w-full mt-3" />
                </div>

                <div className="space-y-4 font-sans text-[15px] text-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-500">Cart Subtotal</span>
                    <span className="font-bold text-royal-blue-900">
                      Rs. {subtotal.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="h-px bg-gray-100 w-full my-2" />

                  <div className="flex justify-between items-baseline font-cinzel">
                    <span className="font-bold text-royal-blue-950 text-sm tracking-wider uppercase">
                      Order Total
                    </span>
                    <span className="font-black text-xl sm:text-2xl text-royal-blue-900">
                      Rs. {finalTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {checkoutStep === 1 && (
                  currentUser ? (
                    <button
                      onClick={() => setCheckoutStep(2)}
                      className="w-full py-4 bg-royal-blue-900 hover:bg-gold-600 text-white rounded-lg font-cinzel text-xs font-bold tracking-widest transition-all duration-300 hover:shadow-lg uppercase text-center flex items-center justify-center gap-2"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                      Proceed To Secure Checkout
                    </button>
                  ) : (
                    <button
                      onClick={() => router.push('/login')}
                      className="w-full py-4 bg-royal-blue-900 hover:bg-gold-600 text-white rounded-lg font-cinzel text-xs font-bold tracking-widest transition-all duration-300 hover:shadow-lg uppercase text-center flex items-center justify-center gap-2"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      Login To Checkout
                    </button>
                  )
                )}

                {/* Trust Seal */}
                <div className="bg-sand-50/50 p-4 rounded-xl border border-gold-500/10 text-center space-y-3">
                  <p className="text-[10px] font-bold text-gray-500 tracking-wider uppercase font-cinzel">
                    Prachin Luxe Guarantees
                  </p>
                  <div className="flex items-center justify-center gap-4 text-[10px] text-gray-500 font-bold uppercase tracking-wide">
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-3.5 h-3.5 text-gold-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M9 12l2 2 4-4"
                        />
                      </svg>
                      Authentic
                    </span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-3.5 h-3.5 text-gold-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M9 12l2 2 4-4"
                        />
                      </svg>
                      Insured
                    </span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-3.5 h-3.5 text-gold-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M9 12l2 2 4-4"
                        />
                      </svg>
                      Razorpay SSL
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
