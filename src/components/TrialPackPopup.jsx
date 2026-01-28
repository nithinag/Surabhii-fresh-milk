import { useState, useEffect, useCallback } from 'react';

const TrialPackPopup = ({ onGetStarted }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasSeenTrial, setHasSeenTrial] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      localStorage.setItem('surabhi_trial_seen', 'true');
      setHasSeenTrial(true);
    }, 300);
  }, []);

  useEffect(() => {
    const seen = localStorage.getItem('surabhi_trial_seen');
    if (!seen) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setHasSeenTrial(true);
    }
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isVisible) {
        handleClose();
      }
    };
    if (isVisible) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isVisible, handleClose]);

  const handleGetStarted = () => {
    onGetStarted();
    handleClose();
    const element = document.getElementById('memberships');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isVisible || hasSeenTrial) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 pointer-events-none">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 pointer-events-auto ${
          isClosing ? 'opacity-0' : 'opacity-100'
        }`}
        onClick={handleClose}
        aria-hidden="true"
      ></div>
      
      {/* Compact Popup Card */}
      <div 
        className={`relative z-10 w-full max-w-[280px] bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] overflow-hidden pointer-events-auto transform transition-all duration-300 ${
          isClosing 
            ? 'opacity-0 scale-95 translate-y-4' 
            : 'opacity-100 scale-100 translate-y-0'
        }`}
        style={{
          animation: !isClosing ? 'slideInBounce 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none'
        }}
      >
        {/* Compact Header */}
        <div className="bg-gradient-to-r from-primary-green to-secondary-green px-4 py-2.5 flex justify-between items-center">
          <span className="text-white text-sm font-semibold">🎁 Special Offer</span>
          <button
            onClick={handleClose}
            className="text-white/90 hover:text-white transition-colors touch-manipulation w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/20 active:bg-white/30"
            aria-label="Close popup"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Compact Content */}
        <div className="p-4">
          <div className="text-center mb-3">
            <div 
              className="text-3xl mb-2 inline-block"
              style={{
                animation: 'bounce 2s infinite'
              }}
            >
              🥛
            </div>
            <h4 className="text-base font-bold text-primary-green mb-1">
              3-Day Trial Pack
            </h4>
            <p className="text-xs text-charcoal/60 leading-relaxed">
              20% off • 3 days • No commitment
            </p>
          </div>

          <button
            onClick={handleGetStarted}
            className="w-full bg-primary-green hover:bg-secondary-green text-white py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 touch-manipulation min-h-[40px] shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
            style={{
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
            }}
          >
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideInBounce {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          50% {
            transform: scale(1.05) translateY(-5px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(31, 61, 43, 0.4);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(31, 61, 43, 0);
          }
        }
      `}</style>
    </div>
  );
};

export default TrialPackPopup;
