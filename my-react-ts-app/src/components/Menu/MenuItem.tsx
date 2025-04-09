import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import { PlusIcon } from '@heroicons/react/24/outline';

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
  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L'>('M');

  const handleAddToCart = () => {
    dispatch(addToCart({
      id,
      name,
      price,
      image,
      quantity: 1,
      size: selectedSize
    }));
    setShowAddedAnimation(true);
    setTimeout(() => setShowAddedAnimation(false), 1500);
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
    >
      <div className="relative">
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={image}
          alt={name}
          className="w-full h-48 object-cover"
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleAddToCart}
          className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full shadow-lg hover:bg-red-700 transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
        </motion.button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <p className="text-gray-600 text-sm mt-1">{description}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex space-x-2">
            {(['S', 'M', 'L'] as const).map((size) => (
              <motion.button
                key={size}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedSize === size
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {size}
              </motion.button>
            ))}
          </div>
          <p className="text-red-600 font-medium">
            {(price * (selectedSize === 'S' ? 1 : selectedSize === 'M' ? 1.2 : 1.5)).toLocaleString('vi-VN')}đ
          </p>
        </div>
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