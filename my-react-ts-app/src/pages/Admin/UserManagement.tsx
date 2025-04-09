import React from 'react';
import { motion } from 'framer-motion';

const UserManagement: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <h1 className="text-2xl font-bold mb-6">Quản lý người dùng</h1>
      {/* Thêm nội dung quản lý người dùng ở đây */}
    </motion.div>
  );
};

export default UserManagement; 