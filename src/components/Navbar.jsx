import { useState, useEffect } from 'react';
import { getCartItemCount } from '../utils/cartUtils';
import { openWhatsApp } from '../utils/whatsappUtils';

const Navbar = ({ onCartClick, onFAQsClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateCartCount = () => {
      setCartCount(getCartItemCount());
    };
    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);
    return () => window.removeEventListener('cartUpdated', updateCartCount);
  }, []);

  // Detect scroll position to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      const homeSection = document.getElementById('home');
      if (homeSection) {
        const homeBottom = homeSection.offsetTop + homeSection.offsetHeight;
        const scrollPosition = window.scrollY + 100; // Add small buffer
        setIsScrolled(scrollPosition > homeBottom || window.scrollY > 50);
      } else {
        setIsScrolled(window.scrollY > 50);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    setIsMenuOpen(false);
    
    // For home section, scroll to top of page
    if (sectionId === 'home') {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
      return;
    }
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  };

  const handleFAQsClick = () => {
    if (onFAQsClick) {
      onFAQsClick();
    } else {
      scrollToSection('faqs');
    }
    setIsMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 shadow-md border-b border-black/5 backdrop-blur-md' 
          : 'bg-transparent backdrop-blur-sm'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 w-full">
        <div className="flex items-center justify-between py-2.5 sm:py-3 lg:py-3.5 w-full">
          {/* Logo with Company Name - Left Aligned */}
          <div className="flex-shrink-0 pr-2 sm:pr-6">
            <button
              onClick={() => scrollToSection('home')}
              className="flex items-center gap-2 sm:gap-3 h-full hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary-green focus:ring-offset-2 rounded"
              aria-label="Go to homepage"
            >
              <img 
                src="/logo.svg" 
                alt="Surabhii Fresh Milk - Premium Surabhii Cow Milk" 
                className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto max-w-[140px] sm:max-w-[180px] md:max-w-[220px] lg:max-w-[240px] object-contain"
              />
              <div className="flex items-center justify-center">
                <span className={`font-sans font-bold uppercase text-sm sm:text-base md:text-lg lg:text-xl tracking-tight whitespace-nowrap transition-colors duration-300 ${
                  isScrolled ? 'text-primary-green' : 'text-white'
                }`}>
                  SURABHII FRESH MILK
                </span>
              </div>
            </button>
          </div>

          {/* Navigation Links - Centered (Desktop Only) */}
          <div className="hidden lg:flex items-center justify-center flex-1 space-x-8">
            <button 
              onClick={() => scrollToSection('home')} 
              className={`hover:text-primary-green transition-all duration-200 font-medium text-base lg:text-lg tracking-wide leading-tight ${
                isScrolled ? 'text-charcoal' : 'text-white'
              }`}
              style={!isScrolled ? { textShadow: '1px 1px 3px rgba(0, 0, 0, 0.4)' } : {}}
            >
              <span className="border-b-2 border-transparent hover:border-primary-green/60 transition-colors">Home</span>
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className={`hover:text-primary-green transition-all duration-200 font-medium text-base lg:text-lg tracking-wide leading-tight ${
                isScrolled ? 'text-charcoal' : 'text-white'
              }`}
              style={!isScrolled ? { textShadow: '1px 1px 3px rgba(0, 0, 0, 0.4)' } : {}}
            >
              <span className="border-b-2 border-transparent hover:border-primary-green/60 transition-colors">About</span>
            </button>
            <button 
              onClick={() => scrollToSection('products')} 
              className={`hover:text-primary-green transition-all duration-200 font-medium text-base lg:text-lg tracking-wide leading-tight ${
                isScrolled ? 'text-charcoal' : 'text-white'
              }`}
              style={!isScrolled ? { textShadow: '1px 1px 3px rgba(0, 0, 0, 0.4)' } : {}}
            >
              <span className="border-b-2 border-transparent hover:border-primary-green/60 transition-colors">Products</span>
            </button>
            <button 
              onClick={() => scrollToSection('memberships')} 
              className={`hover:text-primary-green transition-all duration-200 font-medium text-base lg:text-lg tracking-wide leading-tight ${
                isScrolled ? 'text-charcoal' : 'text-white'
              }`}
              style={!isScrolled ? { textShadow: '1px 1px 3px rgba(0, 0, 0, 0.4)' } : {}}
            >
              <span className="border-b-2 border-transparent hover:border-primary-green/60 transition-colors">Memberships</span>
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className={`hover:text-primary-green transition-all duration-200 font-medium text-base lg:text-lg tracking-wide leading-tight ${
                isScrolled ? 'text-charcoal' : 'text-white'
              }`}
              style={!isScrolled ? { textShadow: '1px 1px 3px rgba(0, 0, 0, 0.4)' } : {}}
            >
              <span className="border-b-2 border-transparent hover:border-primary-green/60 transition-colors">Contact</span>
            </button>
          </div>

          {/* Right Side - Call Now Button (Desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            <a 
              href="tel:+917026769669"
              className="bg-primary-green hover:bg-secondary-green active:bg-secondary-green text-white px-5 py-2.5 rounded-full transition-all duration-200 font-semibold text-sm shadow-md hover:shadow-lg uppercase tracking-wide min-h-[44px] flex items-center leading-none"
            >
              Call Now
            </a>
          </div>

          {/* Mobile Menu - Right Side */}
          <div className="lg:hidden flex items-center gap-2 sm:gap-3">
            <a 
              href="tel:+917026769669" 
              className="bg-primary-green hover:bg-secondary-green active:bg-secondary-green text-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-full transition-all duration-200 font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg active:scale-95 touch-manipulation min-h-[40px] sm:min-h-[44px] flex items-center justify-center gap-1.5 uppercase tracking-wide whitespace-nowrap leading-none"
              style={!isScrolled ? { textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)' } : {}}
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="hidden xs:inline">Call Now</span>
              <span className="xs:hidden">Call</span>
            </a>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`p-2 touch-manipulation min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center transition-colors rounded-lg hover:bg-black/5 active:bg-black/10 ${
              isScrolled ? 'text-charcoal' : 'text-white'
            }`} aria-label="Toggle menu">
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className={`lg:hidden pb-4 pt-2 space-y-2 animate-slide-down mt-2 transition-colors ${
            isScrolled ? 'border-t border-gray-200 bg-white' : 'border-t border-white/20 bg-black/20 backdrop-blur-md'
          }`}>
            <button onClick={() => scrollToSection('home')} className={`block w-full text-left px-4 py-3.5 text-lg font-semibold rounded-lg transition-colors touch-manipulation min-h-[48px] flex items-center ${
              isScrolled 
                ? 'text-charcoal hover:bg-cream active:bg-cream/80' 
                : 'text-white hover:bg-white/10 active:bg-white/20'
            }`}>Home</button>
            <button onClick={() => scrollToSection('about')} className={`block w-full text-left px-4 py-3.5 text-lg font-semibold rounded-lg transition-colors touch-manipulation min-h-[48px] flex items-center ${
              isScrolled 
                ? 'text-charcoal hover:bg-cream active:bg-cream/80' 
                : 'text-white hover:bg-white/10 active:bg-white/20'
            }`}>About</button>
            <button onClick={() => scrollToSection('products')} className={`block w-full text-left px-4 py-3.5 text-lg font-semibold rounded-lg transition-colors touch-manipulation min-h-[48px] flex items-center ${
              isScrolled 
                ? 'text-charcoal hover:bg-cream active:bg-cream/80' 
                : 'text-white hover:bg-white/10 active:bg-white/20'
            }`}>Products</button>
            <button onClick={() => scrollToSection('memberships')} className={`block w-full text-left px-4 py-3.5 text-lg font-semibold rounded-lg transition-colors touch-manipulation min-h-[48px] flex items-center ${
              isScrolled 
                ? 'text-charcoal hover:bg-cream active:bg-cream/80' 
                : 'text-white hover:bg-white/10 active:bg-white/20'
            }`}>Memberships</button>
            <button onClick={() => scrollToSection('contact')} className={`block w-full text-left px-4 py-3.5 text-lg font-semibold rounded-lg transition-colors touch-manipulation min-h-[48px] flex items-center ${
              isScrolled 
                ? 'text-charcoal hover:bg-cream active:bg-cream/80' 
                : 'text-white hover:bg-white/10 active:bg-white/20'
            }`}>Contact</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
