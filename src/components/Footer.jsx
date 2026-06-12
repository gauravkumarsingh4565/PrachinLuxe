import React from 'react';

const Footer = () => {
  return (
    <footer className="relative w-full bg-[#f8f6f0] pt-16 overflow-hidden text-[#2c3e50] font-sans">
      
      {/* 4 Column Layout */}
      <div className="max-w-7xl mx-auto px-6 pb-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Column 1: Be In The Know */}
          <div className="flex flex-col">
            <h4 className="font-cormorant font-semibold text-xl mb-4 text-[#1a252f]">Be In The Know</h4>
            <p className="text-sm text-[#34495e] mb-6 leading-relaxed font-medium">
              By signing up for alerts, you agree to receive e-mails, calls and text messages from Prachin Luxe.
            </p>
            
            {/* Email Input */}
            <div className="flex items-center border-b border-[#a6b0b7] pb-2 mb-8">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full bg-transparent border-none outline-none text-sm text-[#2c3e50] placeholder-[#7f8c8d]"
              />
              <button className="text-[#d4af37] hover:text-[#b08d2b] transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </button>
            </div>

            {/* Follow Us */}
            <h4 className="font-cormorant font-semibold text-lg mb-3 text-[#1a252f]">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="text-[#34495e] hover:text-[#1a252f] transition-colors">
                {/* Facebook Icon */}
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              <a href="#" className="text-[#34495e] hover:text-[#1a252f] transition-colors">
                {/* Instagram Icon */}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="text-[#34495e] hover:text-[#1a252f] transition-colors">
                {/* Pinterest Icon */}
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641 0 12.017 0z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col">
            <h4 className="font-cormorant font-semibold text-xl mb-4 text-[#1a252f]">Quick links</h4>
            <ul className="space-y-3">
              {['Terms of service', 'Privacy Policy', 'Refund and Cancellations', 'Shipping Policy', 'Return and Exchange'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-[#34495e] font-medium hover:text-[#d4af37] transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Main Categories */}
          <div className="flex flex-col">
            <h4 className="font-cormorant font-semibold text-xl mb-4 text-[#1a252f]">Main Categories</h4>
            <ul className="space-y-3">
              {['Handmade Jewelry', 'Antique Treasures'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-[#34495e] font-medium hover:text-[#d4af37] transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="flex flex-col">
            <h4 className="font-cormorant font-semibold text-xl mb-4 text-[#1a252f]">Contact Us</h4>
            <ul className="space-y-5">
              
              {/* Address */}
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#34495e] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span className="text-sm text-[#34495e] font-medium">
                  Johari Bazaar, Pink City,<br />
                  Jaipur, Rajasthan 302001
                </span>
              </li>

              {/* Hours */}
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#34495e] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-[#34495e] font-medium">
                  Open all 7 days a week<br />
                  10:00 AM to 8:00 PM IST
                </span>
              </li>

              {/* Phone */}
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[#34495e] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <span className="text-sm text-[#34495e] font-medium">+91 9950510448</span>
              </li>

              {/* Email */}
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[#34495e] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span className="text-sm text-[#34495e] font-medium">namaste@prachinluxe.com</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Decorative Skyline Vector - Represents palaces/forts */}
      {/* High-Detail Heritage Story Vector - Clear Palace, Artisan Lady & Antiques */}
      {/* High-Detail Heritage Story Vector - Single Row Fixed */}
      <div className="w-full absolute bottom-12 left-0 right-0 h-[120px] z-0 opacity-50 pointer-events-none overflow-hidden">
         <svg width="100%" height="100%" className="text-[#d2b36e]">
            <defs>
               {/* Panoramic High-Detail Pattern - Width 800 for spacing, Height strictly 120 */}
               <pattern id="clear-story-pattern" x="0" y="0" width="800" height="120" patternUnits="userSpaceOnUse">
                  
                  {/* Base Ground Line */}
                  <rect x="0" y="115" width="800" height="5" fill="currentColor" />

                  {/* 1. DETAILED RAJPUTANA FORT (0 to 250) */}
                  <g transform="translate(20, 0)">
                     {/* Fort Wall Base */}
                     <rect x="0" y="65" width="200" height="50" fill="currentColor" />
                     
                     {/* Fort Battlements (Kangura Design) */}
                     <path d="M 0 65 L 0 55 L 10 55 L 10 65 L 20 65 L 20 55 L 30 55 L 30 65 L 40 65 L 40 55 L 50 55 L 50 65 L 60 65 L 60 55 L 70 55 L 70 65 L 80 65 L 80 55 L 90 55 L 90 65 L 100 65 L 100 55 L 110 55 L 110 65 L 120 65 L 120 55 L 130 55 L 130 65 L 140 65 L 140 55 L 150 55 L 150 65 L 160 65 L 160 55 L 170 55 L 170 65 L 180 65 L 180 55 L 190 55 L 190 65 L 200 65 L 200 55 L 200 65 Z" fill="currentColor" />
                     
                     {/* Large Royal Gateway (Darwaza) */}
                     <path d="M 70 115 L 70 75 Q 100 50 130 75 L 130 115 Z" fill="#f8f6f0" />
                     <path d="M 80 115 L 80 80 Q 100 65 120 80 L 120 115 Z" fill="currentColor" />
                     
                     {/* Jharokhas (Side Balconies) */}
                     <rect x="20" y="80" width="30" height="20" fill="#f8f6f0" />
                     <path d="M 15 80 L 55 80 L 45 70 L 25 70 Z" fill="currentColor" />
                     <rect x="150" y="80" width="30" height="20" fill="#f8f6f0" />
                     <path d="M 145 80 L 185 80 L 175 70 L 155 70 Z" fill="currentColor" />
                     
                     {/* Main Chhatri (Center Dome) */}
                     <rect x="85" y="45" width="30" height="20" fill="currentColor" />
                     <rect x="90" y="45" width="20" height="20" fill="#f8f6f0" />
                     <path d="M 75 45 C 75 10 125 10 125 45 Z" fill="currentColor" />
                     <line x1="100" y1="15" x2="100" y2="0" stroke="currentColor" strokeWidth="2" />
                     <polygon points="100,0 115,5 100,10" fill="currentColor" /> {/* Flag */}
                     
                     {/* Small Side Domes */}
                     <path d="M 25 55 C 25 35 45 35 45 55 Z" fill="currentColor" />
                     <path d="M 155 55 C 155 35 175 35 175 55 Z" fill="currentColor" />
                  </g>

                  {/* 2. ARTISAN LADY MAKING JEWELRY (300 to 500) */}
                  <g transform="translate(300, 0)">
                     {/* Lady Saree Posture (Sitting) */}
                     <path d="M 40 115 C 40 85 55 70 70 75 C 90 80 110 100 110 115 Z" fill="currentColor" />
                     <path d="M 10 115 C 10 90 25 85 40 85 L 40 115 Z" fill="currentColor" />
                     
                     {/* Head, Hair Bun & Face Profile */}
                     <path d="M 58 65 C 55 50 75 50 80 60 L 82 64 L 79 66 L 81 70 L 76 75 L 65 75 C 60 75 58 70 58 65 Z" fill="currentColor" />
                     <circle cx="55" cy="68" r="7" fill="currentColor" />
                     <circle cx="53" cy="61" r="3" fill="currentColor" />
                     
                     {/* Arms Making Jewelry */}
                     <path d="M 68 75 C 75 85 95 90 105 85" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                     <path d="M 65 78 C 70 88 85 92 90 95" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                     
                     {/* Pearl String */}
                     <path d="M 90 95 Q 100 110 105 85" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="1 4" strokeLinecap="round" />
                     
                     {/* Open Antique Jewelry Box */}
                     <polygon points="120,115 165,115 155,95 125,95" fill="currentColor" />
                     <polygon points="125,95 155,95 145,70 130,75" fill="currentColor" />
                     <circle cx="140" cy="105" r="2.5" fill="#f8f6f0" />
                     
                     {/* Pearls spilling */}
                     <circle cx="130" cy="92" r="2" fill="currentColor" />
                     <circle cx="135" cy="88" r="2" fill="currentColor" />
                     <circle cx="140" cy="91" r="2" fill="currentColor" />
                     <circle cx="145" cy="94" r="2" fill="currentColor" />
                     <circle cx="150" cy="90" r="2" fill="currentColor" />
                  </g>

                  {/* 3. ANTIQUE PIECES: SURAHI & SAMAI LAMP (550 to 750) */}
                  <g transform="translate(550, 0)">
                     
                     {/* Antique Surahi */}
                     <path d="M 30 115 L 60 115 L 55 105 L 35 105 Z" fill="currentColor" />
                     <ellipse cx="45" cy="85" rx="20" ry="20" fill="currentColor" />
                     <rect x="40" y="55" width="10" height="20" fill="currentColor" />
                     <polygon points="35,55 55,55 45,45" fill="currentColor" />
                     <path d="M 60 85 C 85 85 85 55 50 55" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                     <path d="M 30 85 Q 45 95 60 85" fill="none" stroke="#f8f6f0" strokeWidth="1.5" />
                     <path d="M 35 75 Q 45 85 55 75" fill="none" stroke="#f8f6f0" strokeWidth="1.5" />

                     {/* Tall Multi-Tiered Brass Lamp (Samai) */}
                     <path d="M 90 115 L 130 115 L 120 100 L 100 100 Z" fill="currentColor" /> 
                     <rect x="106" y="40" width="8" height="60" fill="currentColor" /> 
                     
                     {/* 3 Oil Plates */}
                     <polygon points="85,80 135,80 110,90" fill="currentColor" />
                     <polygon points="90,60 130,60 110,70" fill="currentColor" />
                     <polygon points="95,40 125,40 110,50" fill="currentColor" />
                     
                     {/* Flames (Jyot) */}
                     <path d="M 85 78 Q 85 70 83 75 Z" fill="currentColor" />
                     <path d="M 135 78 Q 135 70 137 75 Z" fill="currentColor" />
                     <path d="M 90 58 Q 90 50 88 55 Z" fill="currentColor" />
                     <path d="M 130 58 Q 130 50 132 55 Z" fill="currentColor" />
                     <path d="M 95 38 Q 95 30 93 35 Z" fill="currentColor" />
                     <path d="M 125 38 Q 125 30 127 35 Z" fill="currentColor" />
                     <path d="M 110 38 Q 110 25 110 35 Z" fill="currentColor" /> 
                  </g>

               </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#clear-story-pattern)" />
         </svg>
      </div>

      {/* Bottom Dark Blue Bar */}
      <div className="relative w-full h-12 bg-[#1a3654] z-20 flex items-center px-6">
        <p className="text-sm text-sand-100/70">
          © 2024 Prachin Luxe. All Rights Reserved.
        </p>

        {/* The Central Custom Arch (Dome) */}
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[380px] h-[100px] flex items-end justify-center">
           {/* SVG Dome Shape matching the golden border */}
           <svg viewBox="0 0 280 100" className="absolute bottom-0 w-full h-full" preserveAspectRatio="none">
              <path 
                d="M 0 100 C 40 100, 45 80, 50 60 C 60 10, 100 5, 140 5 C 180 5, 220 10, 230 60 C 235 80, 240 100, 280 100 Z" 
                fill="#1a3654" 
                stroke="#d2b36e" 
                strokeWidth="4" 
              />
           </svg>
           
           {/* Content inside Dome */}
           <div className="relative z-30 flex flex-col items-center justify-center pb-3">
              {/* Optional logo icon (elephant/crown) */}
              <svg className="w-8 h-8 text-[#d2b36e] mb-1" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M12 2L8 6h3v5h2V6h3l-4-4zm-7 8c-1.1 0-2 .9-2 2v8h4v-2h2v2h4v-2h2v2h4v-8c0-1.1-.9-2-2-2H5zm0 2h14v2H5v-2zm0 4h14v2H5v-2z"/>
              </svg>
              <h3 className="font-cinzel text-xl text-[#d2b36e] tracking-[0.2em] uppercase leading-none">
                Prachin Luxe
              </h3>
              <span className="font-sans text-[8px] text-white/60 tracking-[0.3em] uppercase mt-1">
                Heritage Revival
              </span>
           </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
