import { useEffect, useState } from 'react';
import { getCart, removeFromCart, updateQuantity, clearCart } from '../utils/cartUtils';
import { openWhatsApp, buildCheckoutMessage } from '../utils/whatsappUtils';
import { createDeliverySchedule } from '../utils/deliveryUtils';
import { createInvoiceRecord, generateInvoiceId, saveInvoiceRecord } from '../utils/orderUtils';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../i18n/translations';
import cowMilkBottleImage from '../assets/cow_milk_bottle.png';
import curdImage from '../assets/curd.png';
import gheeImage from '../assets/2.png';

const Cart = ({ isOpen, onClose, onProceedToBilling }) => {
  const [cartItems, setCartItems] = useState([]);
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  // Map product IDs to their images
  const getProductImage = (productId) => {
    const imageMap = {
      1: cowMilkBottleImage,
      2: curdImage,
      3: gheeImage,
    };
    return imageMap[productId] || null;
  };

  useEffect(() => {
    if (isOpen) {
      setCartItems(getCart());
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    const handleCartUpdated = (event) => {
      const cart = event?.detail?.cart || getCart();
      setCartItems(cart);
    };
    window.addEventListener('cartUpdated', handleCartUpdated);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('cartUpdated', handleCartUpdated);
    };
  }, [isOpen]);

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  const handleQuantityChange = (productId, change) => {
    const item = cartItems.find(item => item.id === productId);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + change);
      updateQuantity(productId, newQuantity);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckoutWhatsApp = () => {
    if (cartItems.length === 0) return;

    // Generate invoice and delivery records
    const invoiceId = generateInvoiceId();
    const invoice = createInvoiceRecord({
      invoiceId,
      phone: null,
      items: cartItems,
      subtotal,
      discount: 0,
      total: subtotal
    });
    saveInvoiceRecord(invoice);
    const delivery = createDeliverySchedule({ invoiceId, phone: null, items: cartItems });

    // Build WhatsApp message with catalog links
    const message = buildCheckoutMessage(cartItems);

    openWhatsApp(message);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
        aria-hidden="true"
      ></div>
      
      {/* Cart Panel */}
      <div className="absolute right-0 top-0 h-full w-full sm:w-full md:max-w-md bg-white/90 backdrop-blur-md border-l border-white/60 shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header with prominent close button */}
        <div className="flex items-center justify-between p-4 sm:p-5 md:p-6 border-b border-white/70 bg-white/80">
          <div>
            <p className="text-xs uppercase tracking-widest text-primary-green/80">{t.cart.title}</p>
            <h2 className="text-lg sm:text-xl md:text-2xl font-serif font-semibold text-primary-green">
              {t.cart.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-white text-charcoal hover:text-primary-green transition-all duration-200 p-2.5 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center shadow-md hover:shadow-lg"
            aria-label="Close cart"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 md:p-6 bg-white/80">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-12">
              <div className="text-6xl sm:text-7xl mb-4">🛒</div>
              <p className="text-charcoal/70 text-base sm:text-lg font-medium mb-2">{t.cart.empty}</p>
              <p className="text-charcoal/50 text-sm">Add items to get started</p>
              <button
                onClick={onClose}
                className="mt-6 bg-primary-green hover:bg-secondary-green text-white px-6 py-3 rounded-full font-semibold text-sm sm:text-base transition-colors touch-manipulation min-h-[44px]"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 sm:gap-4 p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-white/70 shadow-soft">
                  <div className="flex-shrink-0">
                    {getProductImage(item.id) ? (
                      <img 
                        src={getProductImage(item.id)} 
                        alt={item.name}
                        className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
                      />
                    ) : (
                      <div className="text-primary-green">
                        {item.id === 1 ? (
                          <svg className="w-12 h-12 sm:w-14 sm:h-14" fill="none" viewBox="0 0 100 100">
                            <path d="M50 15C40 15 32 20 30 28L25 60C25 70 33 78 43 78H57C67 78 75 70 75 60L70 28C68 20 60 15 50 15Z" fill="#4A90E2" opacity="0.2"/>
                            <path d="M50 20C42 20 35 24 33 30L28 58C28 66 34 72 42 72H58C66 72 72 66 72 58L67 30C65 24 58 20 50 20Z" fill="#4A90E2"/>
                            <path d="M50 25C45 25 40 27 38 31L35 55C35 60 39 64 44 64H56C61 64 65 60 65 55L62 31C60 27 55 25 50 25Z" fill="#E8F4FD"/>
                            <path d="M50 30L50 75M45 30L45 75M55 30L55 75" stroke="#2E5C8A" strokeWidth="2" strokeLinecap="round"/>
                            <circle cx="50" cy="40" r="3" fill="#2E5C8A"/>
                          </svg>
                        ) : item.id === 2 ? (
                          <svg className="w-12 h-12 sm:w-14 sm:h-14" fill="none" viewBox="0 0 100 100">
                            <path d="M50 20C40 20 32 25 30 32L28 70C28 78 34 84 42 84H58C66 84 72 78 72 70L70 32C68 25 60 20 50 20Z" fill="#4A90E2" opacity="0.2"/>
                            <path d="M50 25C42 25 35 29 33 35L31 68C31 74 36 79 42 79H58C64 79 69 74 69 68L67 35C65 29 58 25 50 25Z" fill="#4A90E2"/>
                            <path d="M50 30C45 30 40 32 38 36L36 63C36 67 39 70 43 70H57C61 70 64 67 64 63L62 36C60 32 55 30 50 30Z" fill="#E8F4FD"/>
                            <path d="M50 35C48 35 46 36 45 37L44 58C44 60 45 61 47 61H53C55 61 56 60 56 58L55 37C54 36 52 35 50 35Z" fill="#2E5C8A" opacity="0.3"/>
                            <path d="M45 45L50 50L55 45" stroke="#2E5C8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        ) : (
                          <svg className="w-12 h-12 sm:w-14 sm:h-14" fill="none" viewBox="0 0 100 100">
                            <path d="M50 15C40 15 32 20 30 28L25 75C25 85 33 93 43 93H57C67 93 75 85 75 75L70 28C68 20 60 15 50 15Z" fill="#FFA500" opacity="0.2"/>
                            <path d="M50 20C42 20 35 24 33 30L28 72C28 80 34 86 42 86H58C66 86 72 80 72 72L67 30C65 24 58 20 50 20Z" fill="#FFA500"/>
                            <path d="M50 25C45 25 40 27 38 31L35 68C35 73 39 77 44 77H56C61 77 65 73 65 68L62 31C60 27 55 25 50 25Z" fill="#FFE5B4"/>
                            <path d="M50 30L50 70M45 30L45 70M55 30L55 70" stroke="#CC7700" strokeWidth="2" strokeLinecap="round"/>
                            <circle cx="50" cy="50" r="4" fill="#CC7700" opacity="0.5"/>
                          </svg>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm sm:text-base text-charcoal truncate mb-1">{item.name}</h3>
                    <p className="text-xs sm:text-sm text-charcoal/70">₹{item.price} each</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary-green text-white hover:bg-secondary-green active:bg-secondary-green transition-colors touch-manipulation flex items-center justify-center font-bold text-base sm:text-lg shadow-sm"
                    >
                      -
                    </button>
                    <span className="w-8 sm:w-10 text-center font-semibold text-sm sm:text-base text-charcoal">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary-green text-white hover:bg-secondary-green active:bg-secondary-green transition-colors touch-manipulation flex items-center justify-center font-bold text-base sm:text-lg shadow-sm"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right flex-shrink-0 min-w-[60px]">
                    <div className="font-bold text-sm sm:text-base text-charcoal">₹{item.price * item.quantity}</div>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-xs sm:text-sm text-red-600 hover:text-red-800 active:text-red-900 mt-1 touch-manipulation transition-colors font-medium"
                    >
                      {t.cart.remove}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with actions */}
        {cartItems.length > 0 && (
          <div className="border-t border-white/70 p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4 bg-white/80">
            <div className="flex justify-between items-center text-base sm:text-lg">
              <span className="text-charcoal/70 font-medium">{t.cart.subtotal}:</span>
              <span className="font-bold text-primary-green text-lg sm:text-xl">₹{subtotal}</span>
            </div>
            <button
              onClick={() => {
                handleCheckoutWhatsApp();
                onClose();
              }}
              className="w-full bg-primary-green hover:bg-secondary-green active:bg-secondary-green text-white py-3.5 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-200 touch-manipulation min-h-[48px] shadow-lg hover:shadow-xl transform active:scale-[0.98]"
            >
              {t.cart.checkout}
            </button>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 bg-white hover:bg-gray-50 active:bg-gray-100 text-charcoal border border-gray-200 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-200 touch-manipulation min-h-[44px]"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to clear your cart?')) {
                    clearCart();
                    setCartItems([]);
                  }
                }}
                className="flex-1 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-charcoal py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-200 touch-manipulation min-h-[44px]"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
