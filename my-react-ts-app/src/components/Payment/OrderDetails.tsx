import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBagIcon, MapPinIcon } from '@heroicons/react/24/outline';

interface OrderItem {
  productName: string;
  size: string;
  price: number;
  quantity: number;
  total: number;
}

interface Address {
  address_line: string;
  ward: string;
  district: string;
  city: string;
}

interface OrderDetailsProps {
  items: OrderItem[];
  totalPrice: number;
  address: Address;
  deliveryType: 'table' | 'address';
  tableNumber?: string;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({
  items,
  totalPrice,
  address,
  deliveryType,
  tableNumber,
}) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center mb-4">
        <ShoppingBagIcon className="w-6 h-6 text-primary-main mr-2" />
        <h2 className="text-xl font-bold text-gray-800">Chi tiết đơn hàng</h2>
      </div>

      <motion.div className="space-y-4" variants={itemVariants}>
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
            <div>
              <h3 className="font-medium text-gray-900">{item.productName}</h3>
              <p className="text-sm text-gray-500">
                {item.size} • {item.quantity} phần
              </p>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-900">
                {item.total.toLocaleString('vi-VN')} đ
              </p>
              <p className="text-sm text-gray-500">
                {item.price.toLocaleString('vi-VN')} đ/ phần
              </p>
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div
        className="mt-6 pt-4 border-t border-gray-200"
        variants={itemVariants}
      >
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">Tổng tiền</span>
          <span className="font-bold text-primary-main text-xl">
            {totalPrice.toLocaleString('vi-VN')} đ
          </span>
        </div>
      </motion.div>

      <motion.div
        className="mt-6 pt-4 border-t border-gray-200"
        variants={itemVariants}
      >
        <div className="flex items-center mb-4">
          <MapPinIcon className="w-6 h-6 text-primary-main mr-2" />
          <h2 className="text-xl font-bold text-gray-800">
            {deliveryType === 'table' ? 'Thông tin bàn' : 'Địa chỉ giao hàng'}
          </h2>
        </div>

        {deliveryType === 'table' ? (
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-medium text-gray-900">Bàn số: {tableNumber}</p>
          </div>
        ) : (
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-medium text-gray-900">{address.address_line}</p>
            <p className="text-gray-600">
              {address.ward}, {address.district}, {address.city}
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default OrderDetails; 