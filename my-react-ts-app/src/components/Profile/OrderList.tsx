import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { orderApi } from '../../services/order';
import { OrderResponse } from '../../types/orderStatus';
import { format } from 'date-fns';
import { 
  ShoppingBagIcon, 
  ClockIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  TruckIcon,
  CalendarIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCancelling, setIsCancelling] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await orderApi.getHistory();
        if (data) {
          setOrders(data);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCancelOrder = async (orderId: number, reason: string) => {
    try {
      setIsCancelling(orderId);
      setOrders(orders.map(order => {
        if (order.id === orderId) {
          return {
            ...order,
            status: 'Cancelled',
            updated_at: new Date().toISOString()
          };
        }
        return order;
      }));
    } catch (error) {
      console.error('Error cancelling order:', error);
    } finally {
      setIsCancelling(null);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending':
        return <ClockIcon className="w-5 h-5 text-yellow-500" />;
      case 'Completed':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'Cancelled':
        return <XCircleIcon className="w-5 h-5 text-red-500" />;
      default:
        return <ClockIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  if (isLoading) {
    return (
      <div className="min-h-[400px] bg-gradient-to-br from-orange-50 via-orange-100 to-orange-50 flex items-center justify-center rounded-xl shadow-lg">
        <motion.div
          className="flex flex-col items-center gap-4"
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
          <motion.h2
            className="text-xl font-bold text-gray-900 bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Đang tải đơn hàng...
          </motion.h2>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-4 md:p-0"
    >
      {/* Filter Buttons */}
      <motion.div 
        className="flex flex-wrap gap-3 justify-start mb-6 overflow-x-auto pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-full flex items-center gap-2 shadow-md transition-all ${
            filter === 'all' 
              ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white' 
              : 'bg-white hover:bg-orange-50'
          }`}
        >
          <ShoppingBagIcon className="w-5 h-5" />
          <span className="whitespace-nowrap">Tất cả ({orders.length})</span>
        </motion.button>
        {['Pending', 'Completed', 'Cancelled'].map((status) => (
          <motion.button
            key={status}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-full flex items-center gap-2 shadow-md transition-all ${
              filter === status 
                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white' 
                : 'bg-white hover:bg-orange-50'
            }`}
          >
            {getStatusIcon(status)}
            <span className="whitespace-nowrap">
              {status === 'Pending' ? 'Đang xử lý' :
               status === 'Completed' ? 'Đã hoàn thành' :
               'Đã hủy'} ({orders.filter(o => o.status === status).length})
            </span>
          </motion.button>
        ))}
      </motion.div>

      {/* Orders List */}
      <AnimatePresence mode="popLayout">
        {filteredOrders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            layout
            className="group"
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden backdrop-blur-lg bg-opacity-90 hover:shadow-xl transition-all duration-300 border border-orange-100">
              {/* Header */}
              <div className="p-4 md:p-6 border-b border-gray-200 bg-gradient-to-r from-orange-500 to-orange-600 text-white relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  initial={false}
                  animate={{ scale: [1, 1.2], opacity: [0, 0.1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                      <span className="text-lg font-bold">
                        #{order.order_code}
                      </span>
                      <div className="flex items-center gap-2 text-orange-100">
                        <CalendarIcon className="w-4 h-4" />
                        <span className="text-sm">
                          {format(new Date(order.created_at), "HH:mm dd/MM/yyyy")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium ${
                    order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    order.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {getStatusIcon(order.status)}
                    <span className="hidden sm:inline">
                      {order.status === 'Pending' ? 'Đang xử lý' :
                       order.status === 'Completed' ? 'Đã hoàn thành' :
                       order.status === 'Cancelled' ? 'Đã hủy' : order.status}
                    </span>
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 md:p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Delivery Info */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-orange-100 rounded-xl">
                      <TruckIcon className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">Thông tin giao hàng</h3>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p className="flex items-center gap-2">
                          <MapPinIcon className="w-4 h-4 text-orange-500" />
                          <span>{order.address.address_line}</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <PhoneIcon className="w-4 h-4 text-orange-500" />
                          <span>{order.address.phone || 'Chưa có số điện thoại'}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Price Info */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-orange-100 rounded-xl">
                      <CurrencyDollarIcon className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">Thông tin thanh toán</h3>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">Tổng tiền:</p>
                        <p className="text-2xl font-bold text-orange-600">
                          {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                          }).format(Number(order.total_price))}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cancel Button */}
                {order.status === 'Pending' && (
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    disabled={isCancelling === order.id}
                    onClick={() => handleCancelOrder(order.id, 'Khách hàng yêu cầu hủy')}
                    className="w-full mt-4 px-6 py-3 text-sm font-medium text-red-600 border-2 border-red-600 rounded-xl hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <XCircleIcon className="w-5 h-5" />
                    {isCancelling === order.id ? 'Đang hủy đơn hàng...' : 'Hủy đơn hàng'}
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-12 bg-white rounded-2xl shadow-lg"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <ShoppingBagIcon className="w-16 h-16 text-orange-300 mx-auto mb-4" />
          </motion.div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">Chưa có đơn hàng nào</h3>
          <p className="text-gray-500">Hãy đặt hàng để trải nghiệm dịch vụ của chúng tôi</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default OrderList; 