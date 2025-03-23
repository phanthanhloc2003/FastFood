import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../schema/registerSchema";
import { RegisterFormData } from "../interface/register";

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log("Register attempt:", data);
  };

  const inputClasses =
    "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm transition-all duration-200 ease-in-out hover:border-orange-400";

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl"
      >
        <div>
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
              Đăng Ký Tài Khoản
            </h2>
          </motion.div>
          <p className="mt-2 text-center text-sm text-gray-600">
            Đã có tài khoản?{" "}
            <Link
              to="/login"
              className="font-medium text-orange-600 hover:text-orange-500 transition-colors"
            >
              Đăng nhập ngay
            </Link>
          </p>
        </div>

        <motion.form
          className="mt-8 space-y-6"
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Họ và Tên
              </label>
              <div className="mt-1">
                <input
                  {...register("fullName")}
                  type="text"
                  className={inputClasses}
                  placeholder="Nguyễn Văn A"
                />
                {errors.fullName && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-600"
                  >
                    {errors.fullName.message}
                  </motion.p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  {...register("email")}
                  type="email"
                  className={inputClasses}
                  placeholder="example@email.com"
                />
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-600"
                  >
                    {errors.email.message}
                  </motion.p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Số Điện Thoại
              </label>
              <div className="mt-1">
                <input
                  {...register("phone")}
                  type="tel"
                  className={inputClasses}
                  placeholder="0123456789"
                />
                {errors.phone && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-600"
                  >
                    {errors.phone.message}
                  </motion.p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Mật Khẩu
              </label>
              <div className="mt-1">
                <input
                  {...register("password")}
                  type="password"
                  className={inputClasses}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-600"
                  >
                    {errors.password.message}
                  </motion.p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Xác Nhận Mật Khẩu
              </label>
              <div className="mt-1">
                <input
                  {...register("confirmPassword")}
                  type="password"
                  className={inputClasses}
                  placeholder="••••••••"
                />
                {errors.confirmPassword && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-600"
                  >
                    {errors.confirmPassword.message}
                  </motion.p>
                )}
              </div>
            </div>
          </div>

          <div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white
                       bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500
                       transition-all duration-200 ease-in-out"
            >
              Đăng Ký
            </motion.button>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Register;
