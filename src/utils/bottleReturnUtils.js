const BOTTLE_RETURNS_STORAGE_KEY = 'surabhi_bottle_returns';

export const calculateReturnDate = (deliveryDate, membershipType) => {
  const delivery = new Date(deliveryDate);
  let returnDate = new Date(delivery);
  
  switch (membershipType) {
    case 'weekly': returnDate.setDate(returnDate.getDate() + 7); break;
    case 'monthly': returnDate.setMonth(returnDate.getMonth() + 1); break;
    case 'yearly': returnDate.setFullYear(returnDate.getFullYear() + 1); break;
    case 'trial': returnDate.setDate(returnDate.getDate() + 3); break;
    default: returnDate.setDate(returnDate.getDate() + 7);
  }
  
  return returnDate.toISOString();
};

export const getReturnSchedule = (customerPhone) => {
  try {
    const returns = getAllReturns();
    return returns.filter(r => r.customerPhone === customerPhone);
  } catch (error) {
    console.error('Error getting return schedule:', error);
    return [];
  }
};

export const getAllReturns = () => {
  try {
    const returns = localStorage.getItem(BOTTLE_RETURNS_STORAGE_KEY);
    return returns ? JSON.parse(returns) : [];
  } catch (error) {
    console.error('Error reading returns from localStorage:', error);
    return [];
  }
};

export const createReturnSchedule = (orderId, customerPhone, deliveryDate, membershipType) => {
  try {
    const returns = getAllReturns();
    const returnDate = calculateReturnDate(deliveryDate, membershipType);
    
    const returnSchedule = {
      orderId, customerPhone, deliveryDate, returnDate, membershipType,
      status: 'pending', createdAt: new Date().toISOString()
    };
    
    returns.push(returnSchedule);
    localStorage.setItem(BOTTLE_RETURNS_STORAGE_KEY, JSON.stringify(returns));
    return returnSchedule;
  } catch (error) {
    console.error('Error creating return schedule:', error);
    return null;
  }
};

export const updateReturnStatus = (orderId, status) => {
  try {
    const returns = getAllReturns();
    const returnIndex = returns.findIndex(r => r.orderId === orderId);
    
    if (returnIndex >= 0) {
      returns[returnIndex].status = status;
      returns[returnIndex].updatedAt = new Date().toISOString();
      localStorage.setItem(BOTTLE_RETURNS_STORAGE_KEY, JSON.stringify(returns));
      return returns[returnIndex];
    }
    
    return null;
  } catch (error) {
    console.error('Error updating return status:', error);
    return null;
  }
};

export const checkOverdueReturns = () => {
  const returns = getAllReturns();
  const today = new Date();
  
  return returns.filter(r => {
    if (r.status !== 'pending') return false;
    const returnDate = new Date(r.returnDate);
    return returnDate < today;
  });
};
