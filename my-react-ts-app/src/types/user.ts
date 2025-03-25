export interface User {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  avatar: string | null;
  role: string | null;
  address: string | null;
  dateOfBirth: string | null;
  gender: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface Address {
  id: string;
  userId: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  ward: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  userId: string;
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipping' | 'completed' | 'cancelled';
  address: Address;
  paymentMethod: 'cash' | 'card';
  paymentStatus: 'pending' | 'paid' | 'failed';
  createdAt: string;
  updatedAt: string;
} 