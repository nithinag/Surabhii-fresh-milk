const SALES_STORAGE_KEY = 'surabhi_sales';

export const recordSale = (orderData) => {
  try {
    const sales = getAllSales();
    const sale = {
      ...orderData,
      recordedAt: new Date().toISOString(),
      date: new Date().toISOString().split('T')[0]
    };
    
    sales.push(sale);
    localStorage.setItem(SALES_STORAGE_KEY, JSON.stringify(sales));
    return sale;
  } catch (error) {
    console.error('Error recording sale:', error);
    return null;
  }
};

export const getAllSales = () => {
  try {
    const sales = localStorage.getItem(SALES_STORAGE_KEY);
    return sales ? JSON.parse(sales) : [];
  } catch (error) {
    console.error('Error reading sales from localStorage:', error);
    return [];
  }
};

export const calculateDailySales = (date = null) => {
  const sales = getAllSales();
  const targetDate = date || new Date().toISOString().split('T')[0];
  const daySales = sales.filter(sale => sale.date === targetDate);
  
  const totalRevenue = daySales.reduce((sum, sale) => sum + (sale.total || 0), 0);
  const totalOrders = daySales.length;
  const totalItems = daySales.reduce((sum, sale) => {
    return sum + (sale.items ? sale.items.reduce((itemSum, item) => itemSum + item.quantity, 0) : 0);
  }, 0);
  const totalDiscount = daySales.reduce((sum, sale) => sum + (sale.discount || 0), 0);
  
  return {
    date: targetDate,
    totalRevenue,
    totalOrders,
    totalItems,
    totalDiscount,
    averageOrderValue: totalOrders > 0 ? totalRevenue / totalOrders : 0,
    sales: daySales
  };
};

export const calculateMonthlySales = (month, year) => {
  const sales = getAllSales();
  const targetMonth = month || new Date().getMonth() + 1;
  const targetYear = year || new Date().getFullYear();
  
  const monthSales = sales.filter(sale => {
    const saleDate = new Date(sale.date);
    return saleDate.getMonth() + 1 === targetMonth && saleDate.getFullYear() === targetYear;
  });
  
  const totalRevenue = monthSales.reduce((sum, sale) => sum + (sale.total || 0), 0);
  const totalOrders = monthSales.length;
  const totalItems = monthSales.reduce((sum, sale) => {
    return sum + (sale.items ? sale.items.reduce((itemSum, item) => itemSum + item.quantity, 0) : 0);
  }, 0);
  const totalDiscount = monthSales.reduce((sum, sale) => sum + (sale.discount || 0), 0);
  
  const dailyBreakdown = {};
  monthSales.forEach(sale => {
    const day = sale.date;
    if (!dailyBreakdown[day]) {
      dailyBreakdown[day] = { revenue: 0, orders: 0, items: 0 };
    }
    dailyBreakdown[day].revenue += sale.total || 0;
    dailyBreakdown[day].orders += 1;
    dailyBreakdown[day].items += sale.items ? sale.items.reduce((sum, item) => sum + item.quantity, 0) : 0;
  });
  
  return {
    month: targetMonth,
    year: targetYear,
    totalRevenue,
    totalOrders,
    totalItems,
    totalDiscount,
    averageOrderValue: totalOrders > 0 ? totalRevenue / totalOrders : 0,
    dailyBreakdown,
    sales: monthSales
  };
};

export const calculateYearlySales = (year) => {
  const sales = getAllSales();
  const targetYear = year || new Date().getFullYear();
  
  const yearSales = sales.filter(sale => {
    const saleDate = new Date(sale.date);
    return saleDate.getFullYear() === targetYear;
  });
  
  const totalRevenue = yearSales.reduce((sum, sale) => sum + (sale.total || 0), 0);
  const totalOrders = yearSales.length;
  const totalItems = yearSales.reduce((sum, sale) => {
    return sum + (sale.items ? sale.items.reduce((itemSum, item) => itemSum + item.quantity, 0) : 0);
  }, 0);
  const totalDiscount = yearSales.reduce((sum, sale) => sum + (sale.discount || 0), 0);
  
  const monthlyBreakdown = {};
  for (let month = 1; month <= 12; month++) {
    monthlyBreakdown[month] = { revenue: 0, orders: 0, items: 0 };
  }
  
  yearSales.forEach(sale => {
    const saleDate = new Date(sale.date);
    const month = saleDate.getMonth() + 1;
    monthlyBreakdown[month].revenue += sale.total || 0;
    monthlyBreakdown[month].orders += 1;
    monthlyBreakdown[month].items += sale.items ? sale.items.reduce((sum, item) => sum + item.quantity, 0) : 0;
  });
  
  return {
    year: targetYear,
    totalRevenue,
    totalOrders,
    totalItems,
    totalDiscount,
    averageOrderValue: totalOrders > 0 ? totalRevenue / totalOrders : 0,
    monthlyBreakdown,
    sales: yearSales
  };
};

export const generateSalesReport = (type = 'daily') => {
  const now = new Date();
  
  let report;
  if (type === 'daily') {
    report = calculateDailySales();
  } else if (type === 'monthly') {
    report = calculateMonthlySales(now.getMonth() + 1, now.getFullYear());
  } else if (type === 'yearly') {
    report = calculateYearlySales(now.getFullYear());
  }
  
  return {
    type,
    generatedAt: now.toISOString(),
    ...report
  };
};
