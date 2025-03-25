import * as yup from 'yup';
 export const logInSchema = yup
  .object({
    email: yup
      .string()
      .email("Email không hợp lệ")
      .required("Vui lòng nhập email"),
    password: yup
      .string()
      .required("Vui lòng nhập mật khẩu")
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    rememberMe: yup.boolean().default(false),
  })
  .required();