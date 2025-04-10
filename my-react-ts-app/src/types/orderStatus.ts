export interface OrderStatusLog {
  id: number;
  order_id: number;
  status: 'Pending' | 'Completed' | 'Cancelled';
  message: string;
  created_at: string;
} 