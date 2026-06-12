import React from 'react';

const testimonials = [
  {
    quote:
      'The Kundan necklace I purchased is absolutely magnificent. The craftsmanship is beyond anything I have ever seen. It felt like owning a piece of Mughal history.',
    name: 'Priya Sharma',
    location: 'Jaipur, Rajasthan',
  },
  {
    quote:
      'PrachinLuxe delivered a bridal set that became the highlight of my wedding. Every guest was mesmerized by the intricate details and royal beauty of each piece.',
    name: 'Ananya Patel',
    location: 'Mumbai, Maharashtra',
  },
  {
    quote:
      'I collect antique pieces and the brass artifacts from PrachinLuxe are genuinely authentic. The patina, the weight, the detailing — everything speaks of true heritage.',
    name: 'Rajesh Mehta',
    location: 'Udaipur, Rajasthan',
  },
];

const StarIcon = () => (
  <svg
    className="w-4 h-4 text-gold-500 fill-current"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
  </svg>
);

const Testimonials = () => {
  return (
    <section className="bg-sand-50 py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block text-royal-blue-900 text-sm tracking-[0.3em] uppercase font-semibold mb-4">
            Testimonials
          </span>
          <h2 className="font-cinzel-decorative text-4xl lg:text-5xl text-royal-blue-900 leading-tight">
            Voices of Our Patrons
          </h2>
          <div className="mt-6 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-gradient-to-b from-white/80 to-sand-100/60 border border-gold-500/20 rounded-sm p-8 flex flex-col justify-between hover:border-gold-500/40 transition-colors duration-300 group"
            >
              {/* Large gold quote mark */}
              <div>
                <span className="block text-gold-500/30 text-7xl font-serif leading-none mb-4 select-none group-hover:text-gold-500/50 transition-colors duration-300">
                  &#8220;
                </span>

                {/* Quote text */}
                <p className="text-royal-blue-700/80 italic leading-relaxed text-base mb-8">
                  {testimonial.quote}
                </p>
              </div>

              {/* Footer */}
              <div>
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>

                {/* Customer info */}
                <p className="font-cinzel text-royal-blue-800 text-lg font-semibold">
                  {testimonial.name}
                </p>
                <p className="text-royal-blue-500/70 text-sm mt-0.5">
                  {testimonial.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
