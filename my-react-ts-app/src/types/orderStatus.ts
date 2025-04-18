import { IUser } from ".";
import { DeliveryType } from "../services/order";
import { Address } from "./address";
import { CartItemResponse, Table } from "./cart";
import { Payment } from "./payment";

export enum PaymentMethod {
  CASH = "Cash",
  CARD = "Card",
  ONLINE = "Online",
}

export interface StatusLog {
  id: number;
  status: string;
  message: string;
  created_at: string;
}

export interface OrderStatusLog {
  id: number;
  order_id: number;
  status: "Pending" | "Completed" | "Cancelled";
  message: string;
  created_at: string;
}

export interface payment {
  deliveryType: DeliveryType;
  tableId?: number | null;
  addressId?: number | null;
  paymentMethod?: PaymentMethod;
}

export interface OrderResponse {
  id: number;
  order_code: string;
  address: Address;
  delivery_type: DeliveryType; 
  status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed'; 
  total_price: string; 
  created_at: string;
  updated_at: string;
  table: any; 
}

export interface IOrderResponseDetail{
  id:string;
  order_code:string;
  user:IUser;
  table_number:number | null;
  address: Address;
  delivery_type: DeliveryType;
  status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed'; 
  total_price: string;
  created_at: string;
  updated_at: string;
  items: {
    id: number;
    product_size: {
      id: number;
      product: {
        id: number;
        name: string;
        description: string;
        ingredients: string[];
        price: string;
        rating: number;
        total_reviews: number;
        createdAt: string;
        updatedAt: string;
        images: {
          id: number;
          url: string;
        }[];
      };
      size: string;
      price: string;
    };
    quantity: number;
    price: string;
    product_name: string;
    size: string;
  }[];
  statusLogs:OrderStatusLog[];
  payments:Payment[];
  table:Table | null;
}

