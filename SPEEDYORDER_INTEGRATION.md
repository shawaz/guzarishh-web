# SpeedyOrderDelivery Integration Guide

Complete integration of SpeedyOrderDelivery courier service into the Guzarishh e-commerce platform.

## 🚚 What Was Integrated

### ✅ Features Implemented

1. **Database Schema** - Extended orders table with delivery fields
2. **API Utilities** - Complete SpeedyOrder API wrapper functions
3. **API Routes** - Server-side endpoints for delivery operations
4. **Order Tracking** - Customer-facing tracking page
5. **Convex Functions** - Database mutations for shipping updates

## 📋 API Endpoints Created

### 1. Create Delivery Order
**POST** `/api/delivery/create`

Creates a new delivery order with SpeedyOrderDelivery.

**Request Body:**
```json
{
  "orderId": "#1309",
  "receiverName": "John Doe",
  "receiverPhone": "+971 12345678",
  "receiverEmail": "john@example.com",
  "receiverAddress": "123 Main St, Dubai",
  "city": "Dubai",
  "pieces": 3,
  "collectionAmount": "1050.00",
  "productDescription": "Fashion items",
  "specialInstruction": "Handle with care"
}
```

**Response:**
```json
{
  "success": true,
  "trackingNumber": "20210010236",
  "courierOrderId": 288,
  "message": "Order 20210010236 created successfully"
}
```

### 2. Track Order
**GET** `/api/delivery/track?trackingNo=20210010236`

Get tracking history for an order.

**Response:**
```json
{
  "success": true,
  "trackingNumber": "20210010236",
  "history": [
    {
      "tracking_no": "20210010236",
      "status": "Parcel Received at office",
      "created": "2024-02-17 10:12:14"
    }
  ]
}
```

### 3. Cancel Delivery
**POST** `/api/delivery/cancel`

Cancel an existing delivery order.

**Request Body:**
```json
{
  "trackingNo": "20210010236"
}
```

### 4. Get Cities List
**GET** `/api/delivery/cities`

Retrieve list of supported cities (cached for 1 hour).

### 5. Get Services
**GET** `/api/delivery/services`

Get available products and services (cached for 1 hour).

## 🔧 Setup Instructions

### 1. Configure Environment Variables

Add to your `.env.local`:

```env
# SpeedyOrderDelivery Courier API
SPEEDYORDER_AUTH_KEY=your_auth_key_here
SPEEDYORDER_CLIENT_CODE=your_client_code_here
SPEEDYORDER_PROFILE_ID=your_profile_id_here
```

**Get these credentials from:**
- Login to SpeedyOrderDelivery dashboard
- Navigate to API settings
- Copy Auth Key, Client Code, and Profile ID

### 2. Deploy Convex Schema

Make sure Convex is running to deploy the updated schema:

```bash
npx convex dev
```

Wait for the schema to deploy successfully.

### 3. Restart Dev Server

```bash
npm run dev
```

## 📊 Database Schema Updates

### Orders Table - New Fields

| Field | Type | Description |
|-------|------|-------------|
| `shippingCity` | string | Delivery destination city |
| `deliveryPartner` | string | Courier service (e.g., "speedyorder") |
| `trackingNumber` | string | Courier tracking number |
| `deliveryStatus` | string | Latest delivery status |
| `deliveryTrackingHistory` | string | JSON of tracking events |
| `courierOrderId` | string | Courier's internal order ID |
| `estimatedDeliveryDate` | number | Expected delivery timestamp |

### New Index

- `by_trackingNumber` - Fast lookups by tracking number

## 🎨 Customer Features

### Track Order Page (`/track`)

Customers can track their orders by:
1. Visit `/track` page
2. Enter tracking number
3. View real-time delivery status
4. See complete tracking history

**Features:**
- Real-time status updates
- Visual timeline of events
- Status icons (delivered, pending, cancelled)
- Formatted dates and times
- Mobile responsive design

## 💼 Admin Features (Coming Soon)

### Shipping Management in Admin Panel

Admin can:
- Create delivery orders from paid orders
- View tracking information
- Cancel deliveries
- Update delivery status
- Resend tracking emails

**Location:** `/admin/orders`

## 🔄 Integration Flow

### Complete Order Flow with Delivery

```
1. Customer places order
   ↓
2. Payment processed (PayTabs)
   ↓
3. Order created in database
   ↓
4. Admin creates delivery order
   ↓
5. SpeedyOrder API called
   ↓
6. Tracking number generated
   ↓
7. Customer receives tracking email
   ↓
8. Customer tracks order on /track
   ↓
9. Order delivered
   ↓
10. Status updated in database
```

## 📝 Usage Examples

### Create Delivery from Admin Panel

```typescript
// In admin orders page
const createDelivery = async (order) => {
  const response = await fetch('/api/delivery/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      orderId: order.cartId,
      receiverName: order.customerName,
      receiverPhone: order.customerPhone,
      receiverEmail: order.customerEmail,
      receiverAddress: order.shippingAddress,
      city: order.shippingCity,
      pieces: JSON.parse(order.items).length,
      collectionAmount: order.total.toString(),
    }),
  });

  const data = await response.json();
  
  // Update order with tracking info
  await updateOrderShipping(order._id, {
    trackingNumber: data.trackingNumber,
    deliveryPartner: 'speedyorder',
    courierOrderId: data.courierOrderId,
  });
};
```

### Track Order on Frontend

```typescript
// Customer tracking
const trackOrder = async (trackingNo) => {
  const response = await fetch(`/api/delivery/track?trackingNo=${trackingNo}`);
  const data = await response.json();
  return data.history;
};
```

## 🔍 SpeedyOrder API Reference

### Available Services

- **Within City - 2hr** (service_code: "2hr")
- **Other Cities - 4hr** (service_code: "Other Cities - 4hr")

### Product Types

- **COD (Cash on Delivery)** - product_id: "1"
- Domestic service
- Price calculated per kg

### Supported Cities

UAE cities including:
- Dubai
- Abu Dhabi
- Sharjah
- Ajman
- Umm Al Quwain
- Ras Al Khaimah
- Fujairah

Full list available via `/api/delivery/cities`

## ⚙️ Configuration Options

### Adjust Default Settings

In `src/lib/speedyorder.ts`:

```typescript
// Change default service type
service_type: '6', // Other Cities - 4hr
// or
service_type: '1', // Within City - 2hr

// Change origin city
origin: 'Dubai', // Your warehouse/store location

// Adjust weight calculation
export function calculateWeight(itemCount: number): number {
  return itemCount * 0.5; // 0.5kg per item
}
```

## 🧪 Testing

### Test the Integration

1. **Get Cities:**
   ```bash
   curl http://localhost:3000/api/delivery/cities
   ```

2. **Get Services:**
   ```bash
   curl http://localhost:3000/api/delivery/services
   ```

3. **Track Order:**
   ```bash
   curl "http://localhost:3000/api/delivery/track?trackingNo=20210010236"
   ```

### Test Card for End-to-End

1. Create order with test payment
2. Create delivery via API
3. Track using tracking page
4. Verify in SpeedyOrder dashboard

## 🚨 Error Handling

All endpoints include comprehensive error handling:

- **400** - Bad request (missing fields)
- **401** - Authentication failed
- **500** - Server error (API failure)

Errors are logged to console with detailed messages.

## 📈 Future Enhancements

### Phase 2 Features

- [ ] Automated delivery creation after payment
- [ ] Email notifications with tracking links
- [ ] SMS notifications for delivery updates
- [ ] Webhook integration for status updates
- [ ] Bulk order creation
- [ ] Delivery analytics dashboard
- [ ] Return/exchange request flow
- [ ] Multiple courier support

## 📞 Support

### SpeedyOrderDelivery

- Website: https://speedyorderdelivery.com
- API Docs: Contact support for documentation
- Support: support@speedyorderdelivery.com

### Guzarishh

- Email: info@guzarishh.com
- Docs: Check project documentation

## 🔒 Security Notes

- ✅ API keys stored in environment variables
- ✅ Server-side API calls only
- ✅ No sensitive data exposed to client
- ✅ Input validation on all endpoints
- ✅ Error messages sanitized

## ✅ Checklist

- [x] Database schema updated
- [x] API utilities created
- [x] API routes implemented
- [x] Tracking page built
- [x] Convex functions added
- [ ] Admin integration (next phase)
- [ ] Email notifications (next phase)
- [ ] Automated workflow (next phase)

---

**Integration Complete!** 🎉

Your platform now has full delivery partner integration with SpeedyOrderDelivery.

