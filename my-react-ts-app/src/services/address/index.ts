import { AddressFormData } from "../../pages/Address";
import api from "../api";

export const addressApi = {
  create: async (data: AddressFormData) => {
    const response = await api.post("/address", data);
    return response.data;
  },
  getAll: async () => {
    const response = await api.get("/address");
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/address/${id}`);
    return response.data;
  },

  setDefault: async (id: number) => {
    const response = await api.put(`/address/${id}/default`);
    return response.data;
  },
  finOne: async (id: number) => {
    const response = await api.get(`/address/${id}`);
    return response.data;
  },
};
