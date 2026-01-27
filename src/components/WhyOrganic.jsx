import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../i18n/translations';

const WhyOrganic = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  
  const benefits = [
    {
      icon: (
        <svg className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 animate-pulse" fill="none" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="pureGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#16A34A" />
              <stop offset="100%" stopColor="#22C55E" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="35" fill="url(#pureGradient)" opacity="0.15" className="animate-ping" style={{ animationDuration: '2s' }} />
          <path d="M50 15L35 35L50 55L65 35L50 15Z" fill="url(#pureGradient)" className="drop-shadow-lg" />
          <circle cx="50" cy="50" r="12" fill="white" opacity="0.9" />
          <path d="M42 50L47 55L58 44" stroke="url(#pureGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: t.whyOrganic.benefits.pure.title,
      description: t.whyOrganic.benefits.pure.description
    },
    {
      icon: (
        <svg className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 animate-bounce" fill="none" viewBox="0 0 100 100" style={{ animationDuration: '2s' }}>
          <defs>
            <linearGradient id="nutrientsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#FCD34D" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="35" fill="url(#nutrientsGradient)" opacity="0.15" />
          <circle cx="50" cy="50" r="28" fill="url(#nutrientsGradient)" className="drop-shadow-lg" />
          <circle cx="50" cy="50" r="20" fill="#FEF3C7" />
          <path d="M50 30L45 40L50 50L55 40L50 30Z" fill="url(#nutrientsGradient)" />
          <circle cx="50" cy="50" r="6" fill="#D97706" className="animate-pulse" />
        </svg>
      ),
      title: t.whyOrganic.benefits.nutrients.title,
      description: t.whyOrganic.benefits.nutrients.description
    },
    {
      icon: (
        <svg className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24" fill="none" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#60A5FA" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="35" fill="url(#glassGradient)" opacity="0.15" className="animate-pulse" style={{ animationDuration: '3s' }} />
          <path d="M50 20C40 20 32 25 30 32L28 70C28 78 34 84 42 84H58C66 84 72 78 72 70L70 32C68 25 60 20 50 20Z" fill="url(#glassGradient)" className="drop-shadow-lg" />
          <path d="M50 25C42 25 35 29 33 35L31 68C31 74 36 79 42 79H58C64 79 69 74 69 68L67 35C65 29 58 25 50 25Z" fill="#DBEAFE" />
          <rect x="45" y="20" width="10" height="8" rx="2" fill="#1E40AF" className="animate-pulse" />
          <path d="M50 35L50 65" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" className="animate-pulse" style={{ animationDuration: '1.5s' }} />
        </svg>
      ),
      title: t.whyOrganic.benefits.glass.title,
      description: t.whyOrganic.benefits.glass.description
    },
    {
      icon: (
        <svg className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 animate-pulse" fill="none" viewBox="0 0 100 100" style={{ animationDuration: '2.5s' }}>
          <defs>
            <linearGradient id="freshGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#FB923C" />
            </linearGradient>
          </defs>
          <rect x="20" y="50" width="60" height="30" rx="5" fill="url(#freshGradient)" opacity="0.15" />
          <rect x="25" y="55" width="50" height="20" rx="3" fill="url(#freshGradient)" className="drop-shadow-lg" />
          <rect x="30" y="60" width="40" height="10" rx="2" fill="#FFEDD5" />
          <circle cx="35" cy="85" r="8" fill="#1F2937" />
          <circle cx="65" cy="85" r="8" fill="#1F2937" />
          <path d="M15 50L25 45L30 50" stroke="url(#freshGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce" style={{ animationDuration: '1s', transformOrigin: '22.5px 47.5px' }} />
          <circle cx="50" cy="40" r="8" fill="url(#freshGradient)" opacity="0.6" className="animate-ping" style={{ animationDuration: '2s' }} />
        </svg>
      ),
      title: t.whyOrganic.benefits.fresh.title,
      description: t.whyOrganic.benefits.fresh.description
    },
    {
      icon: (
        <svg className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24" fill="none" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="testedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#16A34A" />
              <stop offset="100%" stopColor="#22C55E" />
            </linearGradient>
          </defs>
          <rect x="25" y="25" width="50" height="50" rx="8" fill="url(#testedGradient)" opacity="0.15" className="animate-pulse" style={{ animationDuration: '2s' }} />
          <rect x="30" y="30" width="40" height="40" rx="6" fill="url(#testedGradient)" className="drop-shadow-lg" />
          <path d="M40 50L45 55L60 40" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="animate-draw-check" style={{ strokeDasharray: '30', strokeDashoffset: '30' }} />
        </svg>
      ),
      title: t.whyOrganic.benefits.tested.title,
      description: t.whyOrganic.benefits.tested.description
    },
    {
      icon: (
        <svg className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 animate-spin-slow" fill="none" viewBox="0 0 100 100" style={{ animationDuration: '8s' }}>
          <defs>
            <linearGradient id="ecoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22C55E" />
              <stop offset="50%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#22C55E" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="35" fill="url(#ecoGradient)" opacity="0.15" />
          <circle cx="50" cy="50" r="28" fill="url(#ecoGradient)" className="drop-shadow-lg" />
          <path d="M50 30C40 30 32 35 30 42L28 58C28 65 34 71 42 71H58C65 71 71 65 71 58L69 42C67 35 60 30 50 30Z" fill="#86EFAC" />
          <path d="M50 35C43 35 37 38 35 43L33 55C33 60 37 64 42 64H58C63 64 67 60 67 55L65 43C63 38 57 35 50 35Z" fill="white" />
          <circle cx="50" cy="50" r="8" fill="url(#ecoGradient)" className="animate-pulse" />
        </svg>
      ),
      title: t.whyOrganic.benefits.eco.title,
      description: t.whyOrganic.benefits.eco.description
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
              {t.whyOrganic.title}
            </button>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-charcoal/70 mb-4 sm:mb-6">
            {t.whyOrganic.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-cream rounded-xl p-6 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex justify-center items-center mb-4 text-primary-green group-hover:scale-110 transition-transform duration-300 cursor-pointer">
                {benefit.icon}
              </div>
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
