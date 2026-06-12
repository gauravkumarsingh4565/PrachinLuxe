import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      console.log('Newsletter signup:', email);
      setEmail('');
    }
  };

  return (
    <section className="bg-gradient-to-r from-sand-200 via-sand-100 to-sand-200 relative overflow-hidden py-20 px-4">
      {/* Decorative Background Circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gold-500/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-gold-500/10 rounded-full translate-x-1/3 -translate-y-1/2" />
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-gold-500/10 rounded-full translate-y-1/2" />
      <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-gold-500/10 rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-gold-500/10 rounded-full" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        {/* Crown Icon */}
        <div className="flex justify-center mb-6">
          <svg
            className="w-12 h-12 text-gold-600"
            viewBox="0 0 64 64"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 48h48v4H8zM8 44l8-28 8 14 8-18 8 18 8-14 8 28z" />
          </svg>
        </div>

        {/* Title */}
        <h2 className="font-cinzel-decorative text-3xl lg:text-4xl text-royal-blue-900 mb-4">
          Join the Royal Court
        </h2>

        {/* Subtitle */}
        <p className="font-cormorant text-xl text-royal-blue-700/80 mb-10 max-w-xl mx-auto leading-relaxed">
          Subscribe to receive exclusive previews of our newest royal collections,
          artisan stories, and members-only offers delivered to your inbox.
        </p>

        {/* Email Signup Form */}
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          {/* Desktop: side-by-side | Mobile: stacked */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-0">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your royal email address"
              required
              className="w-full sm:flex-1 bg-white/80 border border-gold-500/30 text-royal-blue-900 placeholder-royal-blue-400/50 rounded sm:rounded-l sm:rounded-r-none px-6 py-3.5 font-cormorant text-lg focus:outline-none focus:border-gold-500/60 focus:ring-1 focus:ring-gold-500/30 transition-all duration-300"
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-[#1f4265] text-white rounded sm:rounded-r sm:rounded-l-none px-8 py-3.5 font-medium text-[15px] hover:bg-[#15304a] transition-colors duration-300 whitespace-nowrap"
            >
              Subscribe
            </button>
          </div>
        </form>

        {/* Trust Note */}
        <p className="font-cormorant text-sm text-royal-blue-500/60 mt-5 tracking-wide">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
