import React from "react";
import { motion } from "framer-motion";
import { ShoppingBagIcon, MapPinIcon, PencilSquareIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Address } from "../../types/address";
import { useNavigate } from "react-router-dom";
import { CartItemResponse } from "../../types/cart";

interface OrderDetailsProps {
  items: CartItemResponse[];
  totalPrice: number;
  address: Address | null;
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
  const navigate = useNavigate();
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

  const productVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 100,
      },
    }),
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
          <motion.div
            key={index}
            className="flex items-center gap-4 py-3 border-b border-gray-100"
            custom={index}
            variants={productVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative w-16 h-16 flex-shrink-0">
              <motion.img
                src={item.productSize.product.images[0].url}
                alt={item.productSize.product.name}
                className="w-full h-full object-cover rounded-lg"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              />
              <motion.div
                className="absolute -top-2 -right-2 bg-primary-main text-white text-xs font-medium rounded-full w-6 h-6 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {item.quantity}
              </motion.div>
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{item.productSize.product.name}</h3>
              <p className="text-sm text-gray-500">
                {item.productSize.size} • {item.quantity} phần
              </p>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-900">
                {(item.productSize.price * item.quantity).toLocaleString("vi-VN")} đ
              </p>
              <p className="text-sm text-gray-500">
                {(item.productSize.price  * 1).toLocaleString("vi-VN")} /phần
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="mt-6 pt-4 border-t border-gray-200"
        variants={itemVariants}
      >
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">Tổng tiền</span>
          <motion.span 
            className="font-bold text-primary-main text-xl"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {totalPrice.toLocaleString("vi-VN")} đ
          </motion.span>
        </div>
      </motion.div>

      {deliveryType === "Take-away" ? <></> : 
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
          <motion.div 
            className="bg-gray-50 p-4 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="font-medium text-gray-900">Bàn số: {tableNumber}</p>
          </motion.div>
        ) : (
          <motion.div 
            className="bg-gray-50 p-4 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {!address ? (
              <motion.div
                className="flex flex-col items-center justify-center py-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                onClick={() => {
                  navigate('/address')
                }}
              >
                <motion.div
                  className="w-16 h-16 bg-primary-light/20 rounded-full flex items-center justify-center mb-4"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <PlusIcon className="w-8 h-8 text-primary-main" />
                </motion.div>
                <p className="text-gray-600 mb-4">Bạn chưa có địa chỉ giao hàng</p>
              </motion.div>
            ) : (
              <motion.div 
                className="flex items-start justify-between"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <div>
                  <motion.p 
                    className="font-medium text-gray-900"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    {address.name}
                  </motion.p>
                  <motion.p 
                    className="text-gray-600"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {address.phone}
                  </motion.p>
                  <motion.p 
                    className="text-gray-600 mt-1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {address.address_line}, {address.ward}, {address.district}, {address.province}
                  </motion.p>
                </div>
                {address.is_default && (
                  <motion.span 
                    className="px-2 py-1 text-xs font-medium text-primary-main bg-primary-light/20 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    Mặc định
                  </motion.span>
                )}
              </motion.div>
            )}
          </motion.div>
        )}
      </motion.div>}

    
    </motion.div>
  );
};

export default OrderDetails;
