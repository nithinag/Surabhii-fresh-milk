import { useState } from 'react';
import { getReturnSchedule } from '../utils/bottleReturnUtils';
import { normalizePhoneNumber, validatePhoneNumber } from '../utils/loyaltyUtils';

const BottleReturn = () => {
  const [phone, setPhone] = useState('');
  const [returns, setReturns] = useState([]);
  const [showSchedule, setShowSchedule] = useState(false);

  const handleViewSchedule = () => {
    if (!phone) {
      alert('Please enter your phone number');
      return;
    }

    if (!validatePhoneNumber(phone)) {
      alert('Please enter a valid 10-digit Indian phone number');
      return;
    }

    const normalizedPhone = normalizePhoneNumber(phone);
    const returnSchedule = getReturnSchedule(normalizedPhone);
    setReturns(returnSchedule);
    setShowSchedule(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'returned':
        return 'text-green-600 bg-green-50';
      case 'overdue':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-yellow-600 bg-yellow-50';
    }
  };

  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-display font-bold text-primary-green mb-6">
            Bottle Return Schedule
          </h2>
          <p className="text-charcoal/70 mb-6">
            Track your glass bottle return schedule. Simply leave empty bottles at your doorstep on the return date.
          </p>

          {!showSchedule ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">
                  Enter Your Phone Number
                </label>
                <div className="flex gap-2">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your 10-digit phone number"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
                  />
                  <button
                    onClick={handleViewSchedule}
                    className="bg-primary-green hover:bg-secondary-green text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    View Schedule
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-charcoal">
                  Your Return Schedule ({returns.length} items)
                </h3>
                <button
                  onClick={() => {
                    setShowSchedule(false);
                    setPhone('');
                    setReturns([]);
                  }}
                  className="text-primary-green hover:text-secondary-green font-semibold"
                >
                  Check Another
                </button>
              </div>

              {returns.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🫙</div>
                  <p className="text-charcoal/70 text-lg">No return schedule found for this phone number</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {returns.map((returnItem, index) => (
                    <div key={index} className="border rounded-lg p-6 bg-cream">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="font-semibold text-charcoal mb-2">
                            Order #{returnItem.orderId}
                          </div>
                          <div className="text-sm text-charcoal/70 space-y-1">
                            <div>
                              Delivery Date: {new Date(returnItem.deliveryDate).toLocaleDateString('en-IN', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </div>
                            <div>
                              Membership: {returnItem.membershipType.charAt(0).toUpperCase() + returnItem.membershipType.slice(1)}
                            </div>
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(returnItem.status)}`}>
                          {returnItem.status.charAt(0).toUpperCase() + returnItem.status.slice(1)}
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm text-charcoal/70 mb-1">Return Date</div>
                            <div className="text-lg font-bold text-primary-green">
                              {new Date(returnItem.returnDate).toLocaleDateString('en-IN', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </div>
                          </div>
                          <div className="text-4xl">🫙</div>
                        </div>
                        <div className="mt-3 text-sm text-charcoal/70">
                          Please leave empty bottles at your doorstep on the return date. Our delivery person will collect them.
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BottleReturn;
