import { getCustomerByPhone } from './loyaltyUtils';

const TIER_THRESHOLDS = {
  bronze: { minOrders: 5, minSpent: 1000, minPoints: 50 },
  silver: { minOrders: 15, minSpent: 3000, minPoints: 150 },
  gold: { minOrders: 30, minSpent: 6000, minPoints: 300 }
};

export const calculateCustomerTier = (customerPhone) => {
  const customer = getCustomerByPhone(customerPhone);
  if (!customer) return 'none';
  
  const orders = customer.orders || [];
  const totalSpent = customer.totalSpent || 0;
  const points = customer.loyaltyPoints || 0;
  
  if (orders.length >= TIER_THRESHOLDS.gold.minOrders && totalSpent >= TIER_THRESHOLDS.gold.minSpent && points >= TIER_THRESHOLDS.gold.minPoints) {
    return 'gold';
  }
  if (orders.length >= TIER_THRESHOLDS.silver.minOrders && totalSpent >= TIER_THRESHOLDS.silver.minSpent && points >= TIER_THRESHOLDS.silver.minPoints) {
    return 'silver';
  }
  if (orders.length >= TIER_THRESHOLDS.bronze.minOrders && totalSpent >= TIER_THRESHOLDS.bronze.minSpent && points >= TIER_THRESHOLDS.bronze.minPoints) {
    return 'bronze';
  }
  return 'none';
};

export const getTierBenefits = (tier) => {
  const benefits = {
    none: { name: 'Regular', discount: 0, priorityDelivery: false, exclusiveProducts: false, dedicatedSupport: false, description: 'Start ordering to unlock premium benefits!' },
    bronze: { name: 'Bronze', discount: 2, priorityDelivery: false, exclusiveProducts: false, dedicatedSupport: false, description: '2% extra discount on all orders' },
    silver: { name: 'Silver', discount: 5, priorityDelivery: true, exclusiveProducts: true, dedicatedSupport: false, description: '5% extra discount, priority delivery, exclusive products' },
    gold: { name: 'Gold', discount: 10, priorityDelivery: true, exclusiveProducts: true, dedicatedSupport: true, description: '10% extra discount, priority delivery, exclusive products, dedicated support' }
  };
  return benefits[tier] || benefits.none;
};

export const getTierProgress = (customerPhone) => {
  const customer = getCustomerByPhone(customerPhone);
  if (!customer) {
    return { currentTier: 'none', nextTier: 'bronze', progress: { orders: 0, spent: 0, points: 0 }, requirements: TIER_THRESHOLDS.bronze };
  }
  
  const currentTier = calculateCustomerTier(customerPhone);
  const orders = customer.orders || [];
  const totalSpent = customer.totalSpent || 0;
  const points = customer.loyaltyPoints || 0;
  
  let nextTier = 'bronze';
  let requirements = TIER_THRESHOLDS.bronze;
  
  if (currentTier === 'none') {
    nextTier = 'bronze';
    requirements = TIER_THRESHOLDS.bronze;
  } else if (currentTier === 'bronze') {
    nextTier = 'silver';
    requirements = TIER_THRESHOLDS.silver;
  } else if (currentTier === 'silver') {
    nextTier = 'gold';
    requirements = TIER_THRESHOLDS.gold;
  } else {
    return { currentTier: 'gold', nextTier: null, progress: { orders: orders.length, spent: totalSpent, points: points }, requirements: null };
  }
  
  return { currentTier, nextTier, progress: { orders: orders.length, spent: totalSpent, points: points }, requirements };
};

export const getTierColor = (tier) => {
  const colors = { none: 'text-gray-500', bronze: 'text-amber-600', silver: 'text-gray-400', gold: 'text-soft-gold' };
  return colors[tier] || colors.none;
};

export const getTierBgColor = (tier) => {
  const colors = { none: 'bg-gray-100', bronze: 'bg-amber-50', silver: 'bg-gray-100', gold: 'bg-soft-gold/10' };
  return colors[tier] || colors.none;
};
