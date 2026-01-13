import { useState } from 'react';
import { 
  calculateCustomerTier, 
  getTierBenefits, 
  getTierProgress
} from '../utils/premiumUtils';
import { normalizePhoneNumber, validatePhoneNumber } from '../utils/loyaltyUtils';

const PremiumTier = () => {
  const [phone, setPhone] = useState('');
  const [tierInfo, setTierInfo] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  const handleCheckTier = () => {
    if (!phone) {
      alert('Please enter your phone number');
      return;
    }

    if (!validatePhoneNumber(phone)) {
      alert('Please enter a valid 10-digit Indian phone number');
      return;
    }

    const normalizedPhone = normalizePhoneNumber(phone);
    const tier = calculateCustomerTier(normalizedPhone);
    const benefits = getTierBenefits(tier);
    const progress = getTierProgress(normalizedPhone);

    setTierInfo({ tier, benefits, progress });
    setShowInfo(true);
  };

  const getProgressPercentage = (current, required) => {
    if (!required) return 100;
    return Math.min(100, (current / required) * 100);
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-primary-green to-secondary-green rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Premium Customer Tiers
          </h2>
          <p className="text-white/90 mb-6">
            Unlock exclusive benefits as you order more. Check your tier status below.
          </p>

          {!showInfo ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Enter Your Phone Number
                </label>
                <div className="flex gap-2">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your 10-digit phone number"
                    className="flex-1 px-4 py-3 rounded-lg text-charcoal focus:outline-none focus:ring-2 focus:ring-soft-gold"
                  />
                  <button
                    onClick={handleCheckTier}
                    className="bg-soft-gold hover:bg-soft-gold/90 text-charcoal px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Check Tier
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-display font-bold">
                  Your Tier: <span className="text-soft-gold">{tierInfo.benefits.name}</span>
                </h3>
                <button
                  onClick={() => {
                    setShowInfo(false);
                    setPhone('');
                    setTierInfo(null);
                  }}
                  className="text-white/90 hover:text-white font-semibold"
                >
                  Check Another
                </button>
              </div>

              <div className="bg-white/10 rounded-lg p-6 mb-6">
                <h4 className="font-semibold mb-2">Current Benefits:</h4>
                <p className="text-white/90 mb-4">{tierInfo.benefits.description}</p>
                <ul className="space-y-2">
                  {tierInfo.benefits.discount > 0 && (
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {tierInfo.benefits.discount}% extra discount
                    </li>
                  )}
                  {tierInfo.benefits.priorityDelivery && (
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Priority delivery
                    </li>
                  )}
                  {tierInfo.benefits.exclusiveProducts && (
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Exclusive products access
                    </li>
                  )}
                  {tierInfo.benefits.dedicatedSupport && (
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Dedicated support
                    </li>
                  )}
                </ul>
              </div>

              {tierInfo.progress.nextTier && (
                <div className="bg-white/10 rounded-lg p-6">
                  <h4 className="font-semibold mb-4">
                    Progress to {tierInfo.progress.nextTier.charAt(0).toUpperCase() + tierInfo.progress.nextTier.slice(1)} Tier:
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Orders: {tierInfo.progress.progress.orders} / {tierInfo.progress.requirements.minOrders}</span>
                        <span>{Math.round(getProgressPercentage(tierInfo.progress.progress.orders, tierInfo.progress.requirements.minOrders))}%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div 
                          className="bg-soft-gold h-2 rounded-full transition-all"
                          style={{ width: `${getProgressPercentage(tierInfo.progress.progress.orders, tierInfo.progress.requirements.minOrders)}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Total Spent: ₹{tierInfo.progress.progress.spent} / ₹{tierInfo.progress.requirements.minSpent}</span>
                        <span>{Math.round(getProgressPercentage(tierInfo.progress.progress.spent, tierInfo.progress.requirements.minSpent))}%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div 
                          className="bg-soft-gold h-2 rounded-full transition-all"
                          style={{ width: `${getProgressPercentage(tierInfo.progress.progress.spent, tierInfo.progress.requirements.minSpent)}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Loyalty Points: {tierInfo.progress.progress.points} / {tierInfo.progress.requirements.minPoints}</span>
                        <span>{Math.round(getProgressPercentage(tierInfo.progress.progress.points, tierInfo.progress.requirements.minPoints))}%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div 
                          className="bg-soft-gold h-2 rounded-full transition-all"
                          style={{ width: `${getProgressPercentage(tierInfo.progress.progress.points, tierInfo.progress.requirements.minPoints)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PremiumTier;
