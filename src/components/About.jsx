import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../i18n/translations';
import deliveryBoyImage from '../assets/deliver boy.png';
import surabhiiAdImage from '../assets/surabhii ad.png';
import cowAboutImage from '../assets/cow-about.png';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); // Start at first image
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef(null);
  const autoPlayRef = useRef(null);
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  const images = [
    { src: cowAboutImage, alt: 'Desi cows on farm', id: 'cow' },
    { src: surabhiiAdImage, alt: 'Surabhii Fresh Milk - Premium dairy products', id: 'bottle' },
    { src: deliveryBoyImage, alt: 'Morning Fresh - Delivery service', id: 'morning' }
  ];

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    // Reset auto-play timer on manual navigation
    resetAutoPlay();
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    // Reset auto-play timer on manual navigation
    resetAutoPlay();
  };

  const resetAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    if (!isPaused) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 4500); // 4.5 seconds
    }
  };


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
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

  // Auto-play effect
  useEffect(() => {
    if (!isPaused) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 4500); // 4.5 seconds
    } else {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isPaused, images.length]);

  // Trust highlights - simplified for premium look
  const trustHighlights = [
    {
      key: 'desiCows',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      )
    },
    {
      key: 'glassBottles',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.393 1.542c.4.434.1 1.198-.4 1.198h-4.5c-.276 0-.5-.224-.5-.5v-1.5M5 14.5l-1.393 1.542c-.4.434-.1 1.198.4 1.198h4.5c.276 0 .5-.224.5-.5v-1.5" />
        </svg>
      )
    },
    {
      key: 'farmFresh',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="scroll-mt-0 bg-cream pt-12 pb-16 sm:pt-16 sm:pb-20 md:pt-20 md:pb-24 lg:pt-24"
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Section Header - Matching Products Section */}
        <div className="text-center mb-8">
          <button
            onClick={() => {
              const element = document.getElementById('about');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="inline-flex items-center justify-center text-xs font-sans font-semibold text-primary-green uppercase tracking-[0.3em] bg-white/70 border border-primary-green/30 hover:border-primary-green/60 hover:text-primary-green/90 px-5 py-2 rounded-full transition-all duration-200 cursor-pointer shadow-sm"
          >
            {t.about.title}
          </button>
          <div className="mx-auto mt-4 h-px w-24 bg-primary-green/30"></div>
        </div>

        {/* Mobile: Stacked layout - Text first, then image */}
        <div className="lg:hidden space-y-5">
          {/* Content Section - Mobile (Text First) */}
          <div 
            className={`transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {/* Large Headline */}
            <h2 className="text-2xl sm:text-3xl font-sans font-semibold text-charcoal leading-tight mb-2 sm:mb-3 text-center px-2">
              {t.about.heading}
            </h2>

            {/* Supporting Paragraph */}
            <p className="text-sm sm:text-base text-charcoal/70 leading-relaxed mb-3 sm:mb-4 text-center px-2">
              {t.about.subheading}
            </p>

            {/* Body Paragraphs */}
            <div className="space-y-2.5 sm:space-y-3 mb-4 sm:mb-5 px-2">
              <p className="text-sm text-charcoal/75 leading-relaxed text-center">
                {t.about.paragraph1}
              </p>
              <p className="text-sm text-charcoal/75 leading-relaxed text-center">
                {t.about.paragraph2}
              </p>
            </div>

            {/* Trust Highlights - Mobile: 2 columns */}
            <div className="grid grid-cols-2 gap-3 mb-4 sm:mb-5 px-2">
              {trustHighlights.slice(0, 2).map((highlight, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 text-charcoal/80 transition-all duration-500 ease-out ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <div className="w-8 h-8 rounded-full bg-white/80 border border-white/70 flex items-center justify-center text-primary-green shadow-sm flex-shrink-0">
                    {highlight.icon}
                  </div>
                  <span className="font-medium text-xs sm:text-sm leading-tight">{t.about.trustIndicators[highlight.key]?.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image Carousel - Mobile (After Text) */}
          <div 
            className="relative w-full aspect-[3/4] max-h-[60vh] rounded-3xl overflow-hidden bg-white border border-white/50 shadow-lg"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Left Arrow Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                goToPrevious();
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  goToPrevious();
                }
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-white/70 shadow-lg flex items-center justify-center text-primary-green hover:bg-white active:scale-95 transition-all duration-200 cursor-pointer touch-manipulation select-none"
              aria-label="Previous image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {/* Fixed Carousel Container with Absolute Positioned Slides */}
            <div className="relative w-full h-full">
              {images.map((image, index) => (
                <div
                  key={image.id}
                  className="absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out"
                  style={{
                    opacity: index === currentIndex ? 1 : 0,
                    zIndex: index === currentIndex ? 10 : index < currentIndex ? 5 : 5,
                    pointerEvents: index === currentIndex ? 'auto' : 'none'
                  }}
                >
                  {image.placeholder ? (
                    <div className="w-full h-full bg-gradient-to-br from-cream/50 via-white/60 to-cream/40 flex items-center justify-center">
                      <div className="text-center p-4">
                        <svg className="w-12 h-12 mx-auto mb-2 text-primary-green/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-xs text-charcoal/40">{image.alt}</p>
                      </div>
                    </div>
                  ) : (
                    <img 
                      src={image.src} 
                      alt={image.alt}
                      className="w-full h-full object-cover object-center"
                    />
                  )}
                </div>
              ))}
            </div>
            
            {/* Right Arrow Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                goToNext();
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  goToNext();
                }
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-white/70 shadow-lg flex items-center justify-center text-primary-green hover:bg-white active:scale-95 transition-all duration-200 cursor-pointer touch-manipulation select-none"
              aria-label="Next image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop: Two-column layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-8 xl:gap-12 items-center">
          
          {/* LEFT COLUMN - Content */}
          <div 
            className={`transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {/* Large Headline */}
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-sans font-semibold text-charcoal leading-tight mb-3 lg:mb-4 tracking-tight">
              {t.about.heading}
            </h2>

            {/* Supporting Paragraph */}
            <p className="text-base lg:text-lg xl:text-xl text-charcoal/70 leading-relaxed mb-4 lg:mb-5 max-w-xl">
              {t.about.subheading}
            </p>

            {/* Body Paragraphs */}
            <div className="space-y-3 lg:space-y-3.5 mb-4 lg:mb-5 max-w-xl">
              <p className="text-sm lg:text-base xl:text-lg text-charcoal/75 leading-relaxed">
                {t.about.paragraph1}
              </p>
              <p className="text-sm lg:text-base xl:text-lg text-charcoal/75 leading-relaxed">
                {t.about.paragraph2}
              </p>
            </div>

            {/* Trust Highlights */}
            <div className="flex flex-wrap gap-3 lg:gap-4">
              {trustHighlights.map((highlight, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 text-sm sm:text-base text-charcoal/80 transition-all duration-500 ease-out ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/80 border border-white/70 flex items-center justify-center text-primary-green shadow-sm">
                    {highlight.icon}
                  </div>
                  <span className="font-medium">
                    {t.about.trustIndicators[highlight.key]?.label}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT COLUMN - Image Carousel */}
          <div 
            className={`order-1 lg:order-2 relative transition-all duration-700 delay-200 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            } flex items-center justify-center`}
          >
            {/* Desktop: Fixed Container Carousel */}
            <div 
              className="hidden lg:block relative w-full max-w-md aspect-[3/4] max-h-[calc(100vh-220px)] rounded-3xl overflow-hidden bg-white border border-white/50 shadow-xl"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Left Arrow Button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  goToPrevious();
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    goToPrevious();
                  }
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border border-white/70 shadow-lg flex items-center justify-center text-primary-green hover:bg-white active:scale-95 transition-all duration-200 cursor-pointer touch-manipulation select-none"
                aria-label="Previous image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              {/* Fixed Carousel Container with Absolute Positioned Slides */}
              <div className="relative w-full h-full">
                {images.map((image, index) => (
                  <div
                    key={image.id}
                    className="absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out"
                    style={{
                      opacity: index === currentIndex ? 1 : 0,
                      zIndex: index === currentIndex ? 10 : index < currentIndex ? 5 : 5,
                      pointerEvents: index === currentIndex ? 'auto' : 'none'
                    }}
                  >
                    {image.placeholder ? (
                      <div className="w-full h-full bg-gradient-to-br from-cream/50 via-white/60 to-cream/40 flex items-center justify-center">
                        <div className="text-center p-4">
                          <svg className="w-12 h-12 mx-auto mb-2 text-primary-green/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="text-xs text-charcoal/40">{image.alt}</p>
                        </div>
                      </div>
                    ) : (
                      <img 
                        src={image.src} 
                        alt={image.alt}
                        className="w-full h-full object-cover object-center"
                      />
                    )}
                  </div>
                ))}
              </div>
              
              {/* Right Arrow Button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  goToNext();
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    goToNext();
                  }
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border border-white/70 shadow-lg flex items-center justify-center text-primary-green hover:bg-white active:scale-95 transition-all duration-200 cursor-pointer touch-manipulation select-none"
                aria-label="Next image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
