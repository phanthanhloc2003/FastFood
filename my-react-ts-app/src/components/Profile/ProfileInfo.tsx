import React from 'react';
import { motion } from 'framer-motion';
import { User } from '../../types';

interface ProfileInfoProps {
  user: User | null;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ user }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label className="block text-sm font-medium text-gray-700">
            Họ và tên
          </label>
          <input
            type="text"
            defaultValue={user?.fullName}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-main focus:ring-primary-main sm:text-sm"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            defaultValue={user?.email}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-main focus:ring-primary-main sm:text-sm"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-sm font-medium text-gray-700">
            Số điện thoại
          </label>
          <input
            type="tel"
            defaultValue={user?.phone}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-main focus:ring-primary-main sm:text-sm"
          />
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex justify-end"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-primary-main text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
        >
          Lưu thay đổi
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ProfileInfo; 