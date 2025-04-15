import { DeliveryType } from "../services/order";

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
