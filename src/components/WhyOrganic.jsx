const WhyOrganic = () => {
  const benefits = [
    {
      icon: (
        <svg className="w-12 h-12 sm:w-14 sm:h-14" fill="none" viewBox="0 0 100 100">
          <path d="M50 20L30 40L50 60L70 40L50 20Z" fill="#22C55E" opacity="0.2"/>
          <path d="M50 25L35 40L50 55L65 40L50 25Z" fill="#22C55E"/>
          <path d="M45 40L50 35L55 40L50 45L45 40Z" fill="#86EFAC"/>
          <circle cx="50" cy="50" r="8" fill="#16A34A"/>
          <path d="M30 70L50 50L70 70" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: '100% Surabhii',
      description: 'No artificial hormones, antibiotics, or additives. Pure, natural milk from happy, healthy cows.'
    },
    {
      icon: (
        <svg className="w-12 h-12 sm:w-14 sm:h-14" fill="none" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="30" fill="#F59E0B" opacity="0.2"/>
          <path d="M50 25C45 25 40 27 38 30L35 50C35 55 39 59 44 59H56C61 59 65 55 65 50L62 30C60 27 55 25 50 25Z" fill="#F59E0B"/>
          <path d="M45 40L50 35L55 40L50 45L45 40Z" fill="#FCD34D"/>
          <path d="M50 30L50 55M45 35L55 45M55 35L45 45" stroke="#D97706" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      title: 'Rich in Nutrients',
      description: 'Higher levels of omega-3 fatty acids, antioxidants, and essential vitamins for your family.'
    },
    {
      icon: (
        <svg className="w-12 h-12 sm:w-14 sm:h-14" fill="none" viewBox="0 0 100 100">
          <path d="M50 20C40 20 32 25 30 32L28 70C28 78 34 84 42 84H58C66 84 72 78 72 70L70 32C68 25 60 20 50 20Z" fill="#3B82F6" opacity="0.2"/>
          <path d="M50 25C42 25 35 29 33 35L31 68C31 74 36 79 42 79H58C64 79 69 74 69 68L67 35C65 29 58 25 50 25Z" fill="#3B82F6"/>
          <path d="M50 30C45 30 40 32 38 36L36 63C36 67 39 70 43 70H57C61 70 64 67 64 63L62 36C60 32 55 30 50 30Z" fill="#DBEAFE"/>
          <rect x="45" y="20" width="10" height="8" rx="2" fill="#1E40AF"/>
        </svg>
      ),
      title: 'Glass Bottles',
      description: 'Safe, hygienic, and eco-friendly. No plastic chemicals leaching into your milk.'
    },
    {
      icon: (
        <svg className="w-12 h-12 sm:w-14 sm:h-14" fill="none" viewBox="0 0 100 100">
          <rect x="20" y="50" width="60" height="30" rx="5" fill="#F97316" opacity="0.2"/>
          <rect x="25" y="55" width="50" height="20" rx="3" fill="#F97316"/>
          <rect x="30" y="60" width="40" height="10" rx="2" fill="#FFEDD5"/>
          <circle cx="35" cy="85" r="8" fill="#1F2937"/>
          <circle cx="65" cy="85" r="8" fill="#1F2937"/>
          <path d="M15 50L25 45L30 50" stroke="#F97316" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Fresh Daily',
      description: 'Delivered fresh from our farm within hours. Maximum freshness and nutritional value.'
    },
    {
      icon: (
        <svg className="w-12 h-12 sm:w-14 sm:h-14" fill="none" viewBox="0 0 100 100">
          <rect x="25" y="25" width="50" height="50" rx="8" fill="#22C55E" opacity="0.2"/>
          <rect x="30" y="30" width="40" height="40" rx="6" fill="#22C55E"/>
          <path d="M40 50L45 55L60 40" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Lab Tested',
      description: 'Regular quality testing ensures purity, safety, and compliance with all standards.'
    },
    {
      icon: (
        <svg className="w-12 h-12 sm:w-14 sm:h-14" fill="none" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="30" fill="#3B82F6" opacity="0.2"/>
          <circle cx="50" cy="50" r="25" fill="#3B82F6"/>
          <path d="M50 30C40 30 32 35 30 42L28 58C28 65 34 71 42 71H58C65 71 71 65 71 58L69 42C67 35 60 30 50 30Z" fill="#22C55E"/>
          <path d="M50 35C43 35 37 38 35 43L33 55C33 60 37 64 42 64H58C63 64 67 60 67 55L65 43C63 38 57 35 50 35Z" fill="#86EFAC"/>
        </svg>
      ),
      title: 'Eco-Friendly',
      description: 'Sustainable farming practices and reusable glass bottles help protect our environment.'
    }
  ];

  return (
    <section id="why-organic" className="scroll-mt-0 md:scroll-mt-0 min-h-screen flex items-center bg-white pt-4 pb-12 md:pt-8 md:pb-16 lg:pt-10 lg:pb-20">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-block mb-4">
            <button
              onClick={() => {
                const element = document.getElementById('why-organic');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="text-sm sm:text-base font-sans font-semibold text-primary-green uppercase tracking-wider bg-cream hover:bg-primary-green/10 active:bg-primary-green/20 px-4 py-2 rounded-full transition-all duration-200 cursor-pointer"
            >
              Why Surabhii
            </button>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-charcoal/70 mb-4 sm:mb-6">
            The benefits of fresh and pure milk go beyond just taste
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-cream rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex justify-center items-center mb-4 text-primary-green">{benefit.icon}</div>
              <h3 className="text-xl font-sans font-semibold text-primary-green mb-2">
                {benefit.title}
              </h3>
              <p className="text-charcoal/70 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyOrganic;
