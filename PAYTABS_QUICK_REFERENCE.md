# PayTabs Quick Reference Card

## 🔑 Credentials

| Key | Value |
|-----|-------|
| Profile ID | `168330` |
| Server Key | `S6J9DGHTWB-JLWLWGWBWZ-2THJNDKBHB` |
| Client Key | `CGK2BP-VVB26B-VBVTV2-V79TPN` |
| API Endpoint | `https://secure.paytabs.com/payment/request` |

## 🔗 Important URLs

### Development
- **Callback**: `http://localhost:3000/api/paytabs/callback`
- **Return**: `http://localhost:3000/payment/pending`
- **Success**: `http://localhost:3000/payment/success`
- **Cancel**: `http://localhost:3000/payment/cancel`

### Production
- **Callback**: `https://yourdomain.com/api/paytabs/callback`
- **Return**: `https://yourdomain.com/payment/pending`
- **Success**: `https://yourdomain.com/payment/success`
- **Cancel**: `https://yourdomain.com/payment/cancel`

## 💳 Test Cards

| Card Number | Expiry | CVV | Result |
|------------|--------|-----|--------|
| 4111111111111111 | Any future | 123 | ✅ Approved |
| 4000000000000002 | Any future | 123 | ❌ Declined |
| 5200000000000007 | Any future | 123 | 🔒 3D Secure |

## 📊 Response Status Codes

| Code | Status | Description |
|------|--------|-------------|
| `A` | Authorized | ✅ Payment successful |
| `H` | Held | ⏳ Payment held for review |
| `P` | Pending | ⏳ Payment pending |
| `V` | Voided | ❌ Payment voided |
| `D` | Declined | ❌ Payment declined |
| `E` | Expired | ❌ Payment session expired |

## 🔄 Payment Flow

```
Customer → Checkout Page
    ↓
    Fill customer info
    ↓
    Click "Pay" button
    ↓
Create Payment Request → PayTabs API
    ↓
Get Redirect URL
    ↓
Redirect to PayTabs → Hosted Payment Page
    ↓
    Enter card details
    ↓
    3D Secure (if required)
    ↓
Payment Processed
    ↓
Callback → Your Server (POST)
    ↓
Redirect → Pending Page
    ↓
Success or Cancel Page
```

## 📝 Environment Variables

```env
PAYTABS_SERVER_KEY=S6J9DGHTWB-JLWLWGWBWZ-2THJNDKBHB
PAYTABS_CLIENT_KEY=CGK2BP-VVB26B-VBVTV2-V79TPN
PAYTABS_PROFILE_ID=168330
NEXT_PUBLIC_PAYTABS_PROFILE_ID=168330
```

## 🛠️ Key Files

```
src/
├── lib/paytabs.ts                           # Utilities & types
├── app/
│   ├── api/paytabs/
│   │   ├── create-payment/route.ts          # Create payment
│   │   └── callback/route.ts                # Handle callback
│   ├── checkout/page.tsx                    # Checkout page
│   └── payment/
│       ├── pending/page.tsx                 # Processing
│       ├── success/page.tsx                 # Success
│       └── cancel/page.tsx                  # Cancel
└── convex/
    ├── schema.ts                            # Database schema
    └── orders.ts                            # Order functions
```

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local
# Then edit .env.local with your credentials

# Start development server
npm run dev

# Start Convex (in another terminal)
npx convex dev
```

## 🧪 Testing Steps

1. **Start servers**: `npm run dev` + `npx convex dev`
2. **Add to cart**: Go to products, add items
3. **Checkout**: Go to `/checkout`
4. **Fill form**: Enter customer information
5. **Pay**: Click "Pay with PayTabs"
6. **Test card**: Use `4111111111111111`
7. **Verify**: Check success page

## 🔍 Debugging

### Check Logs
```bash
# Terminal shows server-side logs
# Browser console shows client-side logs
```

### Common Checks
- ✅ Environment variables set
- ✅ Convex running
- ✅ PayTabs dashboard URLs configured
- ✅ Callback URL publicly accessible

## 📞 Support

- **PayTabs Docs**: https://site.paytabs.com/en/developers/
- **PayTabs Support**: support@paytabs.com
- **Guzarishh**: info@guzarishh.com

## 🔐 Security Notes

- ✅ Server key is secret (never expose to client)
- ✅ Client key can be public
- ✅ Always verify callback signatures
- ✅ Use HTTPS in production
- ✅ Validate all input data

## 📚 Documentation

- [Full Integration Guide](./PAYTABS_INTEGRATION.md)
- [Setup Instructions](./SETUP_PAYTABS.md)
- [Main README](./README.md)

