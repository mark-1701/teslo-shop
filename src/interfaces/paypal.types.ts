export type PayPalOrderStatusResponse = {
  id: string;
  intent: string;
  status: string;
  payment_source: PaymentSource;
  purchase_units: PurchaseUnit[];
  payer: Payer;
  create_time: Date;
  update_time: Date;
  links: Link[];
};

export type Link = {
  href: string;
  rel: string;
  method: string;
};

export type Payer = {
  name: PayerName;
  email_address: string;
  payer_id: string;
  address: PayerAddress;
};

export type PayerAddress = {
  country_code: string;
};

export type PayerName = {
  given_name: string;
  surname: string;
};

export type PaymentSource = {
  paypal: Paypal;
};

export type Paypal = {
  email_address: string;
  account_id: string;
  account_status: string;
  name: PayerName;
  address: PayerAddress;
};

export type PurchaseUnit = {
  reference_id: string;
  amount: Amount;
  payee: Payee;
  shipping: Shipping;
  payments: Payments;
  invoice_id: string;
};

export type Amount = {
  currency_code: string;
  value: string;
};

export type Payee = {
  email_address: string;
  merchant_id: string;
};

export type Payments = {
  captures: Capture[];
};

export type Capture = {
  id: string;
  status: string;
  amount: Amount;
  final_capture: boolean;
  seller_protection: SellerProtection;
  seller_receivable_breakdown: SellerReceivableBreakdown;
  links: Link[];
  create_time: Date;
  update_time: Date;
};

export type SellerProtection = {
  status: string;
  dispute_categories: string[];
};

export type SellerReceivableBreakdown = {
  gross_amount: Amount;
  paypal_fee: Amount;
  net_amount: Amount;
};

export type Shipping = {
  name: ShippingName;
  address: ShippingAddress;
};

export type ShippingAddress = {
  address_line_1: string;
  admin_area_2: string;
  admin_area_1: string;
  postal_code: string;
  country_code: string;
};

export type ShippingName = {
  full_name: string;
};
