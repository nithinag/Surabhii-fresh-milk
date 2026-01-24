import { getMembershipPeriod, getMembershipStatus, MembershipStatus } from './membershipUtils';
import { appendDeliveryToSheet } from '../services/googleSheetsService';

const DELIVERY_STORAGE_KEY = 'surabhi_deliveries';

const readDeliveries = () => {
  try {
    const stored = localStorage.getItem(DELIVERY_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const writeDeliveries = (deliveries) => {
  try {
    localStorage.setItem(DELIVERY_STORAGE_KEY, JSON.stringify(deliveries));
  } catch {
    // Ignore storage failures
  }
};

const createDeliveryId = () => {
  const stamp = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
  return `DLV-${stamp}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
};

const getDefaultDeliveryDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date;
};

export const createDeliverySchedule = (order, options = {}) => {
  const membershipStatus = getMembershipStatus();
  const { end } = getMembershipPeriod();
  const deliveryDate = options.deliveryDate || getDefaultDeliveryDate();
  const deliverySlot = options.deliverySlot || 'Morning (6:00–8:00 AM)';

  const isMember = membershipStatus === MembershipStatus.ACTIVE;
  const delivery = {
    id: createDeliveryId(),
    createdAt: new Date().toISOString(),
    orderId: order.invoiceId,
    phone: order.phone || null,
    items: order.items,
    type: isMember ? 'RECURRING' : 'ONE_TIME',
    startDate: deliveryDate.toISOString(),
    endDate: isMember && end ? end.toISOString() : null,
    slot: deliverySlot,
    notes: isMember ? 'Daily recurring deliveries for active members.' : 'One-time scheduled delivery.'
  };

  const deliveries = readDeliveries();
  deliveries.push(delivery);
  writeDeliveries(deliveries);
  appendDeliveryToSheet(delivery);
  return delivery;
};

export const formatDeliverySummary = (delivery) => {
  const date = new Date(delivery.startDate).toLocaleDateString('en-IN');
  return `Delivery: ${delivery.type === 'RECURRING' ? 'Daily (Member)' : 'One-time'}\nDate: ${date}\nSlot: ${delivery.slot}`;
};
