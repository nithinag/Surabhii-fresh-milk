import { useState, useEffect, useCallback } from 'react';
import Draggable from 'react-draggable';

const TrialPackPopup = ({ onGetStarted }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasSeenTrial, setHasSeenTrial] = useState(false);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    localStorage.setItem('surabhi_trial_seen', 'true');
    setHasSeenTrial(true);
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

  // Close on Escape key and prevent body scroll
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isVisible) {
        handleClose();
      }
    };
    if (isVisible) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
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
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      ></div>
      
      {/* Popup Card */}
      <Draggable 
        handle=".drag-handle" 
        disabled={typeof window !== 'undefined' && window.innerWidth < 768}
        bounds="parent"
      >
        <div className="relative z-10 w-full max-w-sm bg-white rounded-xl shadow-2xl border-2 border-soft-gold overflow-hidden">
          <div className="drag-handle bg-gradient-to-r from-primary-green to-secondary-green p-4 cursor-move">
            <div className="flex justify-between items-center">
              <h3 className="text-white font-bold text-lg">🎁 Special Offer!</h3>
              <button
                onClick={handleClose}
                className="text-white hover:text-soft-gold transition-colors touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-white/20 active:bg-white/30"
                aria-label="Close popup"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

        <div className="p-6">
          <div className="text-center mb-4">
            <div className="text-5xl mb-2">🥛</div>
            <h4 className="text-xl font-bold text-primary-green mb-2">
              3-Day Trial Pack
            </h4>
            <p className="text-charcoal/70 text-sm mb-4">
              Try our premium fresh and pure milk for 3 days with 20% discount!
            </p>
          </div>

          <ul className="space-y-2 mb-6 text-sm text-charcoal/80">
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-primary-green" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              20% discount (first-time only)
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-primary-green" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              3-day trial period
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-primary-green" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              No commitment required
            </li>
          </ul>

          <button
            onClick={handleGetStarted}
            className="w-full bg-primary-green hover:bg-secondary-green text-white py-3 rounded-lg font-semibold transition-colors touch-manipulation min-h-[44px]"
          >
            Get Started
          </button>
        </div>
      </div>
      </Draggable>
    </div>
  );
};

export default TrialPackPopup;
