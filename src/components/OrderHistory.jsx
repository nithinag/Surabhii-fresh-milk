import { useState } from 'react';
import { getCustomerOrderHistory, normalizePhoneNumber } from '../utils/loyaltyUtils';

const OrderHistory = () => {
  const [phone, setPhone] = useState('');
  const [orders, setOrders] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleViewHistory = () => {
    if (!phone) {
      alert('Please enter your phone number');
      return;
    }

    const normalizedPhone = normalizePhoneNumber(phone);
    const customerOrders = getCustomerOrderHistory(normalizedPhone);
    setOrders(customerOrders);
    setShowHistory(true);
  };

  const getDeliveryStatus = (orderDate) => {
    const order = new Date(orderDate);
    const now = new Date();
    const daysDiff = Math.floor((now - order) / (1000 * 60 * 60 * 24));
    
    if (daysDiff < 0) return { status: 'pending', text: 'Pending', color: 'text-yellow-600' };
    if (daysDiff === 0) return { status: 'delivered', text: 'Delivered Today', color: 'text-green-600' };
    if (daysDiff <= 7) return { status: 'delivered', text: 'Delivered', color: 'text-green-600' };
    return { status: 'completed', text: 'Completed', color: 'text-blue-600' };
  };

  return (
    <section id="order-history" className="py-16 md:py-24 bg-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-display font-bold text-primary-green mb-6">
            My Orders
          </h2>

          {!showHistory ? (
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
                    onClick={handleViewHistory}
                    className="bg-primary-green hover:bg-secondary-green text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    View Orders
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-charcoal">
                  Order History ({orders.length} orders)
                </h3>
                <button
                  onClick={() => {
                    setShowHistory(false);
                    setPhone('');
                    setOrders([]);
                  }}
                  className="text-primary-green hover:text-secondary-green font-semibold"
                >
                  Change Phone
                </button>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📦</div>
                  <p className="text-charcoal/70 text-lg">No orders found for this phone number</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order, index) => {
                    const deliveryStatus = getDeliveryStatus(order.orderDate);
                    return (
                      <div key={index} className="border rounded-lg p-6 bg-cream">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <div className="font-semibold text-charcoal">
                              Order #{index + 1}
                            </div>
                            <div className="text-sm text-charcoal/70">
                              {new Date(order.orderDate).toLocaleDateString('en-IN', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </div>
                          </div>
                          <div className={`font-semibold ${deliveryStatus.color}`}>
                            {deliveryStatus.text}
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="font-semibold text-charcoal mb-2">Items:</div>
                          <div className="space-y-1">
                            {order.items?.map((item, itemIndex) => (
                              <div key={itemIndex} className="flex justify-between text-charcoal/80">
                                <span>{item.name} x{item.quantity}</span>
                                <span>₹{item.price * item.quantity}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="border-t pt-4 flex justify-between items-center">
                          <div>
                            <div className="text-sm text-charcoal/70">Total</div>
                            <div className="text-xl font-bold text-charcoal">₹{order.total}</div>
                          </div>
                          {order.pointsEarned > 0 && (
                            <div className="text-right">
                              <div className="text-sm text-charcoal/70">Points Earned</div>
                              <div className="text-lg font-semibold text-primary-green">
                                +{order.pointsEarned}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OrderHistory;
