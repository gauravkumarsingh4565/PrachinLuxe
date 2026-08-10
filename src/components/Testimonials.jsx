import React from 'react';
import Image from 'next/image';

const testimonials = [
  {
    quote: 'The Kundan necklace I purchased is absolutely magnificent. The craftsmanship is beyond anything I have ever seen.',
    name: 'Priya Sharma',
    time: '1 months ago',
    avatar: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=8B4513&color=fff',
  },
  {
    quote: 'PrachinLuxe delivered a bridal set that became the highlight of my wedding. Every guest was mesmerized.',
    name: 'Ananya Patel',
    time: '2 months ago',
    avatar: 'https://ui-avatars.com/api/?name=Ananya+Patel&background=A0522D&color=fff',
  },
  {
    quote: 'Design is simple and pretty. Value for money. The detailing — everything speaks of true heritage.',
    name: 'Ritika',
    time: '1 months ago',
    avatar: 'https://ui-avatars.com/api/?name=Ritika&background=CD853F&color=fff',
  },
  {
    quote: 'Good finishing and decent shine. Looks nice overall. Lightweight and comfortable.',
    name: 'Pooja',
    time: '2 months ago',
    avatar: 'https://ui-avatars.com/api/?name=Pooja&background=D2691E&color=fff',
  },
  {
    quote: 'Nice quality and looks elegant. Happy with the purchase. Good daily wear.',
    name: 'Aarushi Sharma',
    time: '1 months ago',
    avatar: 'https://ui-avatars.com/api/?name=Aarushi+Sharma&background=8B4513&color=fff',
  },
];

const StarIcon = () => (
  <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
  </svg>
);

const Testimonials = () => {
  // Infinite scroll ke liye hum array ko duplicate kar rahe hain
  const infiniteTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="bg-[#fcfbf9] py-12 px-4 font-cormorant overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Title */}
        <h2 className="text-center text-2xl md:text-3xl font-semibold text-stone-800 mb-8">
          What our customers say
        </h2>

        {/* Google Rating Banner */}
        <div className="bg-white rounded-xl shadow-sm border border-stone-100 py-6 px-4 flex flex-col items-center justify-center mb-10 max-w-4xl mx-auto">
          <div className="flex items-center gap-1.5 mb-2 text-lg font-medium tracking-wide">
            <span className="text-[#4285F4]">G</span>
            <span className="text-[#EA4335]">o</span>
            <span className="text-[#FBBC05]">o</span>
            <span className="text-[#4285F4]">g</span>
            <span className="text-[#34A853]">l</span>
            <span className="text-[#EA4335]">e</span>
            <span className="text-stone-600 ml-1">Rating</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-semibold text-stone-700">4.7</span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} />
              ))}
            </div>
            <span className="text-sm text-stone-500 font-medium">11,248 reviews</span>
          </div>
        </div>

        {/* Auto Scrolling Marquee Section */}
        <div className="relative w-full overflow-hidden pb-6">
          
          {/* Custom Styles for Animation */}
          <style>{`
            @keyframes autoScroll {
              0% { transform: translateX(0); }
              /* -50% islye kyunki array double hai, half pe jake wapas reset ho jayega smoothly */
              100% { transform: translateX(-50%); } 
            }
            .animate-auto-scroll {
              display: flex;
              width: max-content;
              animation: autoScroll 35s linear infinite;
            }
            /* Hover karne par scroll ruk jayega jisse user padh sake */
            .animate-auto-scroll:hover {
              animation-play-state: paused;
            }
          `}</style>

          {/* Scrolling Container */}
          <div className="animate-auto-scroll gap-4 sm:gap-6">
            {infiniteTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm border border-stone-100 p-5 sm:p-6 w-[280px] sm:w-[300px] flex-shrink-0 flex flex-col transition-transform hover:-translate-y-1 duration-300"
              >
                {/* Avatar and Name */}
                <div className="flex items-center gap-3 mb-3">
                  <Image 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover border border-stone-200"
                  />
                  <h3 className="font-bold text-stone-800 text-sm">
                    {testimonial.name}
                  </h3>
                </div>

                {/* Stars and Time */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} />
                    ))}
                  </div>
                  <span className="text-xs text-stone-400 font-medium">{testimonial.time}</span>
                </div>

                {/* Review Text */}
                <p className="text-stone-600 text-sm leading-relaxed">
                  {testimonial.quote}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Features Footer Section */}
       <div className="mt-8 max-w-5xl mx-auto">
  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
    
    <div className="flex flex-col items-center justify-center gap-3">
      <svg className="w-8 h-8 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        <rect x="3" y="13" width="12" height="8" rx="1" stroke="currentColor" strokeWidth={1.5} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h4a2 2 0 002-2v-3.5a2.5 2.5 0 00-2.5-2.5H15v8z" />
        <circle cx="7.5" cy="21" r="1.5" stroke="currentColor" strokeWidth={1.5} />
        <circle cx="17.5" cy="21" r="1.5" stroke="currentColor" strokeWidth={1.5} />
      </svg>
      <span className="text-xs sm:text-sm font-medium text-stone-600">Free Shipping</span>
    </div>

    <div className="flex flex-col items-center justify-center gap-3">
      <svg className="w-8 h-8 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012-2m-2 6a6 6 0 016-6" />
      </svg>
      <span className="text-xs sm:text-sm font-medium text-stone-600">On Call Support</span>
    </div>

    <div className="flex flex-col items-center justify-center gap-3">
      <svg className="w-8 h-8 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth={1.5} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h.01M11 15h2" />
      </svg>
      <span className="text-xs sm:text-sm font-medium text-stone-600">Payment Secured</span>
    </div>

    <div className="flex flex-col items-center justify-center gap-3">
      <svg className="w-8 h-8 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
      <span className="text-xs sm:text-sm font-medium text-stone-600">Trusted Supplier</span>
    </div>

  </div>
</div>
      </div>
    </section>
  );
};

export default Testimonials;