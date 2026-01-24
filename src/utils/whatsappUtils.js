const WHATSAPP_NUMBER = '917026769669';

export const buildWhatsAppUrl = (message) => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
};

export const openWhatsApp = (message) => {
  const url = buildWhatsAppUrl(message);
  window.open(url, '_blank');
};

/**
 * Builds WhatsApp Catalog deep link for a product
 * Format: https://wa.me/p/{catalogProductId}/{businessPhone}
 * @param {string} catalogProductId - WhatsApp Catalog Product ID
 * @returns {string} Catalog deep link URL
 */
export const buildCatalogLink = (catalogProductId) => {
  if (!catalogProductId) return null;
  return `https://wa.me/p/${catalogProductId}/${WHATSAPP_NUMBER}`;
};

/**
 * Builds checkout message with order summary and catalog links
 * @param {Array} cartItems - Array of cart items with catalogProductId
 * @returns {string} Formatted WhatsApp message with catalog links
 */
export const buildCheckoutMessage = (cartItems) => {
  if (!cartItems || cartItems.length === 0) return '';

  // Build order summary lines
  const orderLines = cartItems.map((item) => {
    const unit = item.name.includes('Milk') ? 'Litres' : item.name.includes('Curd') ? 'Pack' : 'Unit';
    return `• ${item.name} – ${item.quantity} ${unit}`;
  });

  // Build catalog links for each unique product
  const catalogLinks = cartItems
    .filter(item => item.catalogProductId)
    .map(item => buildCatalogLink(item.catalogProductId))
    .filter(link => link !== null);

  // Construct message
  const messageParts = [
    'Hello Surabhii Fresh Milk 🥛',
    'I\'d like to place an order:',
    '',
    ...orderLines,
    '',
    'Please find the products below from your catalog and confirm my order 👇',
    ''
  ];

  // Add catalog links
  if (catalogLinks.length > 0) {
    messageParts.push(...catalogLinks);
  } else {
    messageParts.push('Delivery Type: Home Delivery');
    messageParts.push('Bottle Exchange: Yes');
    messageParts.push('');
    messageParts.push('Please confirm availability. Thank you!');
  }

  return messageParts.join('\n');
};
