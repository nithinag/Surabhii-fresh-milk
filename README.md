# Surabhii Fresh Milk

Premium, mobile-first, WhatsApp-first ordering website built as a static frontend.

## Tech Stack

- Vite + React (SPA)
- Tailwind CSS (utility-first styling)
- PostCSS + Autoprefixer
- LocalStorage (cart, membership, orders, delivery)
- WhatsApp deep-links (`wa.me`) and `tel:` for contact
- Google Sheets Webhook (optional CRM write-through)

## Project Structure (high level)

- `src/components/` UI sections and reusable components
- `src/pages/` page composition (Home)
- `src/utils/` business logic (cart, membership, orders, delivery)
- `src/services/` integrations (Google Sheets webhook)
- `public/` static assets (hero video, logos)

## CTA & Ordering Workflows

### 1) Call Now (Header)

**Intent:** immediate human contact  
**Behavior:** opens device dialer  
**Implementation:** `tel:+917026769669`

### 2) Order Fresh Milk on WhatsApp (Hero)

**Intent:** general order enquiry (no cart)  
**Behavior:** opens WhatsApp with a fixed message  
**Message:**

```
Hello Surabhii Fresh Milk 🥛
I’d like to order fresh cow milk.
Please share today’s availability and pricing.
```

### 3) Add to Cart (Products)

**Intent:** browsing and selection  
**Behavior:** adds item to cart in LocalStorage, updates cart count  
**No WhatsApp**

### 4) Cart Drawer

**Intent:** review order  
**Behavior:** list items, change quantity, remove, show subtotal

### 5) Checkout via WhatsApp (Cart / Billing)

**Intent:** final order confirmation  
**Behavior:** read cart from LocalStorage, generate WhatsApp message, open WhatsApp

**Message format:**

```
Hello Surabhii Fresh Milk 🥛
I’d like to place an order:

• {Product Name} – {Quantity}
• {Product Name} – {Quantity}

Delivery Type: Home Delivery
Bottle Exchange: Yes

Please confirm availability. Thank you!
```

## Membership Workflow (Opt-in)

**Status values:** `NONE`, `INITIATED`, `ACTIVE`, `EXPIRED`  
**Storage keys:** `membershipStatus`, `membershipStart`, `membershipEnd`

- Initiation happens via WhatsApp from `Memberships` section.
- Status persists in LocalStorage.
- Auto-expiry checks on load.
- Optional deep-link handling for confirmation/renewal.

## Order, Invoice, and Delivery Workflow

- **Order capture:** LocalStorage cart + checkout message via WhatsApp.
- **Invoice:** generated on checkout (unique invoice ID).
- **Delivery schedule:** one-time for non-members; recurring for active members.
- **CRM (optional):** POSTs invoice/delivery records to Google Sheets via webhook.
  - Configure `VITE_GOOGLE_SHEETS_WEBHOOK_URL` in `.env`.

## WhatsApp Utilities

Reusable helpers live in `src/utils/whatsappUtils.js`:

- `buildWhatsAppUrl(message)`
- `openWhatsApp(message)`

## Local Development

```
npm install
npm run dev
```

## Notes

- Static website only (no backend required).
- WhatsApp is the primary commerce channel.
- All CTA behavior is separated by intent for a premium UX.
