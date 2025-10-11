# PayTabs Setup Guide

Quick guide to get PayTabs payment gateway up and running.

## Prerequisites

- Node.js 18+ installed
- Next.js project running
- PayTabs account with credentials

## Step 1: Configure Environment Variables

Create or update your `.env.local` file:

```bash
cp .env.local.example .env.local
```

Update the following variables in `.env.local`:

```env
# PayTabs Configuration
PAYTABS_SERVER_KEY=S6J9DGHTWB-JLWLWGWBWZ-2THJNDKBHB
PAYTABS_CLIENT_KEY=CGK2BP-VVB26B-VBVTV2-V79TPN
PAYTABS_PROFILE_ID=168330
NEXT_PUBLIC_PAYTABS_PROFILE_ID=168330
```

## Step 2: Install Dependencies (if needed)

All required dependencies are already included in the project. If you need to reinstall:

```bash
npm install
```

## Step 3: Test Locally

1. Start the development server:

```bash
npm run dev
```

2. Navigate to checkout:
   - Go to http://localhost:3000
   - Add items to cart
   - Go to checkout
   - Fill in customer details
   - Click "Pay with PayTabs"

3. Test with PayTabs sandbox card:
   - Card Number: `4111111111111111`
   - CVV: `123`
   - Expiry: Any future date

## Step 4: Configure PayTabs Dashboard

1. Log in to your PayTabs dashboard
2. Go to **Developers** section
3. Configure the following URLs:

### For Development (localhost)

**Callback URL**: 
```
http://localhost:3000/api/paytabs/callback
```

**Return URL**: 
```
http://localhost:3000/payment/pending
```

### For Production

**Callback URL**: 
```
https://yourdomain.com/api/paytabs/callback
```

**Return URL**: 
```
https://yourdomain.com/payment/pending
```

> **Important**: The callback URL must be publicly accessible. For local development, you may need to use a tunneling service like ngrok.

## Step 5: Using ngrok for Local Testing (Optional)

If you need to test callbacks locally:

1. Install ngrok:
```bash
npm install -g ngrok
```

2. Start your Next.js app:
```bash
npm run dev
```

3. In another terminal, start ngrok:
```bash
ngrok http 3000
```

4. Copy the ngrok URL (e.g., `https://abc123.ngrok.io`)

5. Update PayTabs dashboard URLs:
   - Callback: `https://abc123.ngrok.io/api/paytabs/callback`
   - Return: `https://abc123.ngrok.io/payment/pending`

6. Test the payment flow

## Step 6: Verify Integration

### Check Payment Creation

1. Go to checkout and initiate payment
2. Check browser console for any errors
3. Check terminal for server logs
4. Verify redirect to PayTabs hosted page

### Check Callback

1. Complete payment on PayTabs page
2. Check server logs for "PayTabs Callback received"
3. Verify signature validation passes
4. Check redirect to success/cancel page

### Check Transaction in Dashboard

1. Log in to PayTabs dashboard
2. Go to **Transactions**
3. Find your test transaction
4. Verify status is correct

## Production Deployment

### Environment Variables

Set the following in your production environment (Vercel, Netlify, etc.):

```env
PAYTABS_SERVER_KEY=S6J9DGHTWB-JLWLWGWBWZ-2THJNDKBHB
PAYTABS_CLIENT_KEY=CGK2BP-VVB26B-VBVTV2-V79TPN
PAYTABS_PROFILE_ID=168330
NEXT_PUBLIC_PAYTABS_PROFILE_ID=168330
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### PayTabs Profile Configuration

Update your PayTabs profile with production URLs:
- Callback URL: `https://yourdomain.com/api/paytabs/callback`
- Return URL: `https://yourdomain.com/payment/pending`

### SSL Certificate

Ensure your production site has a valid SSL certificate. PayTabs requires HTTPS for callbacks and redirects.

## Testing Checklist

- [ ] Environment variables configured
- [ ] Payment creation works
- [ ] Redirect to PayTabs works
- [ ] Test card payment succeeds
- [ ] Callback received and verified
- [ ] Success page displays correctly
- [ ] Transaction reference shown
- [ ] Cart cleared on success
- [ ] Cancel/decline works
- [ ] Cancel page displays correctly

## Common Issues

### Issue: "Missing signature" in callback

**Solution**: 
- Verify callback URL is correct in PayTabs dashboard
- Check server logs to see if callback is being received
- Ensure route file exists: `src/app/api/paytabs/callback/route.ts`

### Issue: "Invalid signature" error

**Solution**:
- Double-check `PAYTABS_SERVER_KEY` environment variable
- Ensure it matches the key in PayTabs dashboard
- Restart your development server after changing env vars

### Issue: Callback not received

**Solution**:
- Ensure callback URL is publicly accessible
- For local development, use ngrok
- Check firewall/security settings
- Verify URL in PayTabs dashboard

### Issue: Payment page doesn't redirect

**Solution**:
- Check browser console for errors
- Verify API endpoint response
- Check network tab for failed requests
- Ensure `redirect_url` is in API response

## Next Steps

After successful setup:

1. **Integrate with Database**: Store orders in Convex
2. **Add Email Notifications**: Send confirmation emails
3. **Implement Refunds**: Add refund functionality
4. **Add Webhooks**: Set up order fulfillment webhooks
5. **Enable Logging**: Add transaction logging for auditing

## Support

- PayTabs Documentation: https://site.paytabs.com/en/developers/
- PayTabs Support: support@paytabs.com
- Guzarishh Support: info@guzarishh.com

## Security Best Practices

1. **Never commit secrets**: Keep `.env.local` out of version control
2. **Use environment variables**: Don't hardcode credentials
3. **Verify signatures**: Always validate PayTabs callbacks
4. **Use HTTPS**: Ensure production site uses SSL
5. **Log transactions**: Keep audit trail of all payments
6. **Handle errors**: Gracefully handle payment failures
7. **Test thoroughly**: Test all payment scenarios

## Resources

- [PayTabs API Documentation](https://site.paytabs.com/en/developers/)
- [PayTabs Transaction API](https://site.paytabs.com/en/developers/transaction-api/)
- [PayTabs Response Codes](https://site.paytabs.com/en/developers/response-codes/)
- [Project Integration Guide](./PAYTABS_INTEGRATION.md)

