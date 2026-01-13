import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { getCustomerByPhone, getCustomerOrderHistory } from './loyaltyUtils';

export const generateMonthlyInvoice = (customerPhone, month, year) => {
  const customer = getCustomerByPhone(customerPhone);
  if (!customer) throw new Error('Customer not found');
  
  const orders = getCustomerOrderHistory(customerPhone);
  const monthOrders = orders.filter(order => {
    const orderDate = new Date(order.orderDate);
    return orderDate.getMonth() === month - 1 && orderDate.getFullYear() === year;
  });
  
  if (monthOrders.length === 0) throw new Error('No orders found for the selected month');
  
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const doc = new jsPDF();
  
  doc.setFontSize(20);
  doc.setTextColor(31, 61, 43);
  doc.text('Surabhii Fresh Milk', 14, 20);
  
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('Premium Organic Dairy', 14, 28);
  doc.text('Freshness You Can Trust', 14, 34);
  
  doc.setFontSize(16);
  doc.text(`Monthly Invoice - ${monthNames[month - 1]} ${year}`, 14, 50);
  
  doc.setFontSize(10);
  doc.text('Customer Details:', 14, 65);
  doc.text(`Phone: +91 ${customer.phone}`, 14, 72);
  doc.text(`Total Orders: ${monthOrders.length}`, 14, 79);
  
  const tableData = monthOrders.map((order, index) => [
    index + 1,
    new Date(order.orderDate).toLocaleDateString('en-IN'),
    order.items.map(item => item.name).join(', '),
    `₹${order.subtotal.toFixed(2)}`,
    `₹${order.discount.toFixed(2)}`,
    `₹${order.total.toFixed(2)}`
  ]);
  
  const totalSubtotal = monthOrders.reduce((sum, order) => sum + order.subtotal, 0);
  const totalDiscount = monthOrders.reduce((sum, order) => sum + order.discount, 0);
  const totalAmount = monthOrders.reduce((sum, order) => sum + order.total, 0);
  const totalPoints = monthOrders.reduce((sum, order) => sum + (order.pointsEarned || 0), 0);
  
  doc.autoTable({
    startY: 90,
    head: [['#', 'Date', 'Items', 'Subtotal', 'Discount', 'Total']],
    body: tableData,
    theme: 'striped',
    headStyles: { fillColor: [31, 61, 43] },
    styles: { fontSize: 9 }
  });
  
  const finalY = doc.lastAutoTable.finalY + 10;
  doc.setFontSize(12);
  doc.text('Summary:', 14, finalY);
  
  doc.setFontSize(10);
  doc.text(`Total Subtotal: ₹${totalSubtotal.toFixed(2)}`, 14, finalY + 8);
  doc.text(`Total Discount: ₹${totalDiscount.toFixed(2)}`, 14, finalY + 15);
  doc.text(`Total Amount: ₹${totalAmount.toFixed(2)}`, 14, finalY + 22);
  doc.text(`Loyalty Points Earned: ${totalPoints}`, 14, finalY + 29);
  
  doc.setFontSize(8);
  doc.setTextColor(128, 128, 128);
  doc.text('Thank you for choosing Surabhii Fresh Milk!', 14, doc.internal.pageSize.height - 20);
  doc.text('For queries, contact: +91 9600642226', 14, doc.internal.pageSize.height - 15);
  
  return doc;
};

export const downloadInvoice = (pdf) => {
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  pdf.save(`Surabhii-Invoice-${month}-${year}.pdf`);
};

export const sendInvoiceViaWhatsApp = (phone, pdfBlob) => {
  const message = `Hello! Your monthly invoice is ready. Please download it from the link below.\n\nFor actual implementation, integrate with WhatsApp Business API.`;
  const whatsappUrl = `https://wa.me/9600642226?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
  console.log('Invoice would be sent via WhatsApp Business API in production');
};
