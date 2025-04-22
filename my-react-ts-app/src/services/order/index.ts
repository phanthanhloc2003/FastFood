import { CheckoutResponse } from "../../types/cart";
import {
  IOrderResponseDetail,
  OrderResponse,
  payment,
  StatusLog,
} from "../../types/orderStatus";
import { Product } from "../../types/product";
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

  getHistory: async (): Promise<OrderResponse[]> => {
    const response = await api.get("/order/history");
    return response.data;
  },

  getAllOrders: async (status: string): Promise<OrderResponse[]> => {
    const response = await api.get("admin/orders", {
      params: {
        status: status,
      },
    });
    return response.data;
  },
  getOrderDetails: async (id: string): Promise<IOrderResponseDetail> => {
    const response = await api.get(`admin/orders/${id}`);
    return response.data;
  },
  updateOrderStatus: async (
    id: string,
    status: "Pending" | "Completed" | "Cancelled",
    message?: string,
  ): Promise<IOrderResponseDetail> => {
    console.log(id);
    const response = await api.patch(`admin/orders/${id}/status`, {
      status,
      message,
    });
    return response.data;
  },

  getOrderStatusLogs: async (
    id: string,
  ): Promise<StatusLog[]> => {
    const response = await api.get(`/order/${id}/status-logs`);
    return response.data;
  },


  findPurchasedProducts: async (): Promise<Product[] | []> => {
    const response = await api.get("/order/product/completed");
    return response.data;
  },

};
