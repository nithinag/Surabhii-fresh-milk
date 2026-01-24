import { useState, useEffect } from 'react';
import { openWhatsApp } from '../utils/whatsappUtils';
import faqsData from '../data/faqs.json';

const FAQPopup = ({ isOpen, onClose }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] overflow-y-auto">
      {/* Backdrop with blur */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* Modal Container */}
      <div className="relative min-h-screen flex items-start sm:items-center justify-center p-3 sm:p-4 md:p-6 pb-safe pt-16 sm:pt-20">
        <div 
          className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-3xl lg:max-w-4xl max-h-[85vh] sm:max-h-[90vh] overflow-hidden flex flex-col animate-slide-up"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with gradient background */}
          <div className="relative bg-gradient-to-r from-primary-green via-primary-green to-secondary-green p-5 sm:p-6 md:p-8">
            {/* Decorative pattern overlay */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-soft-gold rounded-full blur-2xl"></div>
            </div>
            
            <div className="relative flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="inline-block mb-3 sm:mb-4">
                  <span className="text-xs sm:text-sm font-semibold text-white/90 uppercase tracking-wider bg-white/20 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full">
                    Help Center
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-2 sm:mb-3 leading-tight">
                  Frequently Asked Questions
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-2xl">
                  Everything you need to know about Surabhii Fresh Milk
                </p>
              </div>
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 hover:bg-white/30 active:bg-white/40 text-white transition-all duration-200 flex items-center justify-center touch-manipulation shadow-lg hover:shadow-xl"
                aria-label="Close FAQ popup"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto bg-gradient-to-b from-white to-cream/30">
            <div className="p-4 sm:p-6 md:p-8 space-y-3 sm:space-y-4">
              {faqsData.map((faq, index) => (
                <div
                  key={faq.id}
                  className={`group bg-white rounded-xl sm:rounded-2xl border-2 transition-all duration-300 ${
                    openIndex === index 
                      ? 'border-primary-green shadow-lg shadow-primary-green/10' 
                      : 'border-gray-200 hover:border-primary-green/50 hover:shadow-md'
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-4 sm:px-5 md:px-6 py-4 sm:py-5 text-left flex justify-between items-start gap-4 touch-manipulation min-h-[64px] sm:min-h-[72px] transition-colors"
                  >
                    <span className={`flex-1 font-semibold text-charcoal text-sm sm:text-base md:text-lg leading-relaxed pr-2 ${
                      openIndex === index ? 'text-primary-green' : ''
                    }`}>
                      {faq.question}
                    </span>
                    <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      openIndex === index 
                        ? 'bg-primary-green text-white rotate-180' 
                        : 'bg-cream text-primary-green group-hover:bg-primary-green/10'
                    }`}>
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  
                  {openIndex === index && (
                    <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6 animate-fade-in">
                      <div className="pt-2 border-t border-gray-100">
                        <p className="pt-4 text-sm sm:text-base md:text-lg text-charcoal/80 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer with CTA */}
          <div className="border-t-2 border-gray-200 bg-gradient-to-r from-cream to-white p-5 sm:p-6 md:p-8 pb-safe">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
              <div className="text-center sm:text-left">
                <p className="text-sm sm:text-base md:text-lg font-semibold text-charcoal mb-1">
                  Still have questions?
                </p>
                <p className="text-xs sm:text-sm text-charcoal/70">
                  We're here to help! Contact us anytime.
                </p>
              </div>
              <button
                type="button"
                onClick={() => openWhatsApp('Hello Surabhii Fresh Milk! I have a question about your services.')}
                className="group bg-primary-green hover:bg-secondary-green active:bg-secondary-green text-white px-6 sm:px-8 md:px-10 py-3.5 sm:py-4 md:py-5 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base md:text-lg transition-all duration-200 flex items-center gap-2.5 sm:gap-3 whitespace-nowrap touch-manipulation min-h-[48px] sm:min-h-[52px] shadow-lg hover:shadow-xl active:shadow-md transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.77.966-.944 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span>Contact Us on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPopup;
