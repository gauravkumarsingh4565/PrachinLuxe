import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Shipping Policy | Prachin Luxy',
  description: 'Shipping policy for Prachin Luxy orders.',
};

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-sand-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 shadow-royal rounded-sm border border-gold-200">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-cinzel text-3xl md:text-4xl font-bold text-royal-blue-900 mb-4">
            Shipping Policy
          </h1>
          <div className="w-24 h-1 bg-gold-500 mx-auto rounded-full"></div>
        </div>

        {/* Content */}
        <div className="font-outfit text-[#34495e] space-y-8 leading-relaxed">
          
          <section>
            <h2 className="font-cinzel text-xl font-bold text-royal-blue-800 mb-3">1. Order Processing and Delivery</h2>
            <p>
              Shipping orders are typically processed within <strong>1-2 business days</strong> and delivered within <strong>5-7 business days</strong>, depending on the destination.
            </p>
          </section>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm">
              If you have any questions regarding our shipping policy, please contact our support team at <a href="mailto:prachin.luxy@gmail.com" className="text-gold-600 hover:underline">prachin.luxy@gmail.com</a>.
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
}
