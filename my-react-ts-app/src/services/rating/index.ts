
import { Review } from "../../components/Product/ProductReviews";
import api from "../api";

export const ratingApi = {
  create: async (id:string, data: { rating:number, comment:string}) => {
    const response = await api.post(`/products/${id}/reviews`, data);
    return response.data;
  },
  get: async (id:string):Promise<Review[]> => {
    const response = await api.get(`/products/${id}/reviews`);
    return response.data;
  },
};
