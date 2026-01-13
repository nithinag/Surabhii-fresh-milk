import { useEffect, useState } from 'react';
import { getCart, removeFromCart, updateCartItemQuantity, clearCart } from '../utils/cartUtils';

const Cart = ({ isOpen, onClose, onProceedToBilling }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setCartItems(getCart());
    }
  }, [isOpen]);

  const handleRemove = (productId) => {
    removeFromCart(productId);
    setCartItems(getCart());
  };

  const handleQuantityChange = (productId, change) => {
    const item = cartItems.find(item => item.id === productId);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + change);
      updateCartItemQuantity(productId, newQuantity);
      setCartItems(getCart());
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="absolute right-0 top-0 h-full w-full sm:w-full md:max-w-md bg-white shadow-2xl flex flex-col animate-slide-in-right">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl md:text-2xl font-display font-bold text-primary-green">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="text-charcoal hover:text-primary-green transition-colors p-2.5 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Close cart"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-5xl sm:text-6xl mb-4">🛒</div>
              <p className="text-charcoal/70 text-base sm:text-lg">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-cream rounded-lg">
                  <div className="text-3xl sm:text-4xl flex-shrink-0">{item.image || '🥛'}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm sm:text-base text-charcoal truncate">{item.name}</h3>
                    <p className="text-xs sm:text-sm text-charcoal/70">₹{item.price} each</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary-green text-white hover:bg-secondary-green active:bg-secondary-green transition-colors touch-manipulation flex items-center justify-center font-bold text-base sm:text-lg"
                    >
                      -
                    </button>
                    <span className="w-8 sm:w-10 text-center font-semibold text-sm sm:text-base text-charcoal">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary-green text-white hover:bg-secondary-green active:bg-secondary-green transition-colors touch-manipulation flex items-center justify-center font-bold text-base sm:text-lg"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-semibold text-sm sm:text-base text-charcoal">₹{item.price * item.quantity}</div>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-xs sm:text-sm text-red-600 hover:text-red-800 active:text-red-900 mt-1 touch-manipulation transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 p-4 sm:p-6 space-y-3 sm:space-y-4 bg-white">
            <div className="flex justify-between text-base sm:text-lg">
              <span className="text-charcoal/70">Subtotal:</span>
              <span className="font-semibold text-charcoal">₹{subtotal}</span>
            </div>
            <button
              onClick={() => {
                onProceedToBilling();
                onClose();
              }}
              className="w-full bg-primary-green hover:bg-secondary-green active:bg-secondary-green text-white py-3.5 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-colors touch-manipulation min-h-[44px]"
            >
              Proceed to Billing
            </button>
            <button
              onClick={() => {
                clearCart();
                setCartItems([]);
              }}
              className="w-full bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-charcoal py-2.5 sm:py-2 rounded-lg font-semibold text-sm sm:text-base transition-colors touch-manipulation min-h-[44px]"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
