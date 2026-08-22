import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Cancellation and Return Policy | Prachin Luxy',
  description: 'Cancellation and return policy for Prachin Luxy orders.',
};

export default function CancellationReturnPage() {
  return (
    <div className="min-h-screen bg-sand-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 shadow-royal rounded-sm border border-gold-200">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-cinzel text-3xl md:text-4xl font-bold text-royal-blue-900 mb-4">
            Cancellation & Return Policy
          </h1>
          <div className="w-24 h-1 bg-gold-500 mx-auto rounded-full"></div>
        </div>

        {/* Content */}
        <div className="font-outfit text-[#34495e] space-y-8 leading-relaxed">
          
          <section>
            <h2 className="font-cinzel text-xl font-bold text-royal-blue-800 mb-3">1. Order Cancellation</h2>
            <p>
              You may cancel an order within <strong>24 hours</strong> of placing it for a full refund. 
              After 24 hours, cancellations are subject to approval and may be subject to a cancellation fee.
            </p>
          </section>

          <section>
            <h2 className="font-cinzel text-xl font-bold text-royal-blue-800 mb-3">2. Returns</h2>
            <p className="mb-3">
              We accept returns for eligible products within <strong>3 days</strong> from the date of delivery.
            </p>
            <p className="mb-3">
              To be eligible for a return, the product must be <strong>unused, in its original packaging, and in the same condition</strong> as when you received it.
            </p>
            <p>
              We do not ship out returns or exchanges, we only issue refunds.
            </p>
          </section>

          <section>
            <h2 className="font-cinzel text-xl font-bold text-royal-blue-800 mb-3">3. Refund Policy</h2>
            <p>
              If your refund is approved, we will credit the refundable amount into the beneficiary's account within <strong>7-21 working days</strong>.
            </p>
          </section>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm">
              If you have any questions or wish to request a cancellation or return, please contact our support team at <a href="mailto:prachin.luxy@gmail.com" className="text-gold-600 hover:underline">prachin.luxy@gmail.com</a>.
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
}
