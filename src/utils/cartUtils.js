// Cart utility functions for managing shopping cart in localStorage

const CART_STORAGE_KEY = 'surabhi_cart';

export const addToCart = (product, quantity = 1) => {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(item => item.id === product.id);
  
  if (existingItemIndex >= 0) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({
      ...product,
      quantity: quantity
    });
  }
  
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  return cart;
};

export const removeFromCart = (productId) => {
  const cart = getCart();
  const updatedCart = cart.filter(item => item.id !== productId);
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
  return updatedCart;
};

export const updateCartItemQuantity = (productId, quantity) => {
  const cart = getCart();
  const itemIndex = cart.findIndex(item => item.id === productId);
  
  if (itemIndex >= 0) {
    if (quantity <= 0) {
      return removeFromCart(productId);
    }
    cart[itemIndex].quantity = quantity;
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }
  
  return cart;
};

export const getCart = () => {
  try {
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error('Error reading cart from localStorage:', error);
    return [];
  }
};

export const getCartItemCount = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
};

export const clearCart = () => {
  localStorage.removeItem(CART_STORAGE_KEY);
};

export const getCartTotal = (cartItems, selectedMembership = 'none') => {
  const subtotal = cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
  
  // Membership discounts
  let discount = 0;
  if (selectedMembership === 'weekly') {
    discount = subtotal * 0.05; // 5% discount
  } else if (selectedMembership === 'monthly') {
    discount = subtotal * 0.10; // 10% discount
  } else if (selectedMembership === 'yearly') {
    discount = subtotal * 0.15; // 15% discount
  } else if (selectedMembership === 'trial') {
    discount = subtotal * 0.20; // 20% discount for trial pack
  }
  
  return {
    subtotal,
    discount,
    total: subtotal - discount
  };
};
