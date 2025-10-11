# PayTabs Payment Gateway Integration

This document describes the PayTabs payment gateway integration for the Guzarishh e-commerce platform.

## Overview

PayTabs is integrated as the payment gateway for processing customer payments. The integration uses the hosted payment pages approach with server-to-server API calls.

## Configuration

### Environment Variables

Add the following variables to your `.env.local` file:

```env
# PayTabs Configuration
PAYTABS_SERVER_KEY=S6J9DGHTWB-JLWLWGWBWZ-2THJNDKBHB
PAYTABS_CLIENT_KEY=CGK2BP-VVB26B-VBVTV2-V79TPN
PAYTABS_PROFILE_ID=168330
NEXT_PUBLIC_PAYTABS_PROFILE_ID=168330
```

### API Credentials

- **Profile ID**: 168330
- **Server Key**: S6J9DGHTWB-JLWLWGWBWZ-2THJNDKBHB
- **Client Key**: CGK2BP-VVB26B-VBVTV2-V79TPN
- **API Endpoint**: https://secure.paytabs.com/payment/request

## Architecture

### Payment Flow

1. **Customer fills checkout form** (`/checkout`)
   - Customer information (name, email, phone, address)
   - Order summary and total amount

2. **Payment initiation** (`/api/paytabs/create-payment`)
   - Server creates payment request with PayTabs
   - PayTabs returns redirect URL for hosted payment page

3. **Customer redirected to PayTabs** (hosted payment page)
   - Secure payment page hosted by PayTabs
   - Customer enters card details
   - 3D Secure authentication if required

4. **Payment processing**
   - PayTabs processes the payment
   - Sends callback to server (`/api/paytabs/callback`)
   - Redirects customer to return URL (`/payment/pending`)

5. **Completion**
   - Success: Redirect to `/payment/success`
   - Failure: Redirect to `/payment/cancel`

### File Structure

```
src/
├── lib/
│   └── paytabs.ts                           # PayTabs utilities and types
├── app/
│   ├── api/
│   │   └── paytabs/
│   │       ├── create-payment/
│   │       │   └── route.ts                 # Create payment API endpoint
│   │       └── callback/
│   │           └── route.ts                 # Payment callback handler
│   ├── checkout/
│   │   └── page.tsx                         # Checkout page
│   └── payment/
│       ├── pending/
│       │   └── page.tsx                     # Processing/pending state
│       ├── success/
│       │   └── page.tsx                     # Success page
│       └── cancel/
│           └── page.tsx                     # Cancellation page
```

## API Endpoints

### Create Payment Request

**Endpoint**: `POST /api/paytabs/create-payment`

**Request Body**:
```json
{
  "amount": 299.00,
  "currency": "AED",
  "cartId": "GZR_1234567890_abc123",
  "description": "Guzarishh Order - 3 items",
  "customerDetails": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+971501234567",
    "address": "123 Main St",
    "city": "Dubai",
    "state": "",
    "country": "AE"
  }
}
```

**Response (Redirect Required)**:
```json
{
  "success": true,
  "requiresRedirect": true,
  "redirectUrl": "https://secure.paytabs.com/payment/page/REF/redirect",
  "tranRef": "TST2021800000123"
}
```

**Response (Direct Result - Rare)**:
```json
{
  "success": true,
  "requiresRedirect": false,
  "paymentResult": {
    "response_status": "A",
    "response_code": "831000",
    "response_message": "Authorised"
  },
  "tranRef": "TST2021800000123"
}
```

### Payment Callback

**Endpoint**: `POST /api/paytabs/callback`

This endpoint receives server-to-server callbacks from PayTabs after payment processing.

**Request (Form URL Encoded)**:
```
tranRef=TST2021800000123
cartId=GZR_1234567890_abc123
respStatus=A
respCode=831000
respMessage=Authorised
acquirerRRN=123456789
acquirerMessage=ACCEPT
customerEmail=john@example.com
signature=abc123...
```

**Security**: The callback signature is verified using HMAC-SHA256 to ensure authenticity.

## Response Status Codes

| Code | Description |
|------|-------------|
| `A` | Authorized - Payment successful |
| `H` | Held - Payment held for review |
| `P` | Pending - Payment pending |
| `V` | Voided - Payment voided |
| `D` | Declined - Payment declined |
| `E` | Expired - Payment session expired |

## Security Features

### Signature Verification

All callbacks from PayTabs include a signature that is verified using HMAC-SHA256:

```typescript
const signature = crypto
  .createHmac('sha256', serverKey)
  .update(queryString)
  .digest('hex');
```

The signature verification ensures that callbacks are genuinely from PayTabs and haven't been tampered with.

### Client IP Detection

Customer IP addresses are captured for fraud prevention:
- From `x-forwarded-for` header
- From `x-real-ip` header
- Fallback to `127.0.0.1`

## Payment Pages

### Checkout Page (`/checkout`)

Features:
- Customer information form
- Shipping address form
- Order summary with items
- Payment button with PayTabs integration
- Form validation
- Loading states

### Pending Page (`/payment/pending`)

Features:
- Processing status display
- Automatic redirect based on payment result
- Handles URL parameters from PayTabs return
- User-friendly messages

### Success Page (`/payment/success`)

Features:
- Success confirmation
- Transaction reference display
- Order ID display
- Email confirmation notice
- Links to continue shopping or view orders
- Automatic cart clearing

### Cancel Page (`/payment/cancel`)

Features:
- Cancellation message
- Transaction reference (if available)
- Reason for failure (if available)
- Options to retry or continue shopping

## Testing

### Test Card Numbers

PayTabs provides test cards for sandbox testing:

| Card Number | Result |
|-------------|--------|
| 4111111111111111 | Approved |
| 4000000000000002 | Declined |
| 5200000000000007 | 3D Secure |

### Test Transaction

1. Go to `/checkout`
2. Fill in customer information
3. Click "Pay" button
4. Use test card on PayTabs hosted page
5. Complete 3D Secure if prompted
6. Verify redirect to success/cancel page

## Error Handling

### Client-Side Errors

- Form validation errors
- Network errors
- API errors displayed via alerts

### Server-Side Errors

- Missing environment variables
- Invalid PayTabs API response
- Signature verification failures
- Logged to console with details in development mode

## Integration Checklist

- [x] Environment variables configured
- [x] Payment creation API endpoint
- [x] Payment callback handler
- [x] Signature verification
- [x] Checkout page integration
- [x] Success page
- [x] Cancel page
- [x] Pending page
- [ ] Order storage in database (Convex)
- [ ] Email notifications
- [ ] Inventory updates
- [ ] Webhook for order fulfillment

## Next Steps

### Database Integration

Integrate with Convex to store order details:

```typescript
// In callback handler
const order = await ctx.db.insert('orders', {
  cartId: callbackData.cartId,
  tranRef: callbackData.tranRef,
  status: callbackData.respStatus,
  amount: orderAmount,
  customerEmail: callbackData.customerEmail,
  createdAt: Date.now(),
});
```

### Email Notifications

Send confirmation emails after successful payment:
- Order confirmation to customer
- Order notification to admin
- Include order details and tracking information

### Refund API

Implement refund functionality:

```typescript
POST /api/paytabs/refund
{
  "tranRef": "TST2021800000123",
  "amount": 299.00,
  "reason": "Customer request"
}
```

## Support

- **PayTabs Documentation**: https://site.paytabs.com/en/developers/
- **PayTabs Support**: support@paytabs.com
- **Guzarishh Support**: info@guzarishh.com

## Troubleshooting

### Common Issues

**1. "Missing signature" error**
- Ensure callback URL is accessible
- Check server key is correct
- Verify PayTabs profile configuration

**2. "Invalid signature" error**
- Server key mismatch
- Check signature verification logic
- Ensure query string is properly sorted

**3. Payment page not loading**
- Check network connectivity
- Verify API endpoint is correct
- Check environment variables

**4. Callback not received**
- Ensure callback URL is publicly accessible
- Check firewall/security settings
- Verify PayTabs profile callback URL

## License

This integration is part of the Guzarishh e-commerce platform.

