import { DeliveryType } from "../services/order";
import { Address } from "./address";

export enum PaymentMethod {
  CASH = "Cash",
  CARD = "Card",
  ONLINE = "Online",
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
  delivery_type: 'Delivery' | 'Pickup'; 
  status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed'; 
  total_price: string; 
  created_at: string;
  updated_at: string;
  table: any; 
}

