import React from 'react';
import { motion } from 'framer-motion';
import { CreditCardIcon, BanknotesIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { PaymentMethod } from '../../types/payment';

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod;
  onMethodChange: (method: PaymentMethod) => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedMethod,
  onMethodChange,
}) => {
  const methods = [
    {
      id: 'Cash',
      name: 'Tiền mặt',
      icon: BanknotesIcon,
      description: 'Thanh toán bằng tiền mặt khi nhận hàng',
    },
    {
      id: 'Card',
      name: 'Thẻ tín dụng',
      icon: CreditCardIcon,
      description: 'Thanh toán bằng thẻ Visa, Mastercard',
    },
    {
      id: 'Online',
      name: 'Chuyển khoản',
      icon: GlobeAltIcon,
      description: 'Chuyển khoản ngân hàng trực tuyến',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
    hover: {
      scale: 1.02,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10,
      },
    },
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {methods.map((method) => {
        const Icon = method.icon;
        const isSelected = selectedMethod === method.id;

        return (
          <motion.div
            key={method.id}
            variants={itemVariants}
            whileHover="hover"
            className={`relative p-4 rounded-xl border-2 cursor-pointer transition-colors ${
              isSelected
                ? 'border-primary-main bg-primary-main/5'
                : 'border-gray-200 hover:border-primary-main/50'
            }`}
            onClick={() => onMethodChange(method.id as PaymentMethod)}
          >
            {isSelected && (
              <motion.div
                className="absolute top-0 right-0 w-6 h-6 bg-primary-main rounded-bl-xl"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              />
            )}
            <div className="flex flex-col items-center text-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                  isSelected ? 'bg-primary-main text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-medium text-gray-900 mb-1">{method.name}</h3>
              <p className="text-sm text-gray-500">{method.description}</p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default PaymentMethodSelector; 