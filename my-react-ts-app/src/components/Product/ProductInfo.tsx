import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/solid';

interface ProductInfoProps {
  title: string;
  price: number;
  description: string;
  rating: number;
  reviews: number;
  ingredients: string[];
  onAddToCart: (quantity: number) => void;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  title,
  price,
  description,
  rating,
  reviews,
  ingredients,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`h-5 w-5 ${
                  i < rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-gray-600">({reviews} đánh giá)</span>
        </div>
      </div>

      <div className="text-3xl font-bold text-red-600">
        {price.toLocaleString('vi-VN')}đ
      </div>

      <p className="text-gray-600 text-lg leading-relaxed">{description}</p>

      <div>
        <h2 className="text-xl font-semibold mb-3">Thành phần:</h2>
        <ul className="space-y-2">
          {ingredients.map((ingredient, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center text-gray-600"
            >
              <svg
                className="w-5 h-5 text-red-600 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {ingredient}
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-2 text-gray-600 hover:text-red-600"
          >
            -
          </button>
          <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-4 py-2 text-gray-600 hover:text-red-600"
          >
            +
          </button>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onAddToCart(quantity)}
          className="flex-1 bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
        >
          Thêm vào giỏ hàng
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductInfo; 