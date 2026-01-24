import { appendInvoiceToSheet } from '../services/googleSheetsService';
import { getMembershipStatus } from './membershipUtils';

const INVOICE_STORAGE_KEY = 'surabhi_invoices';

const readInvoices = () => {
  try {
    const stored = localStorage.getItem(INVOICE_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const writeInvoices = (invoices) => {
  try {
    localStorage.setItem(INVOICE_STORAGE_KEY, JSON.stringify(invoices));
  } catch {
    // Ignore storage failures
  }
};

export const generateInvoiceId = () => {
  const date = new Date();
  const stamp = date.toISOString().slice(0, 10).replace(/-/g, '');
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `INV-${stamp}-${rand}`;
};

export const createInvoiceRecord = ({ invoiceId, phone, items, subtotal, discount, total }) => {
  return {
    invoiceId,
    phone: phone || null,
    items,
    subtotal,
    discount,
    total,
    membershipStatus: getMembershipStatus(),
    createdAt: new Date().toISOString()
  };
};

export const saveInvoiceRecord = (invoice) => {
  const invoices = readInvoices();
  invoices.push(invoice);
  writeInvoices(invoices);
  appendInvoiceToSheet(invoice);
};

export const formatInvoiceSummary = (invoice) => {
  return `Invoice ID: ${invoice.invoiceId}\nSubtotal: ₹${invoice.subtotal}\nDiscount: ₹${invoice.discount}\nTotal: ₹${invoice.total}`;
};
