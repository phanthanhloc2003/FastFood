import React from 'react';
import { motion } from 'framer-motion';
import { TrashIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { CartItem as CartItemType } from '../../types';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../store/slices/cartSlice';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ productId: item.product.id, size: item.size, quantity: newQuantity }));
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart({ productId: item.product.id, size: item.size }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex items-center space-x-4 p-4 border rounded-lg"
    >
      <div className="w-20 h-20 rounded-lg overflow-hidden">
        <img
          src={item.product.images[0]?.url || '/placeholder.png'}
          alt={item.product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-medium">{item.product.name}</h3>
        <p className="text-primary-main font-bold">
          {item.product.price.toLocaleString()}đ
        </p>
        <div className="flex items-center space-x-2 mt-2">
          <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="p-1 hover:text-red-600 transition-colors"
            >
              <MinusIcon className="h-4 w-4" />
            </motion.button>
            <span className="w-8 text-center font-medium">{item.quantity}</span>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="p-1 hover:text-red-600 transition-colors"
            >
              <PlusIcon className="h-4 w-4" />
            </motion.button>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleRemove}
            className="text-red-500 hover:text-red-600"
          >
            <TrashIcon className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem; 