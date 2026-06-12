import React from 'react';
import craftsmanImage from '../assets/images/craftsman.png';

const stats = [
  { value: '500+', label: 'Handcrafted Pieces' },
  { value: '25+', label: 'Years of Heritage' },
  { value: '100%', label: 'Authentic Materials' },
  { value: '50+', label: 'Master Artisans' },
];

const AboutSection = () => {
  return (
    <section className="bg-gradient-to-b from-sand-200 to-sand-50 py-24 px-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
        {/* Left Column — Image with decorative frame */}
        <div className="lg:w-1/2 flex justify-center">
          <div className="relative">
            {/* Decorative gold border frame offset */}
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-gold-500/50 rounded-sm pointer-events-none" />
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-gold-500/30 rounded-sm pointer-events-none" />

            {/* Main image */}
            <img
              src={craftsmanImage}
              alt="Master craftsman at work"
              className="relative z-10 w-full max-w-md lg:max-w-lg object-cover rounded-sm shadow-2xl shadow-royal-blue-900/25"
            />

            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 z-20 bg-gradient-to-br from-gold-500 to-gold-700 text-royal-blue-950 px-5 py-3 rounded-sm shadow-lg shadow-gold-700/30">
              <span className="block text-2xl font-bold font-cinzel leading-tight">25+</span>
              <span className="block text-xs font-semibold tracking-wider uppercase">
                Years of Heritage
              </span>
            </div>
          </div>
        </div>

        {/* Right Column — Text content */}
        <div className="lg:w-1/2">
          {/* Label */}
          <span className="inline-block text-royal-blue-950 text-sm tracking-[0.3em] uppercase font-semibold mb-4 border border-gold-500/30 px-4 py-1.5 rounded-full">
            Our Legacy
          </span>

          {/* Title */}
          <h2 className="font-cinzel-decorative text-3xl sm:text-4xl lg:text-5xl text-royal-blue-900 leading-tight mb-8">
            Preserving the Art of Royal Craftsmanship
          </h2>

          {/* Paragraphs */}
          <p className="text-royal-blue-700/80 leading-relaxed mb-5 text-base lg:text-lg">
            For over two decades, Prachin Luxe has been the custodian of India's most
            exquisite jewelry traditions. Our master artisans, inheritors of techniques
            passed down through generations of royal court jewelers, breathe life into
            every piece with meticulous hand-craftsmanship that honours centuries of
            heritage.
          </p>
          <p className="text-royal-blue-700/80 leading-relaxed mb-12 text-base lg:text-lg">
            Each creation is a testament to the grandeur of Mughal and Rajputana
            aesthetics — from the delicate Kundan settings to the radiant Polki
            diamonds, every gem is carefully selected and placed to tell a story of
            timeless elegance and unmatched artistry.
          </p>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/70 border border-gold-500/20 rounded-sm p-5 text-center hover:border-gold-500/40 transition-colors duration-300"
              >
                <span className="block text-royal-blue-950 text-3xl font-bold font-cinzel mb-1">
                  {stat.value}
                </span>
                <span className="block text-royal-blue-600/70 text-sm tracking-wide">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
