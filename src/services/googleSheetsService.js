const SHEETS_WEBHOOK_URL = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL;

const postToSheets = async (payload) => {
  if (!SHEETS_WEBHOOK_URL) {
    console.warn('Google Sheets webhook URL not configured.');
    return { ok: false, skipped: true };
  }

  try {
    const response = await fetch(SHEETS_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return { ok: response.ok };
  } catch (error) {
    console.error('Failed to send data to Google Sheets:', error);
    return { ok: false, error };
  }
};

export const appendInvoiceToSheet = (invoice) => {
  return postToSheets({ type: 'invoice', invoice });
};

export const appendDeliveryToSheet = (delivery) => {
  return postToSheets({ type: 'delivery', delivery });
};
