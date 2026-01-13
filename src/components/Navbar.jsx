import { useState, useEffect } from 'react';
import { getCartItemCount } from '../utils/cartUtils';

const Navbar = ({ onCartClick, onFAQsClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      setCartCount(getCartItemCount());
    };
    updateCartCount();
    const interval = setInterval(updateCartCount, 500);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
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
    <nav className="sticky top-0 z-50 bg-white shadow-md w-full border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between h-16 sm:h-18 md:h-20 lg:h-24 xl:h-28 w-full">
          {/* Logo with Company Name - Left Aligned */}
          <div className="flex-shrink-0 pr-2 sm:pr-4">
            <button
              onClick={() => scrollToSection('home')}
              className="flex items-center gap-2 sm:gap-3 h-full hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary-green focus:ring-offset-2 rounded"
              aria-label="Go to homepage"
            >
              <img 
                src="/logo.svg" 
                alt="Surabhii Fresh Milk - Premium Organic Cow Milk" 
                className="h-12 sm:h-16 md:h-20 lg:h-24 xl:h-28 w-auto max-w-[160px] sm:max-w-[200px] md:max-w-[280px] lg:max-w-[320px] xl:max-w-[360px] object-contain"
              />
              <div className="flex flex-col justify-center leading-tight">
                <span className="text-primary-green font-bold uppercase text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl tracking-tight">
                  SURABHII
                </span>
                <span className="text-primary-green font-semibold uppercase text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl tracking-tight">
                  FRESH MILK
                </span>
              </div>
            </button>
          </div>

          {/* Navigation Links - Centered (Desktop Only) */}
          <div className="hidden lg:flex items-center justify-center flex-1 space-x-6 xl:space-x-8">
            <button onClick={() => scrollToSection('home')} className="text-charcoal hover:text-primary-green transition-colors font-medium text-sm xl:text-base">Home</button>
            <button onClick={() => scrollToSection('about')} className="text-charcoal hover:text-primary-green transition-colors font-medium text-sm xl:text-base">About</button>
            <button onClick={() => scrollToSection('products')} className="text-charcoal hover:text-primary-green transition-colors font-medium text-sm xl:text-base">Products</button>
            <button onClick={() => scrollToSection('memberships')} className="text-charcoal hover:text-primary-green transition-colors font-medium text-sm xl:text-base">Memberships</button>
            <button onClick={handleFAQsClick} className="text-charcoal hover:text-primary-green transition-colors font-medium text-sm xl:text-base">FAQs</button>
          </div>

          {/* Right Side - Call Now Button + Cart (Desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            <button onClick={onCartClick} className="relative p-2 text-charcoal hover:text-primary-green transition-colors" aria-label="Shopping cart">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-soft-gold text-charcoal rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            <a 
              href="https://wa.me/9600642226" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg transition-all duration-200 font-semibold text-sm sm:text-base shadow-md hover:shadow-lg uppercase tracking-wide"
            >
              Call Now
            </a>
          </div>

          {/* Mobile Menu - Right Side */}
          <div className="lg:hidden flex items-center gap-3">
            <button onClick={onCartClick} className="relative p-2.5 text-charcoal touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label="Shopping cart">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-soft-gold text-charcoal rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            <a 
              href="https://wa.me/9600642226" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white px-4 py-2 rounded-lg transition-all duration-200 font-semibold text-sm shadow-md touch-manipulation min-h-[44px] flex items-center uppercase tracking-wide"
            >
              Call Now
            </a>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2.5 text-charcoal touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label="Toggle menu">
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
          <div className="lg:hidden pb-4 pt-2 space-y-2 animate-slide-down border-t border-gray-200 mt-2">
            <button onClick={() => scrollToSection('home')} className="block w-full text-left px-4 py-3.5 text-base text-charcoal hover:bg-cream active:bg-cream/80 rounded-lg transition-colors touch-manipulation min-h-[44px] flex items-center">Home</button>
            <button onClick={() => scrollToSection('about')} className="block w-full text-left px-4 py-3.5 text-base text-charcoal hover:bg-cream active:bg-cream/80 rounded-lg transition-colors touch-manipulation min-h-[44px] flex items-center">About</button>
            <button onClick={() => scrollToSection('products')} className="block w-full text-left px-4 py-3.5 text-base text-charcoal hover:bg-cream active:bg-cream/80 rounded-lg transition-colors touch-manipulation min-h-[44px] flex items-center">Products</button>
            <button onClick={() => scrollToSection('memberships')} className="block w-full text-left px-4 py-3.5 text-base text-charcoal hover:bg-cream active:bg-cream/80 rounded-lg transition-colors touch-manipulation min-h-[44px] flex items-center">Memberships</button>
            <button onClick={() => scrollToSection('order-history')} className="block w-full text-left px-4 py-3.5 text-base text-charcoal hover:bg-cream active:bg-cream/80 rounded-lg transition-colors touch-manipulation min-h-[44px] flex items-center">My Orders</button>
            <button onClick={handleFAQsClick} className="block w-full text-left px-4 py-3.5 text-base text-charcoal hover:bg-cream active:bg-cream/80 rounded-lg transition-colors touch-manipulation min-h-[44px] flex items-center">FAQs</button>
          </div>
        )}

        {isMenuOpen && (
          <div className="md:hidden pb-4 pt-2 space-y-2 animate-slide-down">
            <button onClick={() => scrollToSection('home')} className="block w-full text-left px-4 py-3.5 text-base text-charcoal hover:bg-cream active:bg-cream/80 rounded-lg transition-colors touch-manipulation min-h-[44px] flex items-center">Home</button>
            <button onClick={() => scrollToSection('about')} className="block w-full text-left px-4 py-3.5 text-base text-charcoal hover:bg-cream active:bg-cream/80 rounded-lg transition-colors touch-manipulation min-h-[44px] flex items-center">About</button>
            <button onClick={() => scrollToSection('products')} className="block w-full text-left px-4 py-3.5 text-base text-charcoal hover:bg-cream active:bg-cream/80 rounded-lg transition-colors touch-manipulation min-h-[44px] flex items-center">Products</button>
            <button onClick={() => scrollToSection('memberships')} className="block w-full text-left px-4 py-3.5 text-base text-charcoal hover:bg-cream active:bg-cream/80 rounded-lg transition-colors touch-manipulation min-h-[44px] flex items-center">Memberships</button>
            <button onClick={() => scrollToSection('order-history')} className="block w-full text-left px-4 py-3.5 text-base text-charcoal hover:bg-cream active:bg-cream/80 rounded-lg transition-colors touch-manipulation min-h-[44px] flex items-center">My Orders</button>
            <button onClick={handleFAQsClick} className="block w-full text-left px-4 py-3.5 text-base text-charcoal hover:bg-cream active:bg-cream/80 rounded-lg transition-colors touch-manipulation min-h-[44px] flex items-center">FAQs</button>
            <a href="https://wa.me/9600642226" target="_blank" rel="noopener noreferrer" className="block w-full text-left px-4 py-3.5 text-base bg-primary-green text-white rounded-lg hover:bg-secondary-green active:bg-secondary-green transition-colors touch-manipulation min-h-[44px] flex items-center font-semibold">Contact</a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
