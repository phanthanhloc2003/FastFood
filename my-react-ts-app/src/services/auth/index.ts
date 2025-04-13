
import { IUser } from "../../types";
import api from "../api";
interface LoginResponse {
  access_token: string;
  user: IUser;
}
export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>(
      "auth/login",
      {
        email,
        password,
      }
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Đăng nhập thất bại" };
  }
};

export const usersRegister = async (
  fullName: string,
  email: string,
  phone: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>("users/register", {
      fullName,
      email,
      phone,
      password,
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "failure register" };
  }
};
export const refreshToken = async () => {
  try {
    const response = await api.get("/auth/refresh-token");
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Refresh token failed" };
  }
}


export const logout = async () => {
  try {
    const response = await api.get("/auth/logout");
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Refresh token failed" };
  }
}


