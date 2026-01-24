export const MembershipStatus = {
  NONE: 'NONE',
  INITIATED: 'INITIATED',
  ACTIVE: 'ACTIVE',
  EXPIRED: 'EXPIRED'
};

const MEMBERSHIP_STATUS_KEY = 'membershipStatus';
const MEMBERSHIP_START_KEY = 'membershipStart';
const MEMBERSHIP_END_KEY = 'membershipEnd';

const safeGet = (key) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const safeSet = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Ignore storage failures (private mode, blocked storage, etc.)
  }
};

const parseDate = (value) => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

export const getMembershipStatus = () => {
  return checkAndUpdateMembershipStatus();
};

export const setMembershipStatus = (status) => {
  safeSet(MEMBERSHIP_STATUS_KEY, status);
};

export const setMembershipPeriod = (startDate, endDate) => {
  if (startDate) {
    safeSet(MEMBERSHIP_START_KEY, new Date(startDate).toISOString());
  } else {
    safeSet(MEMBERSHIP_START_KEY, '');
  }
  if (endDate) {
    safeSet(MEMBERSHIP_END_KEY, new Date(endDate).toISOString());
  } else {
    safeSet(MEMBERSHIP_END_KEY, '');
  }
};

export const getMembershipPeriod = () => {
  const start = parseDate(safeGet(MEMBERSHIP_START_KEY));
  const end = parseDate(safeGet(MEMBERSHIP_END_KEY));
  return { start, end };
};

export const checkAndUpdateMembershipStatus = () => {
  const stored = safeGet(MEMBERSHIP_STATUS_KEY) || MembershipStatus.NONE;
  const { end } = getMembershipPeriod();
  if (stored === MembershipStatus.ACTIVE && end && end.getTime() < Date.now()) {
    setMembershipStatus(MembershipStatus.EXPIRED);
    return MembershipStatus.EXPIRED;
  }
  return stored;
};

export const initializeMembershipFromDeepLink = (search) => {
  if (!search) return false;
  const params = new URLSearchParams(search);
  const action = params.get('membership');
  if (!action) return false;

  if (action === 'confirm') {
    const start = params.get('start');
    const end = params.get('end');
    const startDate = start ? new Date(start) : new Date();
    const endDate = end ? new Date(end) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    setMembershipStatus(MembershipStatus.ACTIVE);
    setMembershipPeriod(startDate, endDate);
  }

  if (action === 'renew') {
    const durationDays = Number(params.get('durationDays')) || 30;
    const { end } = getMembershipPeriod();
    const base = end && end.getTime() > Date.now() ? end : new Date();
    const newEnd = new Date(base.getTime() + durationDays * 24 * 60 * 60 * 1000);
    setMembershipStatus(MembershipStatus.ACTIVE);
    setMembershipPeriod(new Date(), newEnd);
  }

  return true;
};

export const MEMBERSHIP_TEMPLATES = {
  initiation: 'Thanks for your interest! Please reply with your full name and preferred plan to start your membership.',
  confirmation: 'Your membership is confirmed and active. Welcome to Surabhii Fresh Milk!',
  expiryReminder: 'Your membership is expiring soon. Reply "RENEW" to continue your benefits.',
  renewal: 'Your membership has been renewed successfully. Thank you for staying with us!'
};
