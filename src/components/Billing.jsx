import { useState } from 'react';
import { getCartTotal } from '../utils/cartUtils';
import { 
  isFirstTimeCustomer, 
  calculateLoyaltyPoints, 
  updateCustomerLoyalty,
  validatePhoneNumber,
  normalizePhoneNumber 
} from '../utils/loyaltyUtils';
import { recordSale } from '../utils/salesUtils';
import { createReturnSchedule } from '../utils/bottleReturnUtils';

const Billing = ({ selectedMembership, cartItems, onOrderPlaced }) => {
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const { subtotal, discount, total } = getCartTotal(cartItems, selectedMembership);
  const isFirstTime = phone ? isFirstTimeCustomer(phone) : false;
  const loyaltyPoints = total > 0 ? calculateLoyaltyPoints(total, isFirstTime) : 0;

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    if (value && !validatePhoneNumber(value)) {
      setPhoneError('Please enter a valid 10-digit Indian phone number');
    } else {
      setPhoneError('');
    }
  };

  const handleCheckout = () => {
    if (!phone) {
      setPhoneError('Please enter your phone number');
      return;
    }

    if (!validatePhoneNumber(phone)) {
      setPhoneError('Please enter a valid 10-digit Indian phone number');
      return;
    }

    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    setIsProcessing(true);

    const normalizedPhone = normalizePhoneNumber(phone);
    updateCustomerLoyalty(normalizedPhone, loyaltyPoints, {
      items: cartItems,
      subtotal,
      discount,
      total,
      membership: selectedMembership
    });

    recordSale({
      customerPhone: normalizedPhone,
      items: cartItems,
      subtotal,
      discount,
      total,
      membership: selectedMembership,
      loyaltyPoints
    });

    if (selectedMembership && selectedMembership !== 'none') {
      createReturnSchedule(
        `order-${Date.now()}`,
        normalizedPhone,
        new Date().toISOString(),
        selectedMembership
      );
    }

    const itemsList = cartItems.map(item => 
      `• ${item.name} x${item.quantity} - ₹${item.price * item.quantity}`
    ).join('\n');

    const membershipText = selectedMembership !== 'none' 
      ? `\nMembership: ${selectedMembership.charAt(0).toUpperCase() + selectedMembership.slice(1)} Plan`
      : '';

    const message = `Hello! I would like to place an order:

${itemsList}

Subtotal: ₹${subtotal}
Discount: ₹${discount}${membershipText}
Total: ₹${total}
Loyalty Points Earned: ${loyaltyPoints}

Phone: ${phone}
Please confirm my order.`;

    const whatsappUrl = `https://wa.me/9600642226?text=${encodeURIComponent(message)}`;
    
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setIsProcessing(false);
      onOrderPlaced();
    }, 500);
  };

  return (
    <section id="billing" className="py-8 sm:py-12 md:py-16 lg:py-24 bg-cream min-h-screen flex items-center">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-safe">
        {/* Centered card on desktop, full-width on mobile */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-6 sm:p-8 md:p-10 w-full">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-primary-green mb-6 sm:mb-8 text-center md:text-left">
            Order Summary
          </h2>

          {/* Phone Input - Bottom-friendly on mobile */}
          <div className="mb-6 sm:mb-8">
            <label className="block text-sm sm:text-base font-semibold text-charcoal mb-3">
              Phone Number *
            </label>
            <input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="Enter your 10-digit phone number"
              inputMode="numeric"
              className={`w-full px-5 py-4 text-base sm:text-lg border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary-green/20 touch-manipulation bg-white text-charcoal border-gray-200 transition-all duration-200 ${
                phoneError ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : 'focus:border-primary-green'
              }`}
            />
            {phoneError && (
              <p className="text-red-600 text-sm mt-2">{phoneError}</p>
            )}
            {phone && !phoneError && isFirstTime && (
              <p className="text-green-600 text-sm mt-2">
                🎉 Welcome! You'll earn 15% bonus loyalty points on your first order!
              </p>
            )}
          </div>

          {/* Items List */}
          <div className="mb-6 sm:mb-8">
            <h3 className="font-semibold text-base sm:text-lg text-charcoal mb-4">Items:</h3>
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm sm:text-base text-charcoal/80 bg-cream/50 p-3 rounded-lg">
                  <span className="truncate pr-2 font-medium">{item.name} x{item.quantity}</span>
                  <span className="flex-shrink-0 font-semibold">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="border-t-2 border-gray-200 pt-4 sm:pt-6 mb-6 sm:mb-8 space-y-3">
            <div className="flex justify-between text-base sm:text-lg text-charcoal/70">
              <span>Subtotal:</span>
              <span className="font-medium">₹{subtotal}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-base sm:text-lg text-green-600">
                <span className="truncate pr-2">Discount ({selectedMembership}):</span>
                <span className="flex-shrink-0 font-semibold">-₹{discount}</span>
              </div>
            )}
            <div className="flex justify-between text-lg sm:text-xl md:text-2xl font-bold text-charcoal border-t-2 border-gray-200 pt-3 sm:pt-4">
              <span>Total:</span>
              <span className="text-primary-green">₹{total}</span>
            </div>
            {loyaltyPoints > 0 && (
              <div className="bg-gradient-to-r from-soft-gold/20 to-soft-gold/10 p-4 sm:p-5 rounded-xl mt-4 sm:mt-6 border border-soft-gold/30">
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <span className="text-sm sm:text-base text-charcoal font-semibold">Loyalty Points Earned:</span>
                  <span className="text-2xl sm:text-3xl font-bold text-primary-green">{loyaltyPoints}</span>
                </div>
                <p className="text-xs sm:text-sm text-charcoal/70 mt-2">
                  {isFirstTime 
                    ? '15% bonus for first-time customers!'
                    : '5% points on every purchase'}
                </p>
              </div>
            )}
          </div>

          {/* Checkout Button - Bottom-friendly on mobile */}
          <button
            onClick={handleCheckout}
            disabled={isProcessing || cartItems.length === 0 || !phone || !!phoneError}
            className="w-full bg-primary-green hover:bg-secondary-green active:bg-secondary-green disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-4 sm:py-5 rounded-xl font-semibold text-base sm:text-lg transition-all duration-200 flex items-center justify-center gap-3 touch-manipulation min-h-[56px] shadow-lg hover:shadow-xl active:shadow-md disabled:shadow-none transform active:scale-[0.98]"
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.77.966-.944 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span>Checkout via WhatsApp</span>
              </>
            )}
          </button>

          <p className="text-xs sm:text-sm text-charcoal/60 text-center mt-4 sm:mt-6">
            You'll be redirected to WhatsApp to confirm your order
          </p>
        </div>
      </div>
    </section>
  );
};

export default Billing;
