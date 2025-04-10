export interface Notification {
  id: number;
  order_id: number;
  user_id: number;
  message: string;
  status: 'Unread' | 'Read';
  created_at: string;
  user?: {
    name: string;
    email: string;
  };
  order?: {
    id: number;
    total_price: number;
  };
} 