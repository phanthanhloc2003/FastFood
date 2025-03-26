import React from 'react';
import { motion } from 'framer-motion';
import { TrashIcon } from '@heroicons/react/24/outline';
import { CartItem as CartItemType } from '../../types';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../store/slices/cartSlice';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
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
          src={item.image || '/placeholder.png'}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-primary-main font-bold">
          {item.price.toLocaleString()}đ
        </p>
        <div className="flex items-center space-x-2 mt-2">
          <select
            value={item.quantity}
            onChange={handleQuantityChange}
            className="rounded border-gray-300 text-sm"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
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