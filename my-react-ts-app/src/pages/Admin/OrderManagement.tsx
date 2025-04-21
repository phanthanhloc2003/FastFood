import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { orderApi } from "../../services/order";
import { OrderResponse } from "../../types/orderStatus";
import { format } from "date-fns";
import {
  CheckCircleIcon,
  XCircleIcon,
  ShoppingBagIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const OrderManagement: React.FC = () => {
  const navigate = useNavigate()
  const [orders, setOrders] = useState<OrderResponse[]| []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [filter, setFilter] = useState<
    "Pending" | "Confirmed" | "Cancelled" | "Completed"
  >("Pending");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const data = await orderApi.getAllOrders(filter);
        if (data) {
          setOrders(data);
        }
      } catch (error) {
        console.error("Lỗi khi tải danh sách đơn hàng:", error);
        setNotificationMessage("Có lỗi xảy ra khi tải danh sách đơn hàng!");
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, [filter]);


  const goToOrderDetail= (id:number) => {
    navigate(`/admin/orders/${id}`)
  }

  const handleConfirmOrder = async (orderId: number) => {
    try {
      setOrders(
        orders.map((order) => {
          if (order.id === orderId) {
            return {
              ...order,
              status: "Confirmed",
              updated_at: new Date().toISOString(),
            };
          }
          return order;
        })
      );
      setNotificationMessage("Xác nhận đơn hàng thành công!");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } catch (error) {
      console.error("Lỗi khi xác nhận đơn hàng:", error);
      setNotificationMessage("Có lỗi xảy ra khi xác nhận đơn hàng!");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  const handleCancelOrder = async (orderId: number) => {
    try {
      setOrders(
        orders.map((order) => {
          if (order.id === orderId) {
            return {
              ...order,
              status: "Cancelled",
              updated_at: new Date().toISOString(),
            };
          }
          return order;
        })
      );
      setNotificationMessage("Hủy đơn hàng thành công!");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } catch (error) {
      console.error("Lỗi khi hủy đơn hàng:", error);
      setNotificationMessage("Có lỗi xảy ra khi hủy đơn hàng!");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  const filteredOrders = orders.filter((order) => order.status === filter);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100">
        <motion.div
          className="flex flex-col items-center space-y-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full relative"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <motion.div
              className="absolute inset-0 border-4 border-orange-200 rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
          <motion.p
            className="text-gray-600 font-medium bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Đang tải dữ liệu...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent"
          >
            Quản Lý Đơn Hàng
          </motion.h1>
          <div className="flex gap-2">
            {(["Pending", "Confirmed", "Cancelled", "Completed"] as const).map(
              (status) => (
                <motion.button
                  key={status}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    filter === status
                      ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg"
                      : "bg-white text-gray-600 hover:bg-orange-50"
                  }`}
                >
                  {status}
                </motion.button>
              )
            )}
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden">
          <AnimatePresence>
            {filteredOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-4 mb-4 backdrop-blur-sm bg-white/80"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="h-16 w-16 rounded-full bg-orange-100 flex items-center justify-center border-2 border-orange-200">
                      <ShoppingBagIcon className="h-8 w-8 text-orange-500" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          #{order.order_code}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <ClockIcon className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            {format(
                              new Date(order.created_at),
                              "HH:mm dd/MM/yyyy"
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPinIcon className="h-4 w-4 text-gray-500" />
                          <div className="text-sm text-gray-900">
                            {order.address ? (
                              <>
                                {order.address.address_line}, {order.address.ward},{" "}
                                {order.address.district}, {order.address.province}
                              </>
                            ) : (
                              <span className="text-gray-500">Không có địa chỉ</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <CurrencyDollarIcon className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(Number(order.total_price))}
                          </span>
                        </div>
                        <span
                          className={`inline-block mt-2 px-2 py-1 text-xs font-medium rounded-full ${
                            order.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : order.status === "Confirmed"
                              ? "bg-blue-100 text-blue-800"
                              : order.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      {order.status === "Pending" && (
                        <div className="flex items-center gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleConfirmOrder(order.id)}
                            className="p-2 text-green-600 hover:text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                          >
                            <CheckCircleIcon className="w-5 h-5" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleCancelOrder(order.id)}
                            className="p-2 text-red-600 hover:text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                          >
                            <XCircleIcon className="w-5 h-5" />
                          </motion.button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Desktop View */}
        <div className="hidden md:block">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm bg-white/80"
          >
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-orange-50 to-orange-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-orange-600 uppercase tracking-wider">
                    Mã đơn
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-orange-600 uppercase tracking-wider">
                    Thời gian
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-orange-600 uppercase tracking-wider">
                    Địa chỉ
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-orange-600 uppercase tracking-wider">
                    Tổng tiền
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-orange-600 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-orange-600 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <AnimatePresence>
                  {filteredOrders.map((order, index) => (
                    <motion.tr
                    onClick={() => goToOrderDetail(order.id)}
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-orange-50/50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{order.order_code}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {format(new Date(order.created_at), "HH:mm dd/MM/yyyy")}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <div className="text-sm text-gray-900">
                          {order.address ? (
                            <>
                              {order.address.address_line}, {order.address.ward},{" "}
                              {order.address.district}, {order.address.province}
                            </>
                          ) : (
                            <span className="text-gray-500">Không có địa chỉ</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(Number(order.total_price))}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            order.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : order.status === "Confirmed"
                              ? "bg-blue-100 text-blue-800"
                              : order.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {order.status === "Pending" && (
                          <div className="flex items-center justify-end gap-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleConfirmOrder(order.id)}
                              className="p-2 text-green-600 hover:text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                            >
                              <CheckCircleIcon className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleCancelOrder(order.id)}
                              className="p-2 text-red-600 hover:text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                            >
                              <XCircleIcon className="w-5 h-5" />
                            </motion.button>
                          </div>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </motion.div>
        </div>

        {/* Notification */}
        <AnimatePresence>
          {showNotification && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed top-4 right-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl shadow-lg z-50"
            >
              <div className="flex items-center gap-2">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>{notificationMessage}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default OrderManagement;
