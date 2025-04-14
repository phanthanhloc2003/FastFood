import React from "react";
import { motion } from "framer-motion";
import { ShoppingBagIcon, MapPinIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { CartItem } from "../../types";
import { Address } from "../../types/address";

interface OrderDetailsProps {
  items: CartItem[];
  totalPrice: number;
  address: Address;
  deliveryType: "Dine-in" | "Take-away" | "Delivery";
  tableNumber?: number | null;
  onEditAddress?: () => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({
  items,
  totalPrice,
  address,
  deliveryType,
  tableNumber,
  onEditAddress,
}) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
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
        type: "spring",
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
          <div
            key={index}
            className="flex justify-between items-center py-2 border-b border-gray-100"
          >
            <div>
              <h3 className="font-medium text-gray-900">{item.product.name}</h3>
              <p className="text-sm text-gray-500">
                {item.size} • {item.quantity} phần
              </p>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-900">
                {(item.price * item.quantity).toLocaleString("vi-VN")} đ
              </p>
              <p className="text-sm text-gray-500">
                {item.price.toLocaleString("vi-VN")} đ/ phần
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
            {totalPrice.toLocaleString("vi-VN")} đ
          </span>
        </div>
      </motion.div>

      <motion.div
        className="mt-6 pt-4 border-t border-gray-200"
        variants={itemVariants}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <MapPinIcon className="w-6 h-6 text-primary-main mr-2" />
            <h2 className="text-xl font-bold text-gray-800">
              {deliveryType === "Dine-in" ? "Thông tin bàn" : "Địa chỉ giao hàng"}
            </h2>
          </div>
          {deliveryType === "Delivery" && (
            <motion.button
              className="flex items-center gap-2 text-primary-main hover:text-primary-dark"
              onClick={onEditAddress}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <PencilSquareIcon className="w-5 h-5" />
              <span>Thay đổi</span>
            </motion.button>
          )}
        </div>

        {deliveryType === "Dine-in" ? (
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-medium text-gray-900">Bàn số: {tableNumber}</p>
          </div>
        ) : (
          <motion.div 
            className="bg-gray-50 p-4 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-gray-900">{address.name}</p>
                <p className="text-gray-600">{address.phone}</p>
                <p className="text-gray-600 mt-1">
                  {address.address_line}, {address.ward}, {address.district}, {address.province}
                </p>
              </div>
              {address.is_default && (
                <span className="px-2 py-1 text-xs font-medium text-primary-main bg-primary-light/20 rounded-full">
                  Mặc định
                </span>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default OrderDetails;
