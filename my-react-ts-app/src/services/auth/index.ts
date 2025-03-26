
import { User } from "../../types";
import api from "../api";
interface LoginResponse {
  access_token: string;
  user: User;
}
export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>("auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Đăng nhập thất bại" };
  }
};

export const usersRegister = async (
     fullName:string ,
     email: string,
     phone:string,
     password:string
): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>("users/register", {
        fullName,email,phone,password
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "failure register" };
  }
};
