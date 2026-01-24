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

**Entry 3: Manual WhatsApp Message**  
User types anything directly.

## Step 1 – Greeting & Intent Detection

Trigger: First message or new conversation.

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

## Step 2 – Order Flow (Intent = 1)

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

## Step 3 – Membership Flow (Intent = 2)

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

## Step 4 – Pricing Flow (Intent = 3)

Reply:

```
Here’s our current pricing:

🥛 Fresh Cow Milk – ₹60 / L
🥣 Fresh Curd – ₹50
🧈 Desi Ghee – ₹800

Glass bottle delivery.
No preservatives.
```

## Step 5 – Support Flow (Intent = 4)

Reply:

```
Our support team will assist you shortly.
Please describe your issue.
```

Tag: `handover_required = true`

## Step 6 – Order Confirmation

After payment confirmation:

```
✅ Order Confirmed!

Delivery: {date & time}
Bottle exchange: Yes

Thank you for choosing Surabhii Fresh Milk 💚
```

Store:
- `order_status = CONFIRMED`
- `delivery_datetime`

## Data to Capture

- Name
- Phone number
- Product & quantity
- Address
- Delivery time
- Payment mode
- Order status

## Rules & Constraints

- No spam or promotional messages
- Stay within WhatsApp 24-hour window
- Human handover allowed anytime
- Friendly, premium tone only
