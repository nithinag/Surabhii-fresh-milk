const Memberships = ({ selectedMembership, onSelectMembership }) => {
  const memberships = [
    {
      id: 'trial',
      name: 'Trial Pack',
      price: '20% OFF',
      description: 'Try us for 3 days',
      benefits: [
        '20% discount (first-time only)',
        '3-day trial period',
        'Full product access',
        'No commitment required'
      ],
      popular: false
    },
    {
      id: 'weekly',
      name: 'Weekly Plan',
      price: '5% OFF',
      description: 'Perfect for regular customers',
      benefits: [
        '5% discount on all orders',
        'Weekly delivery schedule',
        'Priority support',
        'Loyalty points on every purchase'
      ],
      popular: false
    },
    {
      id: 'monthly',
      name: 'Monthly Plan',
      price: '10% OFF',
      description: 'Best value for families',
      benefits: [
        '10% discount on all orders',
        'Monthly delivery schedule',
        'Priority support',
        'Extra loyalty points',
        'Free bottle collection'
      ],
      popular: true
    },
    {
      id: 'yearly',
      name: 'Yearly Plan',
      price: '15% OFF',
      description: 'Maximum savings',
      benefits: [
        '15% discount on all orders',
        'Flexible delivery schedule',
        'Priority support',
        'Maximum loyalty points',
        'Free bottle collection',
        'Exclusive products access'
      ],
      popular: false
    }
  ];

  return (
    <section id="memberships" className="py-12 sm:py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-primary-green mb-3 sm:mb-4">
            Membership Plans
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-charcoal/70 px-2">
            Choose a plan that works best for you
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {memberships.map((membership) => (
            <div
              key={membership.id}
              onClick={() => onSelectMembership(membership.id)}
              className={`relative bg-white rounded-xl shadow-lg p-5 sm:p-6 cursor-pointer transition-all duration-300 transform active:scale-95 hover:scale-105 touch-manipulation flex flex-col h-full ${
                selectedMembership === membership.id
                  ? 'ring-2 sm:ring-4 ring-primary-green shadow-2xl'
                  : 'hover:shadow-xl'
              } ${membership.popular ? 'border-2 border-soft-gold' : ''}`}
            >
              {membership.popular && (
                <div className="absolute -top-2.5 sm:-top-3 left-1/2 transform -translate-x-1/2 bg-soft-gold text-charcoal px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold">
                  Most Popular
                </div>
              )}
              
              <div className="text-center mb-3 sm:mb-4">
                <h3 className="text-xl sm:text-2xl font-display font-bold text-primary-green mb-1 sm:mb-2">
                  {membership.name}
                </h3>
                <div className="text-2xl sm:text-3xl font-bold text-charcoal mb-1 sm:mb-2">
                  {membership.price}
                </div>
                <p className="text-xs sm:text-sm text-charcoal/70">{membership.description}</p>
              </div>

              <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6 flex-grow">
                {membership.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2 text-xs sm:text-sm text-charcoal/80">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary-green flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className={`text-center py-2.5 sm:py-2 rounded-lg font-semibold text-sm sm:text-base min-h-[44px] flex items-center justify-center mt-auto ${
                selectedMembership === membership.id
                  ? 'bg-primary-green text-white'
                  : 'bg-cream text-charcoal'
              }`}>
                {selectedMembership === membership.id ? 'Selected' : 'Select Plan'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Memberships;
