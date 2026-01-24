import { useState, useEffect } from 'react';
import Draggable from 'react-draggable';

const TrialPackPopup = ({ onGetStarted }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasSeenTrial, setHasSeenTrial] = useState(false);

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

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('surabhi_trial_seen', 'true');
    setHasSeenTrial(true);
  };

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
    <Draggable handle=".drag-handle">
      <div className="fixed bottom-6 right-6 z-50 w-80 bg-white rounded-xl shadow-2xl border-2 border-soft-gold overflow-hidden">
        <div className="drag-handle bg-gradient-to-r from-primary-green to-secondary-green p-4 cursor-move">
          <div className="flex justify-between items-center">
            <h3 className="text-white font-bold text-lg">🎁 Special Offer!</h3>
            <button
              onClick={handleClose}
              className="text-white hover:text-soft-gold transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
            className="w-full bg-primary-green hover:bg-secondary-green text-white py-3 rounded-lg font-semibold transition-colors"
          >
            Get Started
          </button>
        </div>
      </div>
    </Draggable>
  );
};

export default TrialPackPopup;
