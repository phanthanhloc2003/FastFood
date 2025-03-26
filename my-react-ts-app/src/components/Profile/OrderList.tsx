import React from 'react';
import { motion } from 'framer-motion';
import { Order } from '../../types';

interface OrderListProps {
  orders: Order[];
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'processing':
    case 'shipping':
      return 'bg-blue-100 text-blue-800';
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  return (
    <div className="space-y-6">
      {orders.map((order, index) => (
        <motion.div
          key={order.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="border rounded-lg p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium">
                Đơn hàng #{order.orderNumber}
              </h3>
              <p className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString('vi-VN')}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                order.status
              )}`}
            >
              {order.status}
            </span>
          </div>
          <div className="mt-4 space-y-2">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between text-sm"
              >
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>{item.price.toLocaleString()}đ</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t flex justify-between items-center">
            <span className="font-medium">Tổng cộng:</span>
            <span className="text-lg font-bold text-primary-main">
              {order.totalAmount.toLocaleString()}đ
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default OrderList; 