// SpeedyOrderDelivery API Types and Utilities

export interface SpeedyOrderProduct {
  id: string;
  product_code: string | null;
  product_type: string;
  name: string;
  price_type: string;
}

export interface SpeedyOrderService {
  id: string;
  service_type: string;
  service_code: string;
  product_id: string;
  icon: string;
}

export interface SpeedyOrderCity {
  id: string;
  city_name: string;
}

export interface CreateOrderRequest {
  auth_key: string;
  client_code: string;
  service_type: string;
  product: string;
  profile_id: string;
  origin: string;
  tracking_no: number | string;
  receiver_phone: string;
  destination: string;
  receiver_name: string;
  receiver_email: string;
  receiver_address: string;
  pieces: number;
  weight: number;
  order_date: string;
  collection_amount: string;
  product_description?: string;
  special_instruction?: string;
  order_id: string;
}

export interface CreateOrderResponse {
  tracking_no: string | number;
  id: number;
  message: string;
}

export interface TrackingHistory {
  tracking_no: string;
  status: string;
  created: string;
}

// API Base URLs
const SPEEDYORDER_BASE_URL = 'https://speedyorderdelivery.com/API';

// Get products and services
export async function getProductsAndServices(): Promise<{
  products: SpeedyOrderProduct[];
  services: SpeedyOrderService[];
}> {
  const authKey = process.env.SPEEDYORDER_AUTH_KEY;
  const clientCode = process.env.SPEEDYORDER_CLIENT_CODE;

  if (!authKey || !clientCode) {
    throw new Error('SpeedyOrder credentials not configured');
  }

  const response = await fetch(`${SPEEDYORDER_BASE_URL}/ProductAndService.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      auth_key: authKey,
      client_code: clientCode,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch products and services');
  }

  return response.json();
}

// Get cities list
export async function getCitiesList(): Promise<{ response: number; data: SpeedyOrderCity[] }> {
  const response = await fetch(`${SPEEDYORDER_BASE_URL}/GetCitiesList.php`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch cities list');
  }

  return response.json();
}

// Create delivery order
export async function createDeliveryOrder(orderData: Omit<CreateOrderRequest, 'auth_key' | 'client_code' | 'profile_id'>): Promise<CreateOrderResponse> {
  const authKey = process.env.SPEEDYORDER_AUTH_KEY;
  const clientCode = process.env.SPEEDYORDER_CLIENT_CODE;
  const profileId = process.env.SPEEDYORDER_PROFILE_ID;

  if (!authKey || !clientCode || !profileId) {
    throw new Error('SpeedyOrder credentials not configured');
  }

  const response = await fetch(`${SPEEDYORDER_BASE_URL}/CreateOrder.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      auth_key: authKey,
      client_code: clientCode,
      profile_id: profileId,
      ...orderData,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create delivery order: ${errorText}`);
  }

  return response.json();
}

// Track order
export async function trackOrder(trackingNo: string): Promise<TrackingHistory[]> {
  const response = await fetch(`${SPEEDYORDER_BASE_URL}/TrackOrder.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tracking_no: trackingNo,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to track order');
  }

  return response.json();
}

// Cancel order
export async function cancelDeliveryOrder(trackingNo: string): Promise<{ tracking_no: string; message: string }> {
  const authKey = process.env.SPEEDYORDER_AUTH_KEY;

  if (!authKey) {
    throw new Error('SpeedyOrder auth key not configured');
  }

  const response = await fetch(
    `${SPEEDYORDER_BASE_URL}/CancelOrder.php?auth_key=${authKey}&tracking_no=${trackingNo}`,
    {
      method: 'GET',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to cancel delivery order');
  }

  return response.json();
}

// Helper: Format date for SpeedyOrder API (YYYY-MM-DD HH:MM:SS)
export function formatOrderDate(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Helper: Generate tracking number (13 digits)
export function generateTrackingNumber(): string {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return timestamp + random;
}

// Helper: Calculate weight from items (estimate)
export function calculateWeight(itemCount: number): number {
  // Estimate: 0.5kg per item (adjust based on your products)
  return itemCount * 0.5;
}

