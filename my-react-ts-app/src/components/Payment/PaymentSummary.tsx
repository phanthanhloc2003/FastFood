import React from 'react';
import { motion } from 'framer-motion';
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';

interface PaymentSummaryProps {
  amount: number;
  orderId: number;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({ amount, orderId }) => {
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
      <h2 className="text-xl font-bold text-gray-800 mb-4">Thông tin thanh toán</h2>
      
      <motion.div className="space-y-4" variants={itemVariants}>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Mã đơn hàng</span>
          <span className="font-medium text-gray-900">#{orderId}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Tổng tiền</span>
          <div className="flex items-center">
            <CurrencyDollarIcon className="w-5 h-5 text-primary-main mr-1" />
            <span className="font-bold text-primary-main text-xl">
              {amount.toLocaleString('vi-VN')} đ
            </span>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="mt-6 pt-4 border-t border-gray-200"
        variants={itemVariants}
      >
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Số tiền cần thanh toán</span>
          <div className="flex items-center">
            <CurrencyDollarIcon className="w-5 h-5 text-primary-main mr-1" />
            <span className="font-bold text-primary-main text-2xl">
              {amount.toLocaleString('vi-VN')} đ
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PaymentSummary; 