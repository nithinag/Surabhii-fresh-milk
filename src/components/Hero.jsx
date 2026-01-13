import { useState, useEffect, useRef } from 'react';

const Hero = ({ onScrollToProducts }) => {
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    // Auto-play video with muted and loop
    if (videoRef.current) {
      // Check if device is mobile to optimize video loading
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      
      if (isMobile) {
        // On mobile, use lower quality or skip video for better performance
        videoRef.current.setAttribute('playsinline', 'true');
        videoRef.current.setAttribute('preload', 'metadata');
      }
      
      videoRef.current.play().catch(err => {
        console.log('Video autoplay prevented:', err);
        // Hide video element if autoplay fails
        if (videoRef.current) {
          videoRef.current.style.display = 'none';
        }
      });
    }
  }, []);

  const handleWhatsAppOrder = () => {
    const message = `Hello! I'm interested in ordering fresh organic milk from Surabhii Fresh Milk.`;
    const whatsappUrl = `https://wa.me/9600642226?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleLearnMore = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollDown = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden w-full">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover max-w-full"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Crect fill='%23FAF7F2' width='1920' height='1080'/%3E%3C/svg%3E"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
          onLoadedData={() => {
            if (videoRef.current) {
              videoRef.current.style.opacity = '1';
            }
          }}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          <source src="/hero-video.webm" type="video/webm" />
        </video>
        {/* Fallback gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cream via-cream/95 to-cream w-full h-full"></div>
        {/* Overlay for better text readability - stronger on mobile */}
        <div className="absolute inset-0 bg-cream/85 md:bg-cream/80 backdrop-blur-[2px] w-full h-full"></div>
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-cream/92 via-cream/78 to-cream/92 md:from-cream/90 md:via-cream/75 md:to-cream/90 w-full h-full"></div>
      </div>

      {/* Content - Mobile Optimized */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24 text-center">
        <div className={`w-full ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
          {/* Main Heading - Better mobile sizing */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-primary-green mb-4 sm:mb-5 md:mb-6 leading-tight px-2 break-words">
            Freshness You Can Trust
          </h1>
          
          {/* Subheading - Better mobile spacing */}
          <p className={`text-sm sm:text-base md:text-lg lg:text-xl text-charcoal/80 mb-6 sm:mb-8 md:mb-10 leading-relaxed max-w-3xl mx-auto px-2 break-words ${isVisible ? 'fade-in-up-delay' : 'opacity-0'}`}>
            Premium farm fresh desi cow milk delivered in glass bottles within minutes.
          </p>
          
          {/* Buttons - Stacked vertically on mobile */}
          <div className={`flex flex-col gap-3 sm:gap-4 md:flex-row md:gap-6 justify-center items-stretch mb-8 sm:mb-10 md:mb-12 px-2 ${isVisible ? 'fade-in-up-delay' : 'opacity-0'}`}>
            <button
              onClick={handleWhatsAppOrder}
              className="w-full md:w-auto md:min-w-[220px] bg-primary-green hover:bg-secondary-green active:bg-secondary-green text-white px-6 py-4 md:px-8 md:py-4 rounded-lg font-semibold text-base md:text-lg transition-all duration-300 transform active:scale-95 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2.5 touch-manipulation min-h-[48px]"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.77.966-.944 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span className="whitespace-nowrap">Order Fresh Milk on WhatsApp</span>
            </button>
            <button
              onClick={handleLearnMore}
              className="w-full md:w-auto md:min-w-[180px] bg-soft-gold hover:bg-soft-gold/90 active:bg-soft-gold/80 text-charcoal px-6 py-4 md:px-8 md:py-4 rounded-lg font-semibold text-base md:text-lg transition-all duration-300 transform active:scale-95 hover:scale-105 shadow-lg hover:shadow-xl touch-manipulation min-h-[48px]"
            >
              Learn More
            </button>
          </div>

          {/* Feature Icons - 2-column grid on mobile, horizontal on larger screens */}
          <div className={`grid grid-cols-2 sm:flex sm:flex-row sm:items-center sm:justify-center gap-3 sm:gap-4 md:gap-6 px-2 max-w-md sm:max-w-none mx-auto ${isVisible ? 'fade-in-up-delay' : 'opacity-0'}`}>
            <div className="flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 text-charcoal">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 text-primary-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-xs sm:text-sm md:text-base font-medium">100% Organic</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 text-charcoal">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 text-primary-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs sm:text-sm md:text-base font-medium">Fast Delivery</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 text-charcoal col-span-2 sm:col-span-1">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 text-primary-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span className="text-xs sm:text-sm md:text-base font-medium">Glass Bottles</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Functional and clickable */}
      <button
        onClick={handleScrollDown}
        className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce hover:scale-110 active:scale-95 transition-transform duration-300 touch-manipulation cursor-pointer group min-w-[44px] min-h-[44px] flex items-center justify-center"
        aria-label="Scroll to next section"
      >
        <div className="flex flex-col items-center gap-1 text-primary-green group-hover:text-secondary-green transition-colors">
          <span className="text-xs font-medium hidden sm:block">Scroll</span>
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </button>
    </section>
  );
};

export default Hero;
