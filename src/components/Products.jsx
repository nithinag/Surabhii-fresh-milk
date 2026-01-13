import { useState } from 'react';
import { addToCart } from '../utils/cartUtils';

const Products = () => {
  const [quantities, setQuantities] = useState({});

  const products = [
    {
      id: 1,
      name: 'Fresh Cow Milk',
      description: 'Pure organic cow milk, fresh from the farm. Rich in protein and calcium.',
      price: 60,
      image: '🥛',
      available: true
    },
    {
      id: 2,
      name: 'Fresh Curd',
      description: 'Homemade fresh curd, creamy and delicious. Perfect for your daily needs.',
      price: 50,
      image: '🍶',
      available: true
    },
    {
      id: 3,
      name: 'Desi Ghee',
      description: 'Pure desi ghee made from organic milk. Rich in flavor and nutrients.',
      price: 800,
      image: '🫙',
      available: false
    }
  ];

  const handleQuantityChange = (productId, change) => {
    setQuantities(prev => {
      const current = prev[productId] || 0;
      const newQuantity = Math.max(0, current + change);
      return { ...prev, [productId]: newQuantity };
    });
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    addToCart(product, quantity);
    setQuantities(prev => ({ ...prev, [product.id]: 1 }));
    
    const event = new CustomEvent('showToast', {
      detail: { message: `${product.name} added to cart!`, type: 'success' }
    });
    window.dispatchEvent(event);
  };

  return (
    <section id="products" className="py-12 sm:py-16 md:py-24 bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-primary-green mb-3 sm:mb-4">
            Our Products
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-charcoal/70 px-2">
            Premium organic dairy products delivered fresh to your doorstep
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <div className="p-6 sm:p-8 text-center">
                <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">{product.image}</div>
                <h3 className="text-xl sm:text-2xl font-display font-semibold text-primary-green mb-2">
                  {product.name}
                </h3>
                <p className="text-sm sm:text-base text-charcoal/70 mb-3 sm:mb-4">{product.description}</p>
                <div className="text-2xl sm:text-3xl font-bold text-charcoal mb-4 sm:mb-6">
                  ₹{product.price}
                </div>

                {product.available ? (
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-center gap-3 sm:gap-4">
                      <button
                        onClick={() => handleQuantityChange(product.id, -1)}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary-green text-white hover:bg-secondary-green active:bg-secondary-green transition-colors touch-manipulation flex items-center justify-center text-lg sm:text-xl font-bold"
                        disabled={!quantities[product.id] || quantities[product.id] === 0}
                      >
                        -
                      </button>
                      <span className="text-lg sm:text-xl font-semibold w-12 sm:w-14 text-center text-charcoal">
                        {quantities[product.id] || 1}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(product.id, 1)}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary-green text-white hover:bg-secondary-green active:bg-secondary-green transition-colors touch-manipulation flex items-center justify-center text-lg sm:text-xl font-bold"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-primary-green hover:bg-secondary-green active:bg-secondary-green text-white py-3 sm:py-3.5 rounded-lg font-semibold text-sm sm:text-base transition-colors touch-manipulation min-h-[44px]"
                    >
                      Add to Cart
                    </button>
                  </div>
                ) : (
                  <div className="bg-gray-100 text-gray-500 py-3 rounded-lg font-semibold text-sm sm:text-base min-h-[44px] flex items-center justify-center">
                    Coming Soon
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
