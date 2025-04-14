export type PaymentMethod = 'Cash' | 'Card' | 'Online';
export type PaymentStatus = 'Pending' | 'Paid' | 'Failed';

export interface Payment {
  id: number;
  order_id: number;
  payment_method: PaymentMethod;
  amount: number;
  status: PaymentStatus;
  created_at: string;
}

export interface PaymentFormData {
  order_id: number;
  payment_method: PaymentMethod;
  amount: number;
} 