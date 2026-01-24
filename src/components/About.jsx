import { useState, useEffect, useRef } from 'react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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

  // Trust indicators with simple line-based icons
  const trustIndicators = [
    {
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      ),
      label: 'Desi Cows',
      description: 'Pure Indian breed'
    },
    {
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.393 1.542c.4.434.1 1.198-.4 1.198h-4.5c-.276 0-.5-.224-.5-.5v-1.5M5 14.5l-1.393 1.542c-.4.434-.1 1.198.4 1.198h4.5c.276 0 .5-.224.5-.5v-1.5" />
        </svg>
      ),
      label: 'Glass Bottles',
      description: 'Eco-friendly packaging'
    },
    {
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      ),
      label: 'Farm Fresh',
      description: 'Direct from our farm'
    },
    {
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
      ),
      label: 'No Preservatives',
      description: '100% natural'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="scroll-mt-0 md:scroll-mt-0 min-h-screen flex items-center pt-4 pb-12 md:pt-8 md:pb-16 lg:pt-10 lg:pb-20 relative bg-cream overflow-hidden"
    >
      {/* Soft organic background wash */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.9),_rgba(250,247,242,0.9),_rgba(246,240,232,0.95))] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section framing card */}
        <div className={`rounded-[32px] border border-white/70 bg-white/55 backdrop-blur-md shadow-2xl px-6 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {/* Centered Section Label */}
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
              ABOUT US
            </button>
            <div className="mx-auto mt-4 h-px w-24 bg-primary-green/30"></div>
          </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          
          {/* Left Side - Visual Storytelling */}
          <div 
            className={`order-1 lg:order-1 transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="relative rounded-3xl overflow-hidden bg-white/70 backdrop-blur-md border border-white/70 aspect-[4/3] shadow-xl transition-transform duration-500 ease-out hover:scale-[1.02]">
              {/* Image Container */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white/40 via-cream to-white/60">
                <div className="text-center p-6 max-w-sm">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-white/90 shadow-soft flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary-green/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                    </svg>
                  </div>
                  <p className="text-xs text-charcoal/50 font-medium mb-1">Farm Image</p>
                  <p className="text-[10px] text-charcoal/40">Add your farm image here</p>
                </div>
              </div>
              
              {/* Uncomment and add your image path to replace placeholder */}
              {/* 
              <img 
                src="/images/farm-image.jpg" 
                alt="Surabhii Fresh Milk farm - Desi cows grazing on natural pastures"
                className="w-full h-full object-cover"
              />
              */}
            </div>
          </div>

          {/* Right Side - Structured Text Content */}
          <div 
            className={`order-2 lg:order-2 text-center lg:text-left transition-all duration-1000 delay-200 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >

            {/* Large Bold Headline - Sans Font */}
            <h2 className="text-4xl lg:text-5xl font-sans font-semibold text-primary-green leading-[1.1] mb-4 sm:mb-5 mx-auto lg:mx-0 max-w-2xl tracking-tight">
              From Our Farm to Your Home
            </h2>

            {/* Short Subheading */}
            <p className="text-base sm:text-lg md:text-xl text-charcoal/70 leading-relaxed mb-6 sm:mb-7 max-w-xl mx-auto lg:mx-0">
              Premium fresh milk from Indian desi cows, delivered in glass bottles to preserve purity and taste.
            </p>

            {/* Minimalist Body Copy */}
            <div className="space-y-4 sm:space-y-5 mb-6 sm:mb-7 max-w-2xl mx-auto lg:mx-0">
              <p className="text-sm sm:text-base md:text-lg text-charcoal/75 leading-relaxed">
                At <span className="font-semibold text-primary-green">SURABHII FRESH MILK</span>, we bring you the purest milk from our own farm, 
                where our desi cows graze on natural pastures and every bottle is filled fresh daily.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-charcoal/75 leading-relaxed">
                No preservatives, no additives—just glass packaging that keeps your milk pure, safe, and naturally delicious.
              </p>
              <div className="w-16 h-px bg-primary-green/30 mx-auto lg:mx-0"></div>
            </div>

            {/* Trust Indicators Grid - Centered */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 max-w-2xl mx-auto lg:mx-0">
              {trustIndicators.map((indicator, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center text-center space-y-1.5 sm:space-y-2 rounded-2xl bg-white/70 border border-white/70 shadow-soft px-3 py-4 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-lg ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 border border-white/80 flex items-center justify-center text-primary-green shadow-sm transition-all duration-300">
                    {indicator.icon}
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-[10px] sm:text-xs font-bold text-charcoal leading-tight">
                      {indicator.label}
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-charcoal/60 leading-tight">
                      {indicator.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default About;
