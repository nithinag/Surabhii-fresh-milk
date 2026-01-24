import { useEffect, useRef, useState } from 'react';
import { addToCart, getCart, removeFromCart, updateQuantity } from '../utils/cartUtils';

const Products = () => {
  const sectionRef = useRef(null);
  const [cartItems, setCartItems] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const products = [
    {
      id: 1,
      name: 'Fresh Cow Milk',
      description: 'Pure fresh cow milk, straight from the farm. Rich in protein and calcium.',
      price: 60,
      icon: (
        <svg className="w-16 h-16 sm:w-20 sm:h-20" fill="none" viewBox="0 0 100 100">
          <path d="M50 15C40 15 32 20 30 28L25 60C25 70 33 78 43 78H57C67 78 75 70 75 60L70 28C68 20 60 15 50 15Z" fill="#4A90E2" opacity="0.2"/>
          <path d="M50 20C42 20 35 24 33 30L28 58C28 66 34 72 42 72H58C66 72 72 66 72 58L67 30C65 24 58 20 50 20Z" fill="#4A90E2"/>
          <path d="M50 25C45 25 40 27 38 31L35 55C35 60 39 64 44 64H56C61 64 65 60 65 55L62 31C60 27 55 25 50 25Z" fill="#E8F4FD"/>
          <path d="M50 30L50 75M45 30L45 75M55 30L55 75" stroke="#2E5C8A" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="50" cy="40" r="3" fill="#2E5C8A"/>
        </svg>
      ),
      tags: ['Glass Bottled', 'Farm Fresh', 'No Preservatives'],
      available: true,
      catalogProductId: '123456789012345' // Replace with actual WhatsApp Catalog Product ID
    },
    {
      id: 2,
      name: 'Fresh Curd',
      description: 'Homemade fresh curd, creamy and delicious. Perfect for your daily needs.',
      price: 50,
      icon: (
        <svg className="w-16 h-16 sm:w-20 sm:h-20" fill="none" viewBox="0 0 100 100">
          <path d="M50 20C40 20 32 25 30 32L28 70C28 78 34 84 42 84H58C66 84 72 78 72 70L70 32C68 25 60 20 50 20Z" fill="#4A90E2" opacity="0.2"/>
          <path d="M50 25C42 25 35 29 33 35L31 68C31 74 36 79 42 79H58C64 79 69 74 69 68L67 35C65 29 58 25 50 25Z" fill="#4A90E2"/>
          <path d="M50 30C45 30 40 32 38 36L36 63C36 67 39 70 43 70H57C61 70 64 67 64 63L62 36C60 32 55 30 50 30Z" fill="#E8F4FD"/>
          <path d="M50 35C48 35 46 36 45 37L44 58C44 60 45 61 47 61H53C55 61 56 60 56 58L55 37C54 36 52 35 50 35Z" fill="#2E5C8A" opacity="0.3"/>
          <path d="M45 45L50 50L55 45" stroke="#2E5C8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      tags: ['Glass Bottled', 'Farm Fresh', 'No Preservatives'],
      available: true,
      catalogProductId: '123456789012346' // Replace with actual WhatsApp Catalog Product ID
    },
    {
      id: 3,
      name: 'Desi Ghee',
      description: 'Pure desi ghee made from fresh milk. Rich in flavor and nutrients.',
      price: 800,
      icon: (
        <svg className="w-16 h-16 sm:w-20 sm:h-20" fill="none" viewBox="0 0 100 100">
          <path d="M50 15C40 15 32 20 30 28L25 75C25 85 33 93 43 93H57C67 93 75 85 75 75L70 28C68 20 60 15 50 15Z" fill="#FFA500" opacity="0.2"/>
          <path d="M50 20C42 20 35 24 33 30L28 72C28 80 34 86 42 86H58C66 86 72 80 72 72L67 30C65 24 58 20 50 20Z" fill="#FFA500"/>
          <path d="M50 25C45 25 40 27 38 31L35 68C35 73 39 77 44 77H56C61 77 65 73 65 68L62 31C60 27 55 25 50 25Z" fill="#FFE5B4"/>
          <path d="M50 30L50 70M45 30L45 70M55 30L55 70" stroke="#CC7700" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="50" cy="50" r="4" fill="#CC7700" opacity="0.5"/>
        </svg>
      ),
      tags: ['Farm Fresh', 'No Preservatives'],
      available: false,
      catalogProductId: '123456789012347' // Replace with actual WhatsApp Catalog Product ID
    }
  ];

  useEffect(() => {
    setCartItems(getCart());
    const handleCartUpdated = (event) => {
      const cart = event?.detail?.cart || getCart();
      setCartItems(cart);
    };
    window.addEventListener('cartUpdated', handleCartUpdated);
    handleCartUpdated({ detail: { cart: getCart() } });
    return () => window.removeEventListener('cartUpdated', handleCartUpdated);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleAddToCart = (product) => {
    try {
      addToCart(product, 1);
      // Force update cart items immediately
      setCartItems(getCart());
      
      const event = new CustomEvent('showToast', {
        detail: { message: `${product.name} added to cart!`, type: 'success' }
      });
      window.dispatchEvent(event);
    } catch (error) {
      console.error('Error adding to cart:', error);
      const event = new CustomEvent('showToast', {
        detail: { message: 'Failed to add item to cart. Please try again.', type: 'error' }
      });
      window.dispatchEvent(event);
    }
  };

  const getCartQuantity = (productId) => {
    const cartItem = cartItems.find(item => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleIncrease = (product) => {
    try {
      const quantity = getCartQuantity(product.id);
      if (quantity <= 0) {
        addToCart(product, 1);
      } else {
        updateQuantity(product.id, quantity + 1);
      }
      // Force update cart items immediately
      setCartItems(getCart());
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const handleDecrease = (product) => {
    try {
      const quantity = getCartQuantity(product.id);
      if (quantity <= 1) {
        removeFromCart(product.id);
      } else {
        updateQuantity(product.id, quantity - 1);
      }
      // Force update cart items immediately
      setCartItems(getCart());
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <section
      id="products"
      ref={sectionRef}
      className="scroll-mt-0 md:scroll-mt-0 min-h-screen flex items-center bg-cream pt-4 pb-12 md:pt-8 md:pb-16 lg:pt-10 lg:pb-20"
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-12">
        <div className={`rounded-[32px] border border-white/70 bg-white/60 backdrop-blur-md shadow-2xl px-6 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="text-center mb-8">
            <button
              onClick={() => {
                const element = document.getElementById('products');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="inline-flex items-center justify-center text-xs font-sans font-semibold text-primary-green uppercase tracking-[0.3em] bg-white/70 border border-primary-green/30 hover:border-primary-green/60 hover:text-primary-green/90 px-5 py-2 rounded-full transition-all duration-200 cursor-pointer shadow-sm"
            >
              Our Products
            </button>
            <div className="mx-auto mt-4 h-px w-24 bg-primary-green/30"></div>
            <p className="text-sm sm:text-base text-charcoal/70 mt-4 max-w-2xl mx-auto">
              Premium fresh and pure dairy products delivered to your doorstep.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {products.map((product, index) => (
              <div
                key={product.id}
                className={`group rounded-3xl bg-white/80 backdrop-blur-md border border-white/70 shadow-lg hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-1 hover:scale-[1.02] ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${120 + index * 90}ms` }}
              >
                <div className="p-6 sm:p-7 text-center">
                  <div className="flex justify-center items-center mb-4 group-hover:scale-105 transition-transform duration-300 text-primary-green">
                    {product.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-sans font-semibold text-primary-green mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm sm:text-base text-charcoal/70 mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] sm:text-xs uppercase tracking-widest text-primary-green/80 bg-cream/70 border border-primary-green/20 rounded-full px-3 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="text-2xl sm:text-3xl font-semibold text-charcoal mb-5">
                    ₹{product.price}
                  </div>

                  {product.available ? (
                    <div className="space-y-4">
                      {getCartQuantity(product.id) > 0 ? (
                        <div className="flex items-center justify-center gap-4">
                          <button
                            onClick={() => handleDecrease(product)}
                            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-primary-green text-white hover:bg-secondary-green active:bg-secondary-green transition-colors touch-manipulation flex items-center justify-center text-lg font-semibold shadow-soft"
                          >
                            -
                          </button>
                          <span className="text-lg sm:text-xl font-semibold w-10 sm:w-12 text-center text-charcoal">
                            {getCartQuantity(product.id)}
                          </span>
                          <button
                            onClick={() => handleIncrease(product)}
                            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-primary-green text-white hover:bg-secondary-green active:bg-secondary-green transition-colors touch-manipulation flex items-center justify-center text-lg font-semibold shadow-soft"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="w-full py-3.5 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 touch-manipulation min-h-[44px] bg-primary-green text-white hover:bg-secondary-green active:bg-secondary-green shadow-soft"
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="bg-gray-100 text-gray-500 py-3 rounded-full font-semibold text-xs sm:text-sm min-h-[44px] flex items-center justify-center">
                      Coming Soon
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {cartItems.length > 0 && (
        <div className="md:hidden fixed inset-x-0 bottom-0 z-[45] pb-20">
          <div className="mx-4 mb-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white/70 shadow-2xl px-4 py-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-widest text-primary-green/80">Cart Summary</p>
              <p className="text-sm font-semibold text-charcoal">
                {totalItems} item{totalItems > 1 ? 's' : ''} • ₹{subtotal}
              </p>
            </div>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('openCart'))}
              className="bg-primary-green hover:bg-secondary-green text-white px-4 py-2.5 rounded-full text-sm font-semibold min-h-[44px] shadow-md"
            >
              View Cart
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Products;
