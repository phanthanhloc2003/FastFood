import * as yup from 'yup';
export const schema = yup
  .object({
    fullName: yup.string().required("Vui lòng nhập họ tên"),
    email: yup
      .string()
      .email("Email không hợp lệ")
      .required("Vui lòng nhập email"),
    phone: yup
      .string()
      .required("Vui lòng nhập số điện thoại")
      .matches(/^[0-9]{10}$/, "Số điện thoại không hợp lệ"),
    password: yup
      .string()
      .required("Vui lòng nhập mật khẩu")
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: yup
      .string()
      .required("Vui lòng xác nhận mật khẩu")
      .oneOf([yup.ref("password")], "Mật khẩu không khớp"),
  })
  .required();
