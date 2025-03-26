import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { setCredentials } from "../store/slices/authSlice";
import { login } from "../services/auth";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await login(formData.email, formData.password);
      dispatch(setCredentials({ user: response.user }));
        
    if (response?.access_token) {
      localStorage.setItem("accessToken", response.access_token); 
    }
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Có lỗi xảy ra khi đăng nhập");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
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
              Đăng Nhập
            </h2>
          </motion.div>
          <p className="mt-2 text-center text-sm text-gray-600">
            Hoặc{" "}
            <Link
              to="/register"
              className="font-medium text-orange-600 hover:text-orange-500 transition-colors"
            >
              đăng ký tài khoản mới
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1 relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                           focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm
                           transition-all duration-200 ease-in-out
                           hover:border-orange-400"
                  placeholder="example@email.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Mật khẩu
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                           focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm
                           transition-all duration-200 ease-in-out
                           hover:border-orange-400"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded
                         transition-all duration-200 ease-in-out"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Ghi nhớ đăng nhập
              </label>
            </div>

            <div className="text-sm">
              <Link
                to="/forgot-password"
                className="font-medium text-orange-600 hover:text-orange-500 transition-colors"
              >
                Quên mật khẩu?
              </Link>
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-600 text-sm bg-red-50 p-3 rounded-md"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white
                       bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500
                       transition-all duration-200 ease-in-out
                       ${isLoading ? "opacity-75 cursor-not-allowed" : ""}`}
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
                  Đang đăng nhập...
                </div>
              ) : (
                "Đăng nhập"
              )}
            </motion.button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Hoặc đăng nhập với
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
            >
              <span className="sr-only">Đăng nhập với Google</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
              </svg>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
            >
              <span className="sr-only">Đăng nhập với Facebook</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
