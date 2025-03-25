import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../../types/product';
import { TrashIcon } from '@heroicons/react/24/outline';

interface CartItemProps {
  product: Product;
  quantity: number;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  product,
  quantity,
  onUpdateQuantity,
  onRemove,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md"
    >
      <img
        src={product.image}
        alt={product.title}
        className="w-24 h-24 object-cover rounded-lg"
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{product.title}</h3>
        <p className="text-gray-600">{product.description}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-orange-600 font-bold">
            {product.price.toLocaleString('vi-VN')}đ
          </span>
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onUpdateQuantity(product.id, quantity - 1)}
              className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200"
            >
              -
            </motion.button>
            <span className="w-8 text-center">{quantity}</span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onUpdateQuantity(product.id, quantity + 1)}
              className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200"
            >
              +
            </motion.button>
          </div>
        </div>
      </div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onRemove(product.id)}
        className="p-2 text-red-500 hover:text-red-700"
      >
        <TrashIcon className="w-6 h-6" />
      </motion.button>
    </motion.div>
  );
};

export default CartItem; 