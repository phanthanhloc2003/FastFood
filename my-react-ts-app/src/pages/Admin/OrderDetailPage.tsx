import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { orderApi } from "../../services/order";
import { IOrderResponseDetail, OrderResponse } from "../../types/orderStatus";
import { CartItemResponse } from "../../types/cart";
import { format } from "date-fns";
import {
  CheckCircleIcon,
  XCircleIcon,
  ShoppingBagIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  ClockIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  CreditCardIcon,
  TruckIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";

const OrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<IOrderResponseDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        setIsLoading(true);
        if (id) {
          const data = await orderApi.getOrderDetails(id);
          if (data) {
            setOrder(data);
          }
        }
      } catch (error) {
        console.error("Lỗi khi tải chi tiết đơn hàng:", error);
        setNotificationMessage("Có lỗi xảy ra khi tải chi tiết đơn hàng!");
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrderDetail();
  }, [id]);

  const handleConfirmOrder = async () => {
    if (!order) return;
    try {
      setIsUpdating(true);
      await orderApi.confirmOrder(order.id);
      setOrder({ ...order, status: "Confirmed" });
      setNotificationMessage("Xác nhận đơn hàng thành công!");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } catch (error) {
      console.error("Lỗi khi xác nhận đơn hàng:", error);
      setNotificationMessage("Có lỗi xảy ra khi xác nhận đơn hàng!");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancelOrder = async () => {
    if (!order) return;
    try {
      setIsUpdating(true);
    //   await orderApi.cancelOrder(order.id);
      setOrder({ ...order, status: "Cancelled" });
      setNotificationMessage("Hủy đơn hàng thành công!");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } catch (error) {
      console.error("Lỗi khi hủy đơn hàng:", error);
      setNotificationMessage("Có lỗi xảy ra khi hủy đơn hàng!");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } finally {
      setIsUpdating(false);
    }
  };

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
            className="w-20 h-20 border-4 border-orange-500 border-t-transparent rounded-full relative"
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
            <motion.div
              className="absolute inset-0 border-4 border-orange-300 rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
            />
          </motion.div>
          <motion.p
            className="text-gray-600 font-medium bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent text-xl"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Đang tải dữ liệu...
          </motion.p>
          <motion.p
            className="text-gray-500 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Vui lòng đợi trong giây lát
          </motion.p>
        </motion.div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Không tìm thấy đơn hàng
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/admin/orders")}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Quay lại
          </motion.button>
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
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/admin/orders")}
            className="p-2 rounded-lg bg-white shadow-sm hover:bg-orange-50 transition-colors"
          >
            <ArrowLeftIcon className="w-6 h-6 text-gray-600" />
          </motion.button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
              Chi tiết đơn hàng #{order.order_code}
            </h1>
            <p className="text-gray-600 mt-1">
              {format(new Date(order.created_at), "HH:mm dd/MM/yyyy")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Thông tin khách hàng */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6 backdrop-blur-sm bg-white/80"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Thông tin khách hàng
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <UserIcon className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Họ tên</p>
                  <p className="font-medium text-gray-800">
                    {order.user.fullName}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <PhoneIcon className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Số điện thoại</p>
                  <p className="font-medium text-gray-800">
                    {order.user.phone}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <EnvelopeIcon className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-800">
                    {order.user.email}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Thông tin địa chỉ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6 backdrop-blur-sm bg-white/80"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Thông tin địa chỉ
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <MapPinIcon className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Địa chỉ</p>
                  <p className="font-medium text-gray-800">
                    {order.address?.address_line}, {order.address?.ward},{" "}
                    {order.address?.district}, {order.address?.province}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <UserIcon className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Người nhận</p>
                  <p className="font-medium text-gray-800">
                    {order.address?.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <PhoneIcon className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Số điện thoại</p>
                  <p className="font-medium text-gray-800">
                    {order.address?.phone}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Thông tin thanh toán */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-6 backdrop-blur-sm bg-white/80"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Thông tin thanh toán
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <CreditCardIcon className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    Phương thức thanh toán
                  </p>
                  <p className="font-medium text-gray-800">

                    {order.payments.map(item => {
                      return item.payment_method || "chưa cập nhật"
                    })}
                    {/* {order.payments.payment_method || "Chưa cập nhật"} */}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <CurrencyDollarIcon className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tổng tiền</p>
                  <p className="font-medium text-gray-800">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(Number(order.total_price))}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <TruckIcon className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Hình thức giao hàng</p>
                  <p className="font-medium text-gray-800">
                    {order.delivery_type}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Danh sách sản phẩm */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 bg-white rounded-2xl shadow-lg p-6 backdrop-blur-sm bg-white/80"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Danh sách sản phẩm
            </h2>
            <motion.div
              className="flex items-center gap-2 text-orange-500"
              whileHover={{ scale: 1.05 }}
            >
              <ShoppingBagIcon className="w-5 h-5" />
              <span className="text-sm font-medium">
                {order.items.length} sản phẩm
              </span>
            </motion.div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-orange-50">
                  <th className="px-6 py-4 text-left text-xs font-medium text-orange-600 uppercase tracking-wider rounded-tl-lg">
                    Sản phẩm
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-orange-600 uppercase tracking-wider">
                    Kích thước
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-orange-600 uppercase tracking-wider">
                    Số lượng
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-orange-600 uppercase tracking-wider">
                    Đơn giá
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-orange-600 uppercase tracking-wider rounded-tr-lg">
                    Thành tiền
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {order.items.map((item, index) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="hover:bg-orange-50/50 transition-colors duration-200 group"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <motion.div
                          className="relative h-20 w-20 rounded-lg overflow-hidden bg-gray-100 shadow-sm group-hover:shadow-md transition-shadow"
                          whileHover={{ scale: 1.05 }}
                        >
                          <img
                            src={item.product_size.product.images[0]?.url || "/placeholder-food.jpg"}
                            alt={item.product_name}
                            className="h-full w-full object-cover"
                          />
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                          />
                          {item.product_size.product.images.length > 1 && (
                            <motion.div
                              className="absolute bottom-1 right-1 bg-white/90 rounded-full px-2 py-1 text-xs text-gray-700 shadow-sm"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                            >
                              +{item.product_size.product.images.length - 1}
                            </motion.div>
                          )}
                        </motion.div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                            {item.product_name}
                          </div>
                          <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                            {item.product_size.product.description}
                          </div>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {item.product_size.product.ingredients.map((ingredient, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800"
                              >
                                {ingredient}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">
                        {item.size}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 flex items-center justify-center bg-orange-100 text-orange-600 rounded-full font-medium">
                          {item.quantity}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(Number(item.price))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-orange-600">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(Number(item.price) * item.quantity)}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Nút xác nhận/hủy đơn hàng */}
        {order.status === "Pending" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 flex justify-end gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCancelOrder}
              disabled={isUpdating}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUpdating ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Đang xử lý...</span>
                </div>
              ) : (
                "Hủy đơn hàng"
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleConfirmOrder}
              disabled={isUpdating}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUpdating ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Đang xử lý...</span>
                </div>
              ) : (
                "Xác nhận đơn hàng"
              )}
            </motion.button>
          </motion.div>
        )}

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

export default OrderDetailPage;
