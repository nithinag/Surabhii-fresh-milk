import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  // Load language from LocalStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('site_language');
    if (savedLanguage && ['en', 'kn', 'hi'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to LocalStorage when it changes
  const changeLanguage = (lang) => {
    if (['en', 'kn', 'hi'].includes(lang)) {
      setLanguage(lang);
      localStorage.setItem('site_language', lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
