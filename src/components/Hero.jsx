import { useState, useEffect, useRef } from 'react';
import { openWhatsApp } from '../utils/whatsappUtils';

const Hero = ({ onScrollToProducts }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    // Check for prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    setIsVisible(true);
    
    // Handle video setup
    if (videoRef.current && !prefersReducedMotion) {
      const video = videoRef.current;
      
      // Set video attributes for optimal playback
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.setAttribute('playsinline', 'true');
      video.setAttribute('webkit-playsinline', 'true');
      
      // Set playback rate for smooth flow
      video.playbackRate = 1.0;
      
      // Check if device is mobile for performance optimization
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      
      // Set preload strategy
      if (isMobile) {
        video.setAttribute('preload', 'metadata');
      } else {
        video.setAttribute('preload', 'auto');
      }
      
      // Show video immediately with partial opacity
      video.style.opacity = '0.5';
      video.style.display = 'block';
      
      // Fallback: Show video after 2 seconds even if events don't fire
      const fallbackTimeout = setTimeout(() => {
        if (!videoLoaded) {
          setVideoLoaded(true);
          video.style.opacity = '1';
        }
      }, 2000);
      
      // Attempt to play video
      const playVideo = async () => {
        try {
          await video.play();
          setVideoLoaded(true);
          video.style.opacity = '1';
          clearTimeout(fallbackTimeout);
        } catch (err) {
          console.log('Video autoplay prevented, but showing video:', err);
          // Still show video even if autoplay fails
          setVideoLoaded(true);
          video.style.opacity = '1';
          clearTimeout(fallbackTimeout);
        }
      };
      
      // Try to play when video can play
      if (video.readyState >= 2) {
        // Video already has enough data
        playVideo();
      } else {
        // Wait for video to be ready
        const canPlayHandler = () => {
          playVideo();
        };
        const loadedDataHandler = () => {
          setVideoLoaded(true);
          video.style.opacity = '1';
          clearTimeout(fallbackTimeout);
        };
        
        video.addEventListener('canplay', canPlayHandler, { once: true });
        video.addEventListener('loadeddata', loadedDataHandler, { once: true });
        video.addEventListener('loadedmetadata', loadedDataHandler, { once: true });
        video.addEventListener('playing', () => {
          setVideoLoaded(true);
          video.style.opacity = '1';
          clearTimeout(fallbackTimeout);
        }, { once: true });
      }
      
      return () => {
        clearTimeout(fallbackTimeout);
      };
    } else if (prefersReducedMotion && videoRef.current) {
      // Hide video if user prefers reduced motion
      videoRef.current.style.display = 'none';
    }
  }, [prefersReducedMotion]);

  // Pause video when tab is inactive, resume when active
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (videoRef.current) {
        if (document.hidden) {
          videoRef.current.pause();
        } else if (!prefersReducedMotion) {
          videoRef.current.play().catch(() => {
            // Silently handle play errors
          });
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [prefersReducedMotion]);

  const handleWhatsAppOrder = () => {
    const message = `Hello Surabhii Fresh Milk 🥛
I’d like to order fresh cow milk.
Please share today’s availability and pricing.`;
    openWhatsApp(message);
  };

  const handleLearnMore = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleScrollDown = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      const navbar = document.querySelector('nav');
      const navbarHeight = navbar ? navbar.offsetHeight : 80;
      const elementTop = aboutSection.offsetTop;
      const targetScroll = elementTop - navbarHeight;
      window.scrollTo({
        top: Math.max(0, targetScroll),
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="home" 
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{ 
        paddingTop: '0', 
        scrollMarginTop: '0', 
        maxWidth: '100vw', 
        maxHeight: '100vh' 
      }}
    >
      {/* Background Video - Premium Quality */}
      <div 
        className="absolute inset-0 z-0 w-full h-full overflow-hidden" 
        style={{ 
          width: '100vw', 
          height: '100vh', 
          maxWidth: '100%', 
          maxHeight: '100%' 
        }}
      >
        {!prefersReducedMotion && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            webkit-playsinline="true"
            className="absolute inset-0 z-0"
            style={{
              objectFit: 'cover',
              objectPosition: 'center center',
              width: '100vw',
              height: '100vh',
              maxWidth: '100%',
              maxHeight: '100%',
              minWidth: '100%',
              minHeight: '100%',
              opacity: videoLoaded ? 1 : 0.3,
              transition: 'opacity 1.5s ease-in-out',
              zIndex: 0,
              filter: 'brightness(1.02) contrast(1.03) saturate(0.98)',
              willChange: 'opacity',
              display: 'block',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
            onError={(e) => {
              console.error('Video failed to load:', e);
            }}
            onLoadedData={() => {
              setVideoLoaded(true);
              if (videoRef.current) {
                videoRef.current.style.opacity = '1';
                videoRef.current.playbackRate = 1.0;
                videoRef.current.play().catch((err) => {
                  console.log('Play error (non-critical):', err);
                });
              }
            }}
            onCanPlay={() => {
              setVideoLoaded(true);
              if (videoRef.current) {
                videoRef.current.style.opacity = '1';
                videoRef.current.playbackRate = 1.0;
                videoRef.current.play().catch((err) => {
                  console.log('Play error (non-critical):', err);
                });
              }
            }}
            onLoadedMetadata={() => {
              setVideoLoaded(true);
              if (videoRef.current) {
                videoRef.current.style.opacity = '1';
                videoRef.current.playbackRate = 1.0;
                videoRef.current.play().catch((err) => {
                  console.log('Play error (non-critical):', err);
                });
              }
            }}
            onPlaying={() => {
              setVideoLoaded(true);
              if (videoRef.current) {
                videoRef.current.style.opacity = '1';
              }
            }}
          >
            <source src="/hero-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        
        {/* Fallback gradient background */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-cream via-cream/95 to-cream z-0"
          style={{
            width: '100vw',
            height: '100vh',
            maxWidth: '100%',
            maxHeight: '100%',
            opacity: videoLoaded && !prefersReducedMotion ? 0 : 0.3,
            transition: 'opacity 1s ease-in-out',
            pointerEvents: 'none',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        ></div>
        
        {/* Premium overlay - subtle gradient for depth */}
        <div 
          className="absolute inset-0 z-[1]"
          style={{
            width: '100vw',
            height: '100vh',
            maxWidth: '100%',
            maxHeight: '100%',
            background: videoLoaded && !prefersReducedMotion
              ? 'linear-gradient(180deg, rgba(14, 32, 22, 0.45) 0%, rgba(14, 32, 22, 0.25) 45%, rgba(250, 247, 242, 0.08) 70%, rgba(14, 32, 22, 0.25) 100%)'
              : 'linear-gradient(to bottom, rgba(250,247,242,0.9) 0%, rgba(250,247,242,0.8) 100%)',
            transition: 'background 1s ease-in-out',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        ></div>
      </div>

      {/* Premium Content Container */}
      <div 
        className="relative z-10 w-full max-w-[1200px] mx-auto px-6 lg:px-12 text-center"
        style={{ maxWidth: '100vw', overflow: 'hidden' }}
      >
        <div className={`w-full space-y-6 sm:space-y-8 md:space-y-10 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
          
          {/* Main Heading - Minimalist Premium Typography */}
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-bold text-white leading-[1.12] break-words"
            style={{
              textShadow: '0 4px 24px rgba(0,0,0,0.6), 0 2px 12px rgba(0,0,0,0.4)',
              letterSpacing: '-0.03em',
            }}
          >
            Freshness You Can{' '}
            <span className="text-primary-green" style={{ textShadow: '0 4px 24px rgba(255,255,255,0.4), 0 2px 12px rgba(0,0,0,0.3)' }}>
              Trust
            </span>
          </h1>
          
          {/* Subheading - Clean & Minimalist */}
          <p 
            className={`text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-[1.6] max-w-[600px] mx-auto break-words font-bold ${isVisible ? 'fade-in-up-delay' : 'opacity-0'}`}
            style={{
              textShadow: '0 2px 16px rgba(0,0,0,0.7), 0 1px 8px rgba(0,0,0,0.5)',
              letterSpacing: '0.02em',
            }}
          >
            Premium farm fresh desi cow milk delivered in glass bottles within minutes.
          </p>
          
          {/* Minimalist CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mt-10 sm:mt-12 md:mt-14 ${isVisible ? 'fade-in-up-delay' : 'opacity-0'}`}>
            <button
              onClick={handleWhatsAppOrder}
              className="group relative w-full sm:w-auto sm:min-w-[260px] bg-primary-green hover:bg-secondary-green active:bg-secondary-green text-white px-8 py-4 sm:px-10 sm:py-4.5 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 transform active:scale-[0.98] hover:scale-[1.01] flex items-center justify-center gap-3 touch-manipulation min-h-[48px] shadow-lg hover:shadow-xl overflow-hidden"
              style={{
                boxShadow: '0 10px 30px rgba(31, 61, 43, 0.5), 0 5px 15px rgba(31, 61, 43, 0.3)',
              }}
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.77.966-.944 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span className="whitespace-nowrap">Order Fresh Milk on WhatsApp</span>
            </button>
            
            <button
              onClick={handleLearnMore}
              className="group relative w-full sm:w-auto sm:min-w-[200px] bg-white/5 hover:bg-white/12 active:bg-white/10 backdrop-blur-sm text-white border border-white/30 hover:border-white/50 px-8 py-4 sm:px-10 sm:py-4.5 rounded-full font-medium text-base sm:text-lg transition-all duration-300 transform active:scale-[0.98] hover:scale-[1.01] touch-manipulation min-h-[48px]"
            >
              Learn More
            </button>
          </div>

        </div>
      </div>

      {/* Minimalist Scroll Indicator */}
      <button
        onClick={handleScrollDown}
        className="absolute bottom-8 sm:bottom-10 md:bottom-12 left-1/2 transform -translate-x-1/2 z-10 group touch-manipulation cursor-pointer flex flex-col items-center gap-3"
        aria-label="Scroll to next section"
      >
        <span className="text-xs font-light text-white/70 group-hover:text-white/90 transition-colors tracking-wider uppercase">
          Scroll
        </span>
        <div className="w-[1px] h-12 bg-white/40 group-hover:bg-white/60 transition-all duration-300 relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-6 bg-white/60 group-hover:bg-white/80 animate-bounce transition-colors"></div>
        </div>
      </button>
    </section>
  );
};

export default Hero;
