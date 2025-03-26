import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';

interface MenuItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ id, name, description, price, image }) => {
  const dispatch = useDispatch();
  const [showAddedAnimation, setShowAddedAnimation] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart({ id, name, price, image }));
    setShowAddedAnimation(true);
    setTimeout(() => setShowAddedAnimation(false), 1500);
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden relative"
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
          className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 relative overflow-hidden"
          whileTap={{ scale: 0.95 }}
          onClick={handleAddToCart}
        >
          Thêm vào giỏ hàng
        </motion.button>
      </div>

      <AnimatePresence>
        {showAddedAnimation && (
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                       bg-green-500 text-white px-4 py-2 rounded-full shadow-lg"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            Đã thêm vào giỏ!
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MenuItem; 