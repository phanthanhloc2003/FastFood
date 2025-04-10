import React from 'react';
import { motion } from 'framer-motion';
import { OrderStatusLog } from '../types/orderStatus';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

interface OrderStatusLogCardProps {
  log: OrderStatusLog;
}

const OrderStatusLogCard: React.FC<OrderStatusLogCardProps> = ({ log }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending':
        return '⏳';
      case 'Completed':
        return '✅';
      case 'Cancelled':
        return '❌';
      default:
        return '📝';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(log.status)}`}>
              {getStatusIcon(log.status)} {log.status}
            </span>
            <span className="text-sm text-gray-500">
              Mã đơn: #{log.order_id}
            </span>
          </div>
          <span className="text-xs text-gray-500">
            {new Date(log.created_at).toLocaleDateString('vi-VN', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
        <p className="text-gray-700 text-sm">{log.message}</p>
      </div>
    </motion.div>
  );
};

export default OrderStatusLogCard; 