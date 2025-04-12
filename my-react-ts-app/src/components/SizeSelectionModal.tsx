import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product, ProductSize } from '../types/product';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

interface SizeSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  onAddToCart: (product: Product, size: ProductSize, quantity: number) => void;
}

const SizeSelectionModal: React.FC<SizeSelectionModalProps> = ({
  isOpen,
  onClose,
  product,
  onAddToCart,
}) => {
  const [selectedSize, setSelectedSize] = React.useState<ProductSize | null>(null);
  const [quantity, setQuantity] = React.useState(1);

  const formatPrice = (price: string | number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    }).format(Number(price));
  };

  const handleAddToCart = () => {
    if (selectedSize) {
      onAddToCart(product, selectedSize, quantity);
      onClose();
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl p-6 w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Chọn kích thước</h3>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={product.images[0]?.url || 'https://via.placeholder.com/400x300'}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{product.name}</h4>
                  <p className="text-sm text-gray-500">{product.categoryId.name}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => setSelectedSize(size)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedSize?.id === size.id
                        ? 'border-red-600 bg-red-50 text-red-600'
                        : 'border-gray-200 hover:border-red-200'
                    }`}
                  >
                    <div className="font-medium">{size.size.toUpperCase()}</div>
                    <div className="text-sm">{formatPrice(size.price)}</div>
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">Số lượng:</span>
                <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-2">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="p-1 hover:text-red-600 transition-colors"
                  >
                    <MinusIcon className="h-4 w-4" />
                  </motion.button>
                  <span className="w-8 text-center font-medium">{quantity}</span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="p-1 hover:text-red-600 transition-colors"
                  >
                    <PlusIcon className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  selectedSize
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SizeSelectionModal; 