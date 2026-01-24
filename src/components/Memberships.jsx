import { useEffect, useRef, useState } from 'react';
import { MembershipStatus, setMembershipPeriod, setMembershipStatus } from '../utils/membershipUtils';
import { openWhatsApp } from '../utils/whatsappUtils';

const Memberships = ({ selectedMembership, onSelectMembership }) => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleMembershipWhatsApp = (membershipId) => {
    setMembershipStatus(MembershipStatus.INITIATED);
    setMembershipPeriod(new Date(), null);
    const selected = memberships.find((item) => item.id === membershipId);
    const planLine = selected ? `\nSelected Plan: ${selected.name}` : '';
    const message = `Hello Surabhii Fresh Milk 🥛
I’d like to start a membership.${planLine}`;
    openWhatsApp(message);
  };

  return (
    <section id="memberships" ref={sectionRef} className="scroll-mt-0 md:scroll-mt-0 min-h-screen flex items-center bg-cream pt-4 pb-12 md:pt-8 md:pb-16 lg:pt-10 lg:pb-20">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-12">
        <div className={`rounded-[32px] border border-white/70 bg-white/60 backdrop-blur-md shadow-2xl px-6 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="text-center mb-8">
            <button
              onClick={() => {
                const element = document.getElementById('memberships');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="inline-flex items-center justify-center text-xs font-sans font-semibold text-primary-green uppercase tracking-[0.3em] bg-white/70 border border-primary-green/30 hover:border-primary-green/60 hover:text-primary-green/90 px-5 py-2 rounded-full transition-all duration-200 cursor-pointer shadow-sm"
            >
              Memberships
            </button>
            <div className="mx-auto mt-4 h-px w-24 bg-primary-green/30"></div>
            <p className="text-sm sm:text-base text-charcoal/70 mt-4 max-w-2xl mx-auto">
              Choose a plan that works best for you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {memberships.map((membership, index) => (
              <div
                key={membership.id}
                onClick={() => onSelectMembership(membership.id)}
                className={`relative rounded-3xl bg-white/80 backdrop-blur-md border border-white/70 shadow-lg p-6 cursor-pointer transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-2xl touch-manipulation flex flex-col h-full ${
                  selectedMembership === membership.id
                    ? 'ring-2 sm:ring-4 ring-primary-green shadow-2xl'
                    : ''
                } ${membership.popular ? 'border-soft-gold/60' : ''} ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${120 + index * 80}ms` }}
              >
                {membership.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-soft-gold text-charcoal px-4 py-1 rounded-full text-xs font-semibold shadow-md">
                    Most Popular
                  </div>
                )}
                
                <div className="text-center mb-4">
                  <h3 className="text-xl sm:text-2xl font-sans font-semibold text-primary-green mb-1">
                    {membership.name}
                  </h3>
                  <div className="text-2xl sm:text-3xl font-bold text-charcoal mb-2">
                    {membership.price}
                  </div>
                  <p className="text-xs sm:text-sm text-charcoal/70">{membership.description}</p>
                </div>

                <ul className="space-y-2 mb-6 flex-grow">
                  {membership.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-start gap-2 text-xs sm:text-sm text-charcoal/80">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary-green flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <div className={`text-center py-2.5 rounded-full font-semibold text-sm sm:text-base min-h-[44px] flex items-center justify-center mt-auto ${
                  selectedMembership === membership.id
                    ? 'bg-primary-green text-white'
                    : 'bg-cream text-charcoal'
                }`}>
                  {selectedMembership === membership.id ? 'Selected' : 'Select Plan'}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => handleMembershipWhatsApp(selectedMembership !== 'none' ? selectedMembership : null)}
              className="bg-primary-green hover:bg-secondary-green active:bg-secondary-green text-white px-6 py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-200 shadow-md hover:shadow-lg min-h-[44px]"
            >
              Start Membership on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Memberships;
