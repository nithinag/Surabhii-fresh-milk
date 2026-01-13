const Footer = ({ onFAQsClick }) => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFAQsClick = () => {
    if (onFAQsClick) {
      onFAQsClick();
    } else {
      scrollToSection('faqs');
    }
  };

  return (
    <footer className="bg-charcoal text-white py-10 sm:py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div className="sm:col-span-2">
            <button
              onClick={() => scrollToSection('home')}
              className="mb-4 sm:mb-5 md:mb-6 inline-flex items-center gap-2 sm:gap-3 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary-green focus:ring-offset-2 focus:ring-offset-charcoal rounded"
              aria-label="Go to homepage"
            >
              <img 
                src="/logo.svg" 
                alt="Surabhii Fresh Milk - Premium Organic Cow Milk" 
                className="h-12 sm:h-16 md:h-20 lg:h-24 xl:h-28 w-auto max-w-[160px] sm:max-w-[200px] md:max-w-[280px] lg:max-w-[320px] xl:max-w-[360px] object-contain"
              />
              <div className="flex flex-col justify-center leading-tight">
                <span className="text-white font-bold uppercase text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl tracking-tight">
                  SURABHII
                </span>
                <span className="text-white font-semibold uppercase text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl tracking-tight">
                  FRESH MILK
                </span>
              </div>
            </button>
            <p className="text-white/80 mb-4 leading-relaxed text-sm sm:text-base">
              Premium organic cow milk delivered fresh in glass bottles. Freshness you can trust, delivered within minutes.
            </p>
            <div className="flex items-center gap-2 text-white/70">
              <svg className="w-5 h-5 text-primary-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href="tel:+919600642226" className="hover:text-primary-green transition-colors">
                +91 9600642226
              </a>
            </div>
            <div className="flex items-center gap-2 text-white/70 mt-2">
              <svg className="w-5 h-5 text-primary-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <a href="https://wa.me/9600642226" target="_blank" rel="noopener noreferrer" className="hover:text-primary-green transition-colors">
                WhatsApp
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">Quick Links</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-white/80 text-sm sm:text-base">
              <li><button onClick={() => scrollToSection('home')} className="hover:text-primary-green transition-colors touch-manipulation py-1">Home</button></li>
              <li><button onClick={() => scrollToSection('about')} className="hover:text-primary-green transition-colors touch-manipulation py-1">About Us</button></li>
              <li><button onClick={() => scrollToSection('products')} className="hover:text-primary-green transition-colors touch-manipulation py-1">Products</button></li>
              <li><button onClick={() => scrollToSection('memberships')} className="hover:text-primary-green transition-colors touch-manipulation py-1">Memberships</button></li>
              <li><button onClick={() => scrollToSection('order-history')} className="hover:text-primary-green transition-colors touch-manipulation py-1">My Orders</button></li>
              <li><button onClick={handleFAQsClick} className="hover:text-primary-green transition-colors touch-manipulation py-1">FAQs</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">Contact</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-white/80 text-sm sm:text-base">
              <li>
                <a href="https://wa.me/9600642226" target="_blank" rel="noopener noreferrer" className="hover:text-primary-green transition-colors flex items-center gap-2 touch-manipulation py-1">
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  WhatsApp Support
                </a>
              </li>
              <li>
                <a href="tel:+919600642226" className="hover:text-primary-green transition-colors flex items-center gap-2 touch-manipulation py-1">
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  +91 9600642226
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 mt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
            <p className="text-white/70 text-sm">© {new Date().getFullYear()} SURABHII FRESH MILK. All rights reserved.</p>
            
            <div className="flex flex-col items-center md:items-end">
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-primary-green uppercase">Connect with Us</h4>
              <div className="flex items-center gap-2.5 sm:gap-3 md:gap-4">
                <a 
                  href="https://www.facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors group touch-manipulation min-w-[44px] min-h-[44px]"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5 text-white group-hover:text-primary-green transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                
                <a 
                  href="https://www.youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors group touch-manipulation min-w-[44px] min-h-[44px]"
                  aria-label="YouTube"
                >
                  <svg className="w-5 h-5 text-white group-hover:text-primary-green transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                
                <a 
                  href="https://www.instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors group touch-manipulation min-w-[44px] min-h-[44px]"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5 text-white group-hover:text-primary-green transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                
                <a 
                  href="https://www.linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors group touch-manipulation min-w-[44px] min-h-[44px]"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5 text-white group-hover:text-primary-green transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                
                <a 
                  href="https://wa.me/9600642226" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-green-600 hover:bg-green-700 flex items-center justify-center transition-colors group touch-manipulation min-w-[44px] min-h-[44px]"
                  aria-label="WhatsApp"
                >
                  <svg className="w-5 h-5 text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.977 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-6 mt-6">
            <p className="text-center text-white/60 text-xs sm:text-sm">
              For questions regarding the website's performance or design, please contact the developer{' '}
              <a 
                href="mailto:nithin.nagabushanam@example.com" 
                className="text-primary-green hover:text-secondary-green transition-colors font-semibold"
              >
                NITHIN NAGABUSHANAM
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
