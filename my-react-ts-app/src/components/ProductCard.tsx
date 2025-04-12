import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../types/product';
import SizeSelectionModal from './SizeSelectionModal';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product, size: any) => void;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, index }) => {
  const [isSizeModalOpen, setIsSizeModalOpen] = React.useState(false);
  const navigate = useNavigate();

  const formatPrice = (price: string | number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    }).format(Number(price));
  };

  const handleAddToCart = (product: Product, size: any) => {
    onAddToCart?.(product, size);
  };

  const handleViewDetail = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          duration: 0.8,
          delay: index * 0.1,
          ease: [0.25, 0.1, 0.25, 1],
          opacity: { duration: 0.6 },
          y: { duration: 0.8 },
          scale: { duration: 0.8 }
        }}
        viewport={{ once: true, margin: "-100px" }}
        className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer"
        onClick={handleViewDetail}
      >
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.images[0]?.url || 'https://via.placeholder.com/400x300'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {product.rating > 0 && (
            <div className="absolute top-3 right-3 bg-white bg-opacity-90 px-3 py-1 rounded-full flex items-center shadow-md">
              <span className="text-yellow-400 mr-1">★</span>
              <span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="p-5">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
              {product.name}
            </h3>
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {product.categoryId.name}
            </span>
          </div>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>

          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-red-600">
              {formatPrice(product.price)}
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsSizeModalOpen(true);
              }}
              className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors text-sm font-medium flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Thêm vào giỏ
            </motion.button>
          </div>
        </div>
      </motion.div>

      <SizeSelectionModal
        isOpen={isSizeModalOpen}
        onClose={() => setIsSizeModalOpen(false)}
        product={product}
        onAddToCart={handleAddToCart}
      />
    </>
  );
};

export default ProductCard; 