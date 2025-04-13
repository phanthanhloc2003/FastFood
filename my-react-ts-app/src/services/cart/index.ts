import { CartItemResponse, IAddCart } from "../../types/cart";
import api from "../api";

export const cartApi = {
  create: async (data: IAddCart) => {
    const response = await api.post("/cart", data);
    return response.data;
  },

  get: async (): Promise<CartItemResponse[] | []> => {
    const response = await api.get("/cart");
    return response.data;
  },

  remove: async (id: number) => {
    const response = await api.delete(`/cart/${id}`);
    return response.data;
  },
};
