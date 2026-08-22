import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Prachin Luxy',
  description: 'Privacy Policy for Prachin Luxy. Learn how we collect, use, and protect your data.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-sand-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 shadow-royal rounded-sm border border-gold-200">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-cinzel text-3xl md:text-4xl font-bold text-royal-blue-900 mb-4">
            Privacy Policy
          </h1>
          <div className="w-24 h-1 bg-gold-500 mx-auto rounded-full"></div>
        </div>

        {/* Content */}
        <div className="font-outfit text-[#34495e] space-y-8 leading-relaxed">
          
          <section>
            <h2 className="font-cinzel text-xl font-bold text-royal-blue-800 mb-3">Introduction</h2>
            <p className="mb-3">
              This Privacy Policy describes how <strong>Prachin Luxy</strong> and its affiliates collect, use, share, protect or otherwise process your information/personal data through our website https://prachinluxy.com.
            </p>
            <p className="mb-3">
              You may be able to browse certain sections of the Platform without registering with us.
            </p>
            <p>
              By visiting this Platform, providing your information or availing any product/service offered on the Platform, you expressly agree to be bound by the terms and conditions of this Privacy Policy, the Terms of Use and the applicable service/product terms and conditions, and agree to be governed by the laws of India including but not limited to the laws applicable to data protection and privacy. If you do not agree please do not use or access our Platform.
            </p>
          </section>

          <section>
            <h2 className="font-cinzel text-xl font-bold text-royal-blue-800 mb-3">Collection</h2>
            <p className="mb-3">
              We collect your personal data when you use our Platform, services or otherwise interact with us during the course of our relationship. This includes information such as name, date of birth, address, phone number, email, proof of identity/address, and sensitive information like payment details or biometric data.
            </p>
            <p>
              We may also track your behavior, preferences, and other information you provide, and collect data about your transactions on our Platform or third-party business partner platforms. You are advised never to share confidential details like card PIN or banking passwords.
            </p>
          </section>

          <section>
            <h2 className="font-cinzel text-xl font-bold text-royal-blue-800 mb-3">Usage</h2>
            <p>
              We use your personal data to provide the services you request, process orders, enhance customer experience, resolve disputes, troubleshoot problems, detect fraud, enforce our terms, and for marketing research/analysis. Marketing uses will always allow you to opt out.
            </p>
          </section>

          <section>
            <h2 className="font-cinzel text-xl font-bold text-royal-blue-800 mb-3">Sharing</h2>
            <p>
              We may share your personal data internally within our group entities, affiliates, sellers, logistics partners, payment providers, and other service providers. We may disclose data to government or law enforcement agencies where legally required or in good faith for security, legal, or fraud prevention purposes.
            </p>
          </section>

          <section>
            <h2 className="font-cinzel text-xl font-bold text-royal-blue-800 mb-3">Security Precautions</h2>
            <p>
              We adopt reasonable security practices and procedures to protect your personal data. However, data transmission over the internet is not fully secure, and users accept the risks associated with it. Protect your login and password at all times.
            </p>
          </section>

          <section>
            <h2 className="font-cinzel text-xl font-bold text-royal-blue-800 mb-3">Data Deletion and Retention</h2>
            <p>
              You may delete your account from profile/settings, which will erase related information. Deletion may be delayed in case of pending services, claims, or grievances. We retain personal data only as long as required, but may keep anonymized data for research/analysis.
            </p>
          </section>

          <section>
            <h2 className="font-cinzel text-xl font-bold text-royal-blue-800 mb-3">Your Rights</h2>
            <p>
              You may access, rectify, and update your personal data directly on the Platform. You also have the right to withdraw consent by writing to the Grievance Officer (details below).
            </p>
          </section>

          <section>
            <h2 className="font-cinzel text-xl font-bold text-royal-blue-800 mb-3">Consent</h2>
            <p>
              By providing your personal data, you consent to its collection, use, storage, and processing in accordance with this Privacy Policy. You consent to being contacted via SMS, calls, email, or messaging apps for the purposes mentioned herein. Withdrawal of consent may impact services.
            </p>
          </section>

          <section>
            <h2 className="font-cinzel text-xl font-bold text-royal-blue-800 mb-3">Changes to this Privacy Policy</h2>
            <p>
              Please check our Privacy Policy periodically for updates. We may notify you of significant changes as required by law.
            </p>
          </section>

          <section className="bg-sand-100 p-6 rounded-sm border border-gold-200 mt-8">
            <h2 className="font-cinzel text-xl font-bold text-royal-blue-800 mb-4">Grievance Officer</h2>
            <ul className="space-y-2">
              <li><strong>Contact:</strong> +91-9348400351</li>
              <li><strong>Email:</strong> <a href="mailto:prachin.luxy@gmail.com" className="text-gold-600 hover:underline">prachin.luxy@gmail.com</a></li>
              <li><strong>Address:</strong> Gadadhar Nivas, Hatijhari, Baisinga, Mayurbhanj, Odisha, 757052</li>
              <li><strong>Time:</strong> Monday - Saturday (9:00 - 18:00)</li>
            </ul>
          </section>
          
        </div>
      </div>
    </div>
  );
}
