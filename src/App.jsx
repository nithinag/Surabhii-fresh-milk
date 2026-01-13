import { useState, useEffect } from 'react';
import Home from './pages/Home';
import { getCart } from './utils/cartUtils';
import { DarkModeProvider } from './contexts/DarkModeContext';
import './index.css';

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Initialize cart from localStorage
    const savedCart = getCart();
    setCart(savedCart);

    // Listen for storage changes (if needed for multi-tab sync)
    const handleStorageChange = () => {
      setCart(getCart());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <DarkModeProvider>
      <div className="App">
        <Home />
      </div>
    </DarkModeProvider>
  );
}

export default App;
