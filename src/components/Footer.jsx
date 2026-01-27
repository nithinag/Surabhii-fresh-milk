import { openWhatsApp } from '../utils/whatsappUtils';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../i18n/translations';

const Footer = ({ onFAQsClick }) => {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFAQsClick = () => {
    if (onFAQsClick) {
      onFAQsClick();
    } else {
      scrollToSection('faqs');
    }
  };

  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-12 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
          
          {/* A. Brand Section */}
          <div className="text-center sm:text-left">
            <div className="mb-4">
              <button
                onClick={() => scrollToSection('home')}
                className="inline-flex items-center gap-2.5 sm:gap-3 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary-green focus:ring-offset-2 focus:ring-offset-charcoal rounded group mx-auto sm:mx-0"
                aria-label="Go to homepage"
              >
                <img 
                  src="/logo.svg" 
                  alt="Surabhii Fresh Milk - Premium Surabhii Cow Milk" 
                  className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto max-w-[140px] sm:max-w-[180px] md:max-w-[220px] lg:max-w-[240px] object-contain transition-opacity group-hover:opacity-90 flex-shrink-0"
                />
                <span className="text-base sm:text-lg font-sans font-semibold text-white uppercase tracking-tight whitespace-nowrap">
                  SURABHII FRESH MILK
                </span>
              </button>
            </div>
            
            <p className="text-white/70 leading-relaxed text-sm font-sans mb-5">
              {t.footer.description}
            </p>

            {/* Social Icons - Moved to brand section */}
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <a 
                href="https://www.instagram.com/surabhiifreshmilk?igsh=MXhtcG51cHJud3cwbQ==" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/15 flex items-center justify-center transition-all duration-200 group touch-manipulation"
                aria-label="Instagram"
              >
                <svg className="w-4.5 h-4.5 text-white group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              
              <a 
                href="https://www.facebook.com/share/1CB4asZgLq/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/15 flex items-center justify-center transition-all duration-200 group touch-manipulation"
                aria-label="Facebook"
              >
                <svg className="w-4.5 h-4.5 text-white group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              
              <a 
                href="https://www.youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/15 flex items-center justify-center transition-all duration-200 group touch-manipulation"
                aria-label="YouTube"
              >
                <svg className="w-4.5 h-4.5 text-white group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              
              <a 
                href="https://www.linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/15 flex items-center justify-center transition-all duration-200 group touch-manipulation"
                aria-label="LinkedIn"
              >
                <svg className="w-4.5 h-4.5 text-white group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* B. Quick Links */}
          <div>
            <h4 className="text-base sm:text-lg font-sans font-semibold mb-3 text-white">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-1.5 text-white/70 text-sm font-sans">
              <li>
                <button 
                  onClick={() => scrollToSection('home')} 
                  className="hover:text-white transition-colors duration-200 touch-manipulation py-0.5 w-full text-left"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')} 
                  className="hover:text-white transition-colors duration-200 touch-manipulation py-0.5 w-full text-left"
                >
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('products')} 
                  className="hover:text-white transition-colors duration-200 touch-manipulation py-0.5 w-full text-left"
                >
                  {t.nav.products}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('memberships')} 
                  className="hover:text-white transition-colors duration-200 touch-manipulation py-0.5 w-full text-left"
                >
                  {t.nav.memberships}
                </button>
              </li>
              <li>
                <button 
                  onClick={handleFAQsClick} 
                  className="hover:text-white transition-colors duration-200 touch-manipulation py-0.5 w-full text-left"
                >
                  {t.footer.faqs}
                </button>
              </li>
            </ul>
          </div>

          {/* C. Contact */}
          <div>
            <h4 className="text-base sm:text-lg font-sans font-semibold mb-3 text-white">
              {t.footer.contact}
            </h4>
            <ul className="space-y-1.5 text-white/70 text-sm font-sans">
              <li>
                <button
                  type="button"
                  onClick={() => openWhatsApp("Hello Surabhii Fresh Milk! I need help with an order or delivery.")}
                  className="hover:text-white transition-colors duration-200 touch-manipulation py-0.5 w-full text-left flex items-center gap-2"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.77.966-.944 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span>{t.footer.whatsappSupport}</span>
                </button>
              </li>
              
              <li>
                <a 
                  href="tel:+917026769669" 
                  className="hover:text-white transition-colors duration-200 touch-manipulation py-0.5 flex items-center gap-2"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+91 70267 69669</span>
                </a>
              </li>
              
              <li className="text-white/60 flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{t.footer.location}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar - Minimal */}
        <div className="border-t border-white/8 pt-6 mt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-white/50 text-xs text-center md:text-left font-sans">
              {t.footer.developedBy}{' '}
              <a 
                href="https://www.linkedin.com/in/nithinnagabushanam6611" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/70 hover:text-primary-green transition-colors font-medium"
              >
                NITHIN NAGABUSHANAM
              </a>
            </p>
            <p className="text-white/50 text-xs text-center md:text-right font-sans">
              {t.footer.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
