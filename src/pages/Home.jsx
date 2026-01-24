import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Products from '../components/Products';
import Memberships from '../components/Memberships';
import Billing from '../components/Billing';
import WhyOrganic from '../components/WhyOrganic';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import Cart from '../components/Cart';
import TrialPackPopup from '../components/TrialPackPopup';
import FAQPopup from '../components/FAQPopup';
import ContactForm from '../components/ContactForm';
import ToastContainer, { useToast } from '../components/ToastContainer';
import { clearCart, getCart, getCartItemCount } from '../utils/cartUtils';
import { checkAndUpdateMembershipStatus, initializeMembershipFromDeepLink } from '../utils/membershipUtils';

const Home = () => {
  const [selectedMembership, setSelectedMembership] = useState('none');
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBillingOpen, setIsBillingOpen] = useState(false);
  const [isFAQOpen, setIsFAQOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const { showToast, removeToast, toasts } = useToast();

  const updateCart = () => {
    setCartItems(getCart());
    setCartCount(getCartItemCount());
  };

  useEffect(() => {
    const sessionKey = 'surabhi_cart_session_initialized';
    if (typeof window !== 'undefined' && !sessionStorage.getItem(sessionKey)) {
      clearCart();
      sessionStorage.setItem(sessionKey, 'true');
    }
    if (typeof window !== 'undefined') {
      const updated = initializeMembershipFromDeepLink(window.location.search);
      checkAndUpdateMembershipStatus();
      if (updated && window.history?.replaceState) {
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
    updateCart();
    const handleCartUpdated = () => updateCart();
    window.addEventListener('cartUpdated', handleCartUpdated);
    return () => window.removeEventListener('cartUpdated', handleCartUpdated);
  }, []);

  useEffect(() => {
    const handleToastEvent = (event) => {
      showToast(event.detail.message, event.detail.type || 'success');
    };
    window.addEventListener('showToast', handleToastEvent);
    return () => window.removeEventListener('showToast', handleToastEvent);
  }, [showToast]);

  useEffect(() => {
    const handleOpenCart = () => setIsCartOpen(true);
    window.addEventListener('openCart', handleOpenCart);
    return () => window.removeEventListener('openCart', handleOpenCart);
  }, []);

  const handleProceedToBilling = () => {
    setIsBillingOpen(true);
  };

  const handleOrderPlaced = () => {
    updateCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      alert('Order placed successfully! Check your WhatsApp for order confirmation.');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-cream transition-colors duration-300 w-full overflow-x-hidden">
      <Navbar 
        onCartClick={() => setIsCartOpen(true)} 
        onFAQsClick={() => setIsFAQOpen(true)}
      />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <TrialPackPopup
        onGetStarted={() => {
          showToast('Trial pack selected! Choose your membership plan.', 'info');
        }}
      />
      
      <button
        onClick={() => setIsCartOpen(true)}
        className={`fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 bg-primary-green hover:bg-secondary-green active:bg-secondary-green text-white rounded-full p-3.5 sm:p-4 shadow-2xl transition-all duration-300 active:scale-95 hover:scale-110 flex items-center justify-center group touch-manipulation min-w-[56px] min-h-[56px] max-w-[calc(100vw-32px)] ${
          cartCount > 0 ? 'ring-2 ring-soft-gold/80 shadow-[0_0_24px_rgba(200,169,81,0.45)]' : ''
        }`}
        style={{ right: '16px', bottom: '16px' }}
        aria-label="Open cart"
      >
        <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        {cartCount > 0 && (
          <span className="absolute -top-1.5 sm:-top-2 -right-1.5 sm:-right-2 bg-soft-gold dark:bg-primary-green text-charcoal dark:text-cream rounded-full w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-xs sm:text-sm font-bold transition-colors duration-300">
            {cartCount}
          </span>
        )}
        <span className="hidden sm:block absolute left-full ml-3 bg-charcoal dark:bg-charcoal/90 text-white dark:text-cream text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          View Cart ({cartCount})
        </span>
      </button>

      <Cart
        isOpen={isCartOpen}
        onClose={() => {
          setIsCartOpen(false);
          updateCart();
        }}
        onProceedToBilling={handleProceedToBilling}
      />

      <Billing
        isOpen={isBillingOpen}
        onClose={() => {
          setIsBillingOpen(false);
          updateCart();
        }}
        selectedMembership={selectedMembership}
        cartItems={cartItems}
        onOrderPlaced={handleOrderPlaced}
      />

      <Hero onScrollToProducts={() => {
        const element = document.getElementById('products');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }} />
      
      <About />
      <Products />
      <Memberships
        selectedMembership={selectedMembership}
        onSelectMembership={setSelectedMembership}
      />
      <WhyOrganic />
      <ContactForm />
      <Footer onFAQsClick={() => setIsFAQOpen(true)} />
      <FAQPopup isOpen={isFAQOpen} onClose={() => setIsFAQOpen(false)} />
      <WhatsAppButton />
    </div>
  );
};

export default Home;
