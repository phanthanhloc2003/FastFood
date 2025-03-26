import React from 'react';
import { motion } from 'framer-motion';

interface MenuItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ name, description, price, image }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 rounded-bl-lg">
          {price.toLocaleString('vi-VN')}đ
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
        <motion.button
          className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
          whileTap={{ scale: 0.95 }}
        >
          Thêm vào giỏ hàng
        </motion.button>
      </div>
    </motion.div>
  );
};

export default MenuItem; 