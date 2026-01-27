import { useState } from 'react';
import { addToCart, updateQuantity, removeFromCart } from '../utils/cartUtils';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../i18n/translations';

const ProductCard = ({ product, cartQuantity = 0, onCartUpdate, isVisible, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  const productTexts = t.products.items?.[product.id] || {};
  const displayName = productTexts.name || product.name;
  const displayDescriptor = productTexts.descriptor || product.descriptor;

  const handleAddToCart = () => {
    setIsAdding(true);
    try {
      addToCart(product, 1);
      onCartUpdate?.();
      
      const event = new CustomEvent('showToast', {
        detail: { message: `${displayName} ${t.products.addedToCartSuffix}`, type: 'success' }
      });
      window.dispatchEvent(event);
    } catch (error) {
      console.error('Error adding to cart:', error);
      const event = new CustomEvent('showToast', {
        detail: { message: t.products.addError, type: 'error' }
      });
      window.dispatchEvent(event);
    } finally {
      setTimeout(() => setIsAdding(false), 300);
    }
  };

  const handleIncrease = () => {
    try {
      if (cartQuantity <= 0) {
        addToCart(product, 1);
      } else {
        updateQuantity(product.id, cartQuantity + 1);
      }
      onCartUpdate?.();
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const handleDecrease = () => {
    try {
      if (cartQuantity <= 1) {
        removeFromCart(product.id);
      } else {
        updateQuantity(product.id, cartQuantity - 1);
      }
      onCartUpdate?.();
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const hasQuantity = cartQuantity > 0;

  return (
    <div
      className={`group relative bg-white/80 backdrop-blur-md border border-white/70 rounded-lg sm:rounded-xl overflow-hidden transition-all duration-500 ease-out flex flex-col h-full ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${
        isHovered ? 'shadow-md sm:shadow-lg -translate-y-1' : 'shadow-sm'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Area */}
      <div className="relative bg-gradient-to-br from-cream via-white to-cream/50 aspect-[3/4] flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-2.5 md:p-3">
          {/* Product Image/Icon */}
          <div className="relative z-10 transform transition-transform duration-300 group-hover:scale-105 w-[70%] h-[70%] sm:w-[72%] sm:h-[72%] md:w-[75%] md:h-[75%] flex items-center justify-center">
            {product.image ? (
              <img 
                src={product.image} 
                alt={displayName}
                className="w-full h-full object-contain"
              />
            ) : product.icon ? (
              <div className="w-full h-full text-primary-green/30">{product.icon}</div>
            ) : (
              <svg fill="none" viewBox="0 0 100 100" className="w-full h-full text-primary-green/30">
                <path d="M50 15C40 15 32 20 30 28L25 60C25 70 33 78 43 78H57C67 78 75 70 75 60L70 28C68 20 60 15 50 15Z" fill="currentColor" opacity="0.1"/>
                <path d="M50 20C42 20 35 24 33 30L28 58C28 66 34 72 42 72H58C66 72 72 66 72 58L67 30C65 24 58 20 50 20Z" fill="currentColor" opacity="0.3"/>
                <path d="M50 25C45 25 40 27 38 31L35 55C35 60 39 64 44 64H56C61 64 65 60 65 55L62 31C60 27 55 25 50 25Z" fill="currentColor" opacity="0.5"/>
              </svg>
            )}
          </div>
          
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
              backgroundSize: '24px 24px'
            }}></div>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-2 sm:p-3 md:p-3.5 flex flex-col flex-grow space-y-1.5 sm:space-y-2">
        {/* Product Name & Quantity Badge */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-xs sm:text-sm md:text-base font-semibold text-primary-green leading-tight flex-1">
            {displayName}
          </h3>
          {product.quantity && (
            <span className="flex-shrink-0 text-[10px] sm:text-xs font-medium text-charcoal/60 bg-cream px-2 py-0.5 rounded-full whitespace-nowrap">
              {product.quantity}
            </span>
          )}
        </div>

        {/* Descriptor */}
        {displayDescriptor && (
          <p className="text-[11px] sm:text-xs md:text-sm text-charcoal/70 leading-relaxed">
            {displayDescriptor}
          </p>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-1">
          <span className="text-sm sm:text-base md:text-lg font-bold text-charcoal">
            ₹{product.price}
          </span>
        </div>

        {/* Rating (Optional, subtle) */}
        {product.rating && (
          <div className="flex items-center gap-0.5 sm:gap-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 ${
                  i < Math.floor(product.rating)
                    ? 'text-soft-gold fill-current'
                    : 'text-charcoal/20'
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
            {product.rating && (
              <span className="text-[11px] sm:text-xs text-charcoal/40 ml-1">
                ({product.rating})
              </span>
            )}
          </div>
        )}

        {/* Add to Cart / Quantity Controls */}
        {product.available ? (
          <div className="mt-auto pt-1.5">
            {hasQuantity ? (
              <div className="flex items-center justify-between gap-1.5 bg-cream/50 rounded-full p-1">
                <button
                  onClick={handleDecrease}
                  className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-white text-primary-green hover:bg-primary-green hover:text-white transition-all duration-200 flex items-center justify-center font-semibold text-sm sm:text-base shadow-sm touch-manipulation active:scale-95"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="text-xs sm:text-sm md:text-base font-semibold text-charcoal min-w-[2rem] text-center">
                  {cartQuantity}
                </span>
                <button
                  onClick={handleIncrease}
                  className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-white text-primary-green hover:bg-primary-green hover:text-white transition-all duration-200 flex items-center justify-center font-semibold text-sm sm:text-base shadow-sm touch-manipulation active:scale-95"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className={`w-full py-2 sm:py-2.5 md:py-3 rounded-full font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 touch-manipulation min-h-[38px] sm:min-h-[42px] md:min-h-[44px] flex items-center justify-center gap-2 ${
                  isAdding
                    ? 'bg-secondary-green text-white cursor-wait'
                    : 'bg-primary-green text-white hover:bg-secondary-green active:bg-secondary-green shadow-sm hover:shadow-md'
                }`}
              >
                {isAdding ? (
                  <>
                    <svg className="animate-spin h-3.5 w-3.5 sm:h-4 sm:w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>{t.products.adding}</span>
                  </>
                ) : (
                  t.products.addToCart
                )}
              </button>
            )}
          </div>
        ) : (
          <div className="mt-auto pt-1.5">
            <div className="w-full py-2 sm:py-2.5 md:py-3 rounded-full font-medium text-xs sm:text-sm md:text-base text-charcoal/40 bg-cream/50 flex items-center justify-center min-h-[38px] sm:min-h-[42px] md:min-h-[44px]">
              {t.products.comingSoon}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
