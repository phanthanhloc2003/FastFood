
import { IAddCart } from "../../types/cart";
import api from "../api";

export const cartApi = {
  create: async (data:IAddCart) => {
    const response = await api.post("/cart",data);
    return response.data;
  }
};
