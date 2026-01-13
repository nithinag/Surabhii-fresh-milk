// Loyalty points utility functions

const CUSTOMERS_STORAGE_KEY = 'surabhi_customers';

export const normalizePhoneNumber = (phone) => {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('0')) {
    return digits.substring(1);
  }
  if (digits.startsWith('91') && digits.length === 12) {
    return digits.substring(2);
  }
  if (digits.length === 10) {
    return digits;
  }
  return digits;
};

export const validatePhoneNumber = (phone) => {
  const normalized = normalizePhoneNumber(phone);
  return /^[6-9]\d{9}$/.test(normalized);
};

export const getCustomerByPhone = (phone) => {
  try {
    const normalizedPhone = normalizePhoneNumber(phone);
    const customers = getAllCustomers();
    return customers.find(c => normalizePhoneNumber(c.phone) === normalizedPhone) || null;
  } catch (error) {
    console.error('Error getting customer:', error);
    return null;
  }
};

export const getAllCustomers = () => {
  try {
    const customers = localStorage.getItem(CUSTOMERS_STORAGE_KEY);
    return customers ? JSON.parse(customers) : [];
  } catch (error) {
    console.error('Error reading customers from localStorage:', error);
    return [];
  }
};

export const isFirstTimeCustomer = (phone) => {
  const customer = getCustomerByPhone(phone);
  if (!customer) return true;
  return !customer.orders || customer.orders.length === 0;
};

export const calculateLoyaltyPoints = (orderTotal, isFirstTime = false) => {
  if (isFirstTime) {
    return Math.floor(orderTotal * 0.15);
  } else {
    return Math.floor(orderTotal * 0.05);
  }
};

export const updateCustomerLoyalty = (phone, newPoints, orderData) => {
  try {
    const normalizedPhone = normalizePhoneNumber(phone);
    const customers = getAllCustomers();
    let customer = customers.find(c => normalizePhoneNumber(c.phone) === normalizedPhone);
    
    if (!customer) {
      customer = {
        phone: normalizedPhone,
        loyaltyPoints: 0,
        totalSpent: 0,
        orders: [],
        createdAt: new Date().toISOString()
      };
      customers.push(customer);
    }
    
    customer.loyaltyPoints = (customer.loyaltyPoints || 0) + newPoints;
    customer.totalSpent = (customer.totalSpent || 0) + orderData.total;
    
    if (!customer.orders) {
      customer.orders = [];
    }
    customer.orders.push({
      ...orderData,
      orderDate: new Date().toISOString(),
      pointsEarned: newPoints
    });
    
    customer.lastOrderDate = new Date().toISOString();
    
    localStorage.setItem(CUSTOMERS_STORAGE_KEY, JSON.stringify(customers));
    return customer;
  } catch (error) {
    console.error('Error updating customer loyalty:', error);
    return null;
  }
};

export const getCustomerLoyaltyPoints = (phone) => {
  const customer = getCustomerByPhone(phone);
  return customer ? (customer.loyaltyPoints || 0) : 0;
};

export const getCustomerOrderHistory = (phone) => {
  const customer = getCustomerByPhone(phone);
  return customer ? (customer.orders || []) : [];
};
