import { Product } from './product';

export interface IUser {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  avatar?: string;
  role: string | null;
  address: string | null;
  dateOfBirth: string | null;
  gender: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  access_token: string;
  user: IUser;
}

export interface Address {
  id: number;
  name: string;
  phone: string;
  province: string;
  district: string;
  ward: string;
  address_line: string;
  is_default: boolean;
  created_at: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  orderNumber: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipping' | 'completed' | 'cancelled';
  address: Address;
  paymentMethod: 'cash' | 'card';
  paymentStatus: 'pending' | 'paid' | 'failed';
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  price:number;
}

export interface Cart {
  items: CartItem[];
  totalAmount: number;
} 