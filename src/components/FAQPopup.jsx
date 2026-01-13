import { useState, useEffect } from 'react';
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
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 pb-safe">
        <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-slide-up">
          {/* Header */}
          <div className="flex items-center justify-between p-5 sm:p-6 border-b-2 border-gray-200 bg-cream">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-green mb-2">
                Frequently Asked Questions
              </h2>
              <p className="text-charcoal/70 text-sm md:text-base">
                Everything you need to know about Surabhii Fresh Milk
              </p>
            </div>
            <button
              onClick={onClose}
              className="ml-4 p-2.5 sm:p-2 text-charcoal hover:text-primary-green hover:bg-white rounded-xl transition-colors flex-shrink-0 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Close"
            >
              <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6">
            <div className="space-y-3 sm:space-y-4">
              {faqsData.map((faq, index) => (
                <div
                  key={faq.id}
                  className="border-2 border-gray-200 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-lg"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-5 sm:px-6 py-4 sm:py-5 text-left bg-cream hover:bg-cream/80 active:bg-cream/70 transition-colors flex justify-between items-center gap-4 touch-manipulation min-h-[56px]"
                  >
                    <span className="font-semibold text-charcoal text-sm md:text-base pr-4">
                      {faq.question}
                    </span>
                    <svg
                      className={`w-5 h-5 text-primary-green flex-shrink-0 transition-transform duration-200 ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openIndex === index && (
                    <div className="px-5 sm:px-6 py-4 sm:py-5 bg-white text-charcoal/80 leading-relaxed text-sm sm:text-base animate-fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t-2 border-gray-200 p-5 sm:p-6 bg-cream pb-safe">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm sm:text-base text-charcoal/70 text-center sm:text-left">
                Still have questions? Contact us via WhatsApp!
              </p>
              <a
                href="https://wa.me/9600642226"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-green hover:bg-secondary-green active:bg-secondary-green text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-200 flex items-center gap-2 whitespace-nowrap touch-manipulation min-h-[44px] shadow-lg hover:shadow-xl active:shadow-md transform active:scale-[0.98]"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.77.966-.944 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPopup;
