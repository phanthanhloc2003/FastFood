import api from "../api";

export const categoriesApi = {
  // create: async (data) => {
  //   const response = await api.post("/categories");
  //   return response.data;
  // },

  getAl: async () => {
    const response = await api.get("/categories");
    return response.data;
  },
};
