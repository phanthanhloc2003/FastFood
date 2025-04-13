import React from 'react';
import { motion } from 'framer-motion';
import { UserCircleIcon, CameraIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { IUser } from '../../types';

interface ProfileHeaderProps {
  user: IUser | null;
  avatarPreview: string | null;
  onAvatarClick: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  user,
  avatarPreview,
  onAvatarClick,
}) => {
  return (
    <div className="relative bg-gradient-to-r from-primary-main to-secondary-main">
      {/* Mobile view - smaller height */}
      <div className="md:hidden h-32 bg-gradient-to-r from-primary-main to-secondary-main">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-16 h-16 rounded-full border-2 border-white shadow-lg overflow-hidden"
              >
                {user?.avatar || avatarPreview ? (
                  <motion.img
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                    src={avatarPreview || user?.avatar}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-white flex items-center justify-center">
                    <UserCircleIcon className="w-10 h-10 text-gray-400" />
                  </div>
                )}
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onAvatarClick}
                className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md hover:bg-gray-50 transition-colors opacity-0 group-hover:opacity-100"
              >
                <CameraIcon className="w-3 h-3 text-gray-600" />
              </motion.button>
            </div>
            <div className="text-white">
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-lg font-bold"
              >
                {user?.fullName}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white/80 text-xs"
              >
                {user?.email}
              </motion.p>
              {user?.role === 'admin' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center mt-1 text-xs bg-white/20 px-2 py-0.5 rounded-full w-fit"
                >
                  <ShieldCheckIcon className="w-3 h-3 mr-1" />
                  <span>Quản trị viên</span>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop view - larger height */}
      <div className="hidden md:block h-48 bg-gradient-to-r from-primary-main to-secondary-main">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-end space-x-6">
            <div className="relative group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden"
              >
                {user?.avatar || avatarPreview ? (
                  <motion.img
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                    src={avatarPreview || user?.avatar}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-white flex items-center justify-center">
                    <UserCircleIcon className="w-24 h-24 text-gray-400" />
                  </div>
                )}
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onAvatarClick}
                className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors opacity-0 group-hover:opacity-100"
              >
                <CameraIcon className="w-5 h-5 text-gray-600" />
              </motion.button>
            </div>
            <div className="text-white">
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-2xl font-bold"
              >
                {user?.fullName}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white/80"
              >
                {user?.email}
              </motion.p>
              {user?.role === 'admin' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center mt-2 text-sm bg-white/20 px-3 py-1 rounded-full w-fit"
                >
                  <ShieldCheckIcon className="w-4 h-4 mr-1" />
                  <span>Quản trị viên</span>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader; 