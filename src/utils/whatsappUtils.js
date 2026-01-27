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
 * Builds checkout message for WhatsApp native cart flow
 * COMPLIANT: Sends plain text summary + catalog links only
 * User must manually add items in WhatsApp (no programmatic cart filling)
 * @param {Array} cartItems - Array of cart items with catalogProductId
 * @returns {string} Message with order summary, instructions, and catalog links
 */
export const buildCheckoutMessage = (cartItems) => {
  if (!cartItems || cartItems.length === 0) return '';

  // Build plain text order summary (human-readable)
  const orderSummary = cartItems.map((item) => {
    // Determine unit based on product name
    let unit = 'Unit';
    if (item.name.toLowerCase().includes('milk')) {
      unit = 'Litres';
    } else if (item.name.toLowerCase().includes('curd')) {
      unit = 'Pack';
    } else if (item.name.toLowerCase().includes('ghee')) {
      unit = 'Bottle';
    }
    
    return `• ${item.name} – ${item.quantity} ${unit}`;
  });

  // Build catalog links - one per unique product
  // User will manually add items in WhatsApp
  const uniqueProducts = [];
  const seenIds = new Set();
  
  cartItems.forEach((item) => {
    if (item.catalogProductId && !seenIds.has(item.catalogProductId)) {
      seenIds.add(item.catalogProductId);
      uniqueProducts.push(buildCatalogLink(item.catalogProductId));
    }
  });

  const catalogLinks = uniqueProducts.filter(link => link !== null);

  // Build message with order summary + instructions + catalog links
  const messageParts = [
    'Hello Surabhii Fresh Milk 🥛',
    '',
    'Here\'s my order summary:',
    ...orderSummary,
    '',
    'Please add the items below from your catalog',
    'and send the cart to confirm 👇',
    ''
  ];

  // Add catalog links
  if (catalogLinks.length > 0) {
    messageParts.push(...catalogLinks);
  } else {
    // Fallback if no catalog links
    messageParts.push('Please contact us to place your order. Thank you!');
  }

  return messageParts.join('\n');
};
