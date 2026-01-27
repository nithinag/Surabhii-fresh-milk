# WhatsApp Automation Flows

This document defines the WhatsApp-first automation flow for Surabhii Fresh Milk.
These flows are designed for a premium, human tone and can be implemented in a
WhatsApp Business API / CRM automation layer without backend checkout.

## Entry Points

**Entry 1: Website – Order Enquiry**  
Message example:

```
Hello Surabhii Fresh Milk 🥛
I’d like to order fresh cow milk.
Please share today’s availability and pricing.
```

**Entry 2: Website – Checkout Order**  
Message example:

```
Hello Surabhii Fresh Milk 🥛
I’d like to place an order:

• Fresh Cow Milk – 2 Litres
• Curd – 1 Packet

Please confirm availability.
```

**Entry 3: Native WhatsApp Cart Message**  
User sends WhatsApp's native cart message (structured cart UI with products and estimated total).

**Entry 4: Manual WhatsApp Message**  
User types anything directly.

---

## ⚠️ CRITICAL AUTOMATION RULES

### DO NOT Automate:
- ❌ Catalog link clicks (wa.me/p/...)
- ❌ Initial checkout message with catalog links
- ❌ Product browsing in catalog
- ❌ Any action before cart submission
- ❌ Auto-replies to catalog product views

### DO Automate:
- ✅ Native cart message (structured cart UI)
- ✅ Text-based order messages
- ✅ General inquiries
- ✅ After user explicitly requests help

### Automation Trigger:
- **ONLY** when WhatsApp native cart message is detected
- **ONLY** when user sends text-based order message
- **ONLY** when user explicitly requests information

### Human Takeover:
- Always allow "Talk to human" option
- Detect keywords: "human", "agent", "support", "help"
- Immediate handover on request
- No automation blocking human intervention

---

## Step 1 – Native Cart Message Detection & Processing

**Trigger:** WhatsApp native cart message detected (structured cart UI with products).

**Detection Method:**
- Check for cart message type in WhatsApp Business API
- Look for structured cart data (products, quantities, estimated total)
- Verify it's not a catalog link click

**Automation Flow:**

```
✅ Thank you for your order! 🥛

I can see your cart:
{List products from cart message}

To complete your order, I need a few details:

📍 Delivery Address:
Please share your complete delivery address.

⏰ Preferred Delivery Time:
1️⃣ Morning (6 AM - 10 AM)
2️⃣ Evening (4 PM - 8 PM)

Reply with 1 or 2.
```

**Store:**
- `order_source = "native_cart"`
- `cart_products` (from WhatsApp cart data)
- `cart_total` (estimated total from cart)
- `order_status = "PENDING_DETAILS"`

**Next Step:** Wait for address → delivery time → payment confirmation

---

## Step 2 – Greeting & Intent Detection (Text Messages)

**Trigger:** First text message or new conversation (NOT cart message).

Reply:

```
Hello 👋 Welcome to Surabhii Fresh Milk 🥛

How can we help you today?
1️⃣ Order Milk
2️⃣ Membership Plans
3️⃣ Pricing & Availability
4️⃣ Talk to Support

Please reply with 1, 2, 3, or 4.
```

Store: `intent`

## Step 3 – Order Flow (Intent = 1)

If the first message already includes product + quantity, skip product selection.

If missing, ask:

```
Please tell us the product and quantity.
Example:
Fresh Cow Milk – 2 Litres
```

After product confirmation, ask:

```
Please share your delivery address 📍
```

Then ask:

```
Preferred delivery time?
1️⃣ Morning
2️⃣ Evening
```

After delivery time, calculate total and reply:

```
Thank you 🙏
Your order total is ₹{amount}.

Payment options:
1️⃣ UPI
2️⃣ Cash on Delivery

Reply with 1 or 2.
```

Store:
- `products`
- `address`
- `delivery_time`
- `amount`
- `payment_mode`

## Step 4 – Membership Flow (Intent = 2)

Reply:

```
We offer flexible milk memberships 🥛

1️⃣ Weekly
2️⃣ Monthly
3️⃣ Yearly

Please reply with 1, 2, or 3.
```

After selection:

```
Great choice!
A team member will contact you shortly to activate your membership.
```

Store:
- `membership_plan`
- `membershipStatus = INITIATED`

## Step 5 – Pricing Flow (Intent = 3)

Reply:

```
Here’s our current pricing:

🥛 Fresh Cow Milk – ₹60 / L
🥣 Fresh Curd – ₹50
🧈 Desi Ghee – ₹800

Glass bottle delivery.
No preservatives.
```

## Step 6 – Support Flow (Intent = 4)

Reply:

```
Our support team will assist you shortly.
Please describe your issue.
```

Tag: `handover_required = true`

## Step 7 – Address Collection (Native Cart Flow)

**Trigger:** After native cart message, wait for address.

**Validation:**
- Check if message contains address keywords
- Minimum length check
- Ask for clarification if unclear

**Reply:**
```
📍 Got it! I've noted your address.

Next, please choose your delivery time:
1️⃣ Morning (6 AM - 10 AM)
2️⃣ Evening (4 PM - 8 PM)

Reply with 1 or 2.
```

**Store:**
- `delivery_address`
- `order_status = "PENDING_TIME"`

---

## Step 8 – Delivery Time Selection (Native Cart Flow)

**Trigger:** After address confirmation.

**Reply:**
```
⏰ Perfect! Delivery scheduled for {time slot}.

Your order summary:
{Products from cart}
Total: ₹{cart_total}

Payment options:
1️⃣ UPI
2️⃣ Cash on Delivery

Reply with 1 or 2.
```

**Store:**
- `delivery_time`
- `order_status = "PENDING_PAYMENT"`

---

## Step 9 – Payment Confirmation (Native Cart Flow)

**Trigger:** After payment method selection.

**For UPI:**
```
💳 Please send ₹{total} via UPI to:
UPI ID: {business_upi_id}

Once payment is done, reply "PAID" to confirm.
```

**For Cash on Delivery:**
```
💵 Cash on Delivery confirmed.

Your order will be delivered on {date} between {time}.
Our delivery person will collect ₹{total} on delivery.
```

**Store:**
- `payment_mode`
- `order_status = "PENDING_CONFIRMATION"` (UPI) or `"CONFIRMED"` (COD)

---

## Step 10 – Order Confirmation

**Trigger:** After payment confirmation (UPI: user replies "PAID", COD: auto-confirmed).

**Reply:**
```
✅ Order Confirmed!

Order ID: {order_id}
Products: {product_list}
Total: ₹{total}
Delivery: {date} {time}
Address: {address}
Payment: {payment_mode}

🔄 Bottle Exchange: Yes (please keep empty bottles ready)

Thank you for choosing Surabhii Fresh Milk 💚
We'll send you a delivery update soon!
```

**Store:**
- `order_status = CONFIRMED`
- `order_id`
- `delivery_datetime`
- `confirmed_at`

## Data to Capture

- Name
- Phone number
- Product & quantity
- Address
- Delivery time
- Payment mode
- Order status

## Implementation Notes for Interakt/WATI

### Native Cart Detection:
```javascript
// Pseudo-code for cart detection
if (message.type === 'cart' || message.hasCartData) {
  // Extract cart data
  const cartProducts = message.cart.items;
  const cartTotal = message.cart.total;
  
  // Trigger Step 1 automation
  triggerNativeCartFlow(cartProducts, cartTotal);
}
```

### Catalog Link Click Detection:
```javascript
// DO NOT automate on catalog clicks
if (message.type === 'catalog_link_click') {
  // Do nothing - let user browse naturally
  return;
}
```

### Message Flow States:
- `PENDING_DETAILS` - Waiting for address
- `PENDING_TIME` - Waiting for delivery time
- `PENDING_PAYMENT` - Waiting for payment method
- `PENDING_CONFIRMATION` - Waiting for UPI payment confirmation
- `CONFIRMED` - Order confirmed

## Rules & Constraints

- No spam or promotional messages
- Stay within WhatsApp 24-hour window
- Human handover allowed anytime
- Friendly, premium tone only
- **NEVER automate before cart submission**
- **ALWAYS wait for native cart message**