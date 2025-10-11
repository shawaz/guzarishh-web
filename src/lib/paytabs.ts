// PayTabs API Types and Utilities

export interface PayTabsCustomerDetails {
  name: string;
  email: string;
  phone: string;
  street1: string;
  city: string;
  state?: string;
  country: string;
  ip: string;
}

export interface PayTabsPaymentRequest {
  profile_id: number;
  tran_type: 'sale' | 'auth' | 'void' | 'refund';
  tran_class: 'ecom' | 'moto' | 'cont';
  cart_description: string;
  cart_id: string;
  cart_currency: string;
  cart_amount: number;
  callback: string;
  return: string;
  customer_details?: PayTabsCustomerDetails;
  framed?: boolean;
  hide_shipping?: boolean;
}

export interface PayTabsPaymentResult {
  response_status: string;
  response_code: string;
  response_message: string;
  acquirer_message: string;
  acquirer_rrn: string;
  transaction_time: string;
}

export interface PayTabsPaymentInfo {
  card_type: string;
  card_scheme: string;
  payment_description: string;
}

export interface PayTabsSuccessResponse {
  tran_ref: string;
  cart_id: string;
  cart_description: string;
  cart_currency: string;
  cart_amount: string;
  customer_details: PayTabsCustomerDetails;
  payment_result: PayTabsPaymentResult;
  payment_info: PayTabsPaymentInfo;
}

export interface PayTabsRedirectResponse {
  tran_ref: string;
  cart_id: string;
  cart_description: string;
  cart_currency: string;
  cart_amount: string;
  callback: string;
  return: string;
  redirect_url: string;
}

export interface PayTabsErrorResponse {
  code: number;
  message: string;
}

export interface PayTabsCallbackData {
  tranRef: string;
  cartId: string;
  respStatus: string;
  respCode: string;
  respMessage: string;
  acquirerRRN: string;
  acquirerMessage: string;
  token?: string;
  customerEmail: string;
  signature: string;
}

// PayTabs API endpoint
export const PAYTABS_API_ENDPOINT = 'https://secure.paytabs.com/payment/request';

// Utility function to create payment request
export async function createPayTabsPayment(
  paymentData: PayTabsPaymentRequest
): Promise<PayTabsSuccessResponse | PayTabsRedirectResponse> {
  const serverKey = process.env.PAYTABS_SERVER_KEY;
  
  if (!serverKey) {
    throw new Error('PayTabs server key not configured');
  }

  const response = await fetch(PAYTABS_API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': serverKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(paymentData),
  });

  if (!response.ok) {
    const error: PayTabsErrorResponse = await response.json();
    throw new Error(error.message || 'Payment request failed');
  }

  return response.json();
}

// Utility function to verify callback signature
export function verifyPayTabsSignature(
  callbackData: Record<string, string>,
  signature: string
): boolean {
  const serverKey = process.env.PAYTABS_SERVER_KEY;
  
  if (!serverKey) {
    throw new Error('PayTabs server key not configured');
  }

  // Remove signature from data
  const dataToSign = { ...callbackData };
  delete dataToSign.signature;

  // Filter empty values
  const filteredData = Object.fromEntries(
    Object.entries(dataToSign).filter(([_, value]) => value)
  );

  // Sort keys
  const sortedKeys = Object.keys(filteredData).sort();
  const sortedData: Record<string, string> = {};
  sortedKeys.forEach(key => {
    sortedData[key] = filteredData[key];
  });

  // Generate query string
  const queryString = new URLSearchParams(sortedData).toString();

  // Generate HMAC SHA256 signature
  const crypto = require('crypto');
  const calculatedSignature = crypto
    .createHmac('sha256', serverKey)
    .update(queryString)
    .digest('hex');

  return calculatedSignature === signature;
}

// Get client IP address from request headers
export function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  return '127.0.0.1';
}

// Response status codes
export const PayTabsStatus = {
  AUTHORIZED: 'A',
  HELD: 'H',
  PENDING: 'P',
  VOIDED: 'V',
  DECLINED: 'D',
  EXPIRED: 'E',
} as const;

