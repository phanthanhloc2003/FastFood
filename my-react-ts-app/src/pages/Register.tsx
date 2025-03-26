import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { usersRegister } from "../services/auth";
import { RegisterFormData } from "../interface/register";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await usersRegister(data.fullName, data.email, data.phone, data.password);
      if(result){
        navigate("/login")
      }
    } catch (err: any) {
      setError(err.message || "Có lỗi xảy ra khi đăng ký");
    } finally {
      setIsLoading(false);
    }
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
                  {...register("fullName", {
                    required: "Vui lòng nhập họ và tên",
                    minLength: {
                      value: 2,
                      message: "Họ và tên phải có ít nhất 2 ký tự",
                    },
                  })}
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
                  {...register("email", {
                    required: "Vui lòng nhập email",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email không hợp lệ",
                    },
                  })}
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
                  {...register("phone", {
                    required: "Vui lòng nhập số điện thoại",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Số điện thoại không hợp lệ",
                    },
                  })}
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
                  {...register("password", {
                    required: "Vui lòng nhập mật khẩu",
                    minLength: {
                      value: 6,
                      message: "Mật khẩu phải có ít nhất 6 ký tự",
                    },
                  })}
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
                  {...register("confirmPassword", {
                    required: "Vui lòng xác nhận mật khẩu",
                    validate: (value) =>
                      value === watch("password") || "Mật khẩu không khớp",
                  })}
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

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-600 text-sm text-center"
            >
              {error}
            </motion.div>
          )}

          <div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white
                       bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500
                       transition-all duration-200 ease-in-out ${
                         isLoading ? "opacity-75 cursor-not-allowed" : ""
                       }`}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Đang đăng ký...
                </div>
              ) : (
                "Đăng Ký"
              )}
            </motion.button>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Register;
