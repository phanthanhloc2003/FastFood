import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { orderApi } from "../../services/order";
import { format } from "date-fns";
import {
  ArrowLeftIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { StatusLog } from "../../types/orderStatus";


const OrderStatusLogs: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [logs, setLogs] = useState<StatusLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [orderCode, setOrderCode] = useState("");

  useEffect(() => {
    const fetchStatusLogs = async () => {
      try {
        setIsLoading(true);
        if (id) {
          const data = await orderApi.getOrderStatusLogs(id);
          setLogs(data);
          // Lấy mã đơn hàng từ API
          const orderDetail = await orderApi.getOrderDetails(id);
          setOrderCode(orderDetail.order_code);
        }
      } catch (error) {
        console.error("Lỗi khi tải lịch sử trạng thái:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStatusLogs();
  }, [id]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircleIcon className="w-6 h-6 text-green-500" />;
      case "Cancelled":
        return <XCircleIcon className="w-6 h-6 text-red-500" />;
      default:
        return <ExclamationCircleIcon className="w-6 h-6 text-orange-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-orange-100 text-orange-800";
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
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg bg-white shadow-sm hover:bg-orange-50 transition-colors"
          >
            <ArrowLeftIcon className="w-6 h-6 text-gray-600" />
          </motion.button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
              Lịch sử trạng thái đơn hàng #{orderCode}
            </h1>
            <p className="text-gray-600 mt-1">
              Theo dõi quá trình xử lý đơn hàng
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-2xl shadow-lg p-6 backdrop-blur-sm bg-white/80">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-orange-200" />

            {/* Timeline items */}
            <div className="space-y-8">
              {logs.map((log, index) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-12"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 w-6 h-6 rounded-full bg-white flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-orange-500" />
                  </div>

                  {/* Content */}
                  <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusIcon(log.status)}
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          log.status
                        )}`}
                      >
                        {log.status}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2">{log.message}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <ClockIcon className="w-4 h-4" />
                      <span>
                        {format(new Date(log.created_at), "HH:mm dd/MM/yyyy")}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderStatusLogs; 