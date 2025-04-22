
import api from "../api";

export const ratingApi = {
  create: async (id:string, data: { rating:number, comment:string}) => {
    const response = await api.post(`/products/${id}/reviews`, data);
    return response.data;
  },
};
