import React from 'react';
import { motion } from 'framer-motion';

const ProductManagement: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <h1 className="text-2xl font-bold mb-6">Quản lý sản phẩm</h1>
      {/* Thêm nội dung quản lý sản phẩm ở đây */}
    </motion.div>
  );
};

export default ProductManagement; 