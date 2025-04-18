import { CheckoutResponse } from "../../types/cart";
import { IOrderResponseDetail, OrderResponse, payment } from "../../types/orderStatus";
import api from "../api";
export type DeliveryType = "Dine-in" | "Take-away" | "Delivery";
export const orderApi = {
  checkout: async (data: {
    deliveryType: DeliveryType;
    tableId?: number | null;
  }): Promise<CheckoutResponse | null> => {
    const response = await api.post("/order/checkout", data);
    return response.data;
  },
  create: async (data: payment) => {
    const response = await api.post("/order", data);
    return response.data;
  },

  getHistory: async ():Promise<OrderResponse[]> => {
    const response = await api.get("/order/history");
    return response.data;
  },

  getAllOrders: async (status:string):Promise<OrderResponse[]> => {
    const response = await api.get("admin/orders", {
      params: {
        status:status
      }
    });
    return response.data;
  },
  getOrderDetails: async (id:string):Promise<IOrderResponseDetail> => {
    const response = await api.get(`admin/orders/${id}`);
    return response.data;
  },
  confirmOrder: async (id: string): Promise<IOrderResponseDetail> => {
    const response = await api.put(`admin/orders/${id}/confirm`);
    return response.data;
  },
};
