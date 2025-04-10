import React, { useState } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HomeIcon,
  UsersIcon,
  CubeIcon,
  BellIcon,
  PlusCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const user = useSelector((state: RootState) => state.auth.user);


  // if (!user || user.role !== 'admin') {
  //   return <Navigate to="/login" replace />;
  // }

  const menuItems = [
    {
      title: 'Tổng quan',
      path: '/admin',
      icon: HomeIcon,
    },
    {
      title: 'Quản lý sản phẩm',
      path: '/admin/products',
      icon: CubeIcon,
    },
    {
      title: 'Thêm sản phẩm',
      path: '/admin/products/add',
      icon: PlusCircleIcon,
    },
    {
      title: 'Quản lý người dùng',
      path: '/admin/users',
      icon: UsersIcon,
    },
    {
      title: 'Đơn hàng & Thông báo',
      path: '/admin/orders/status-logs',
      icon: BellIcon,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar for desktop */}
      <motion.div
        initial={false}
        animate={{ width: isSidebarOpen ? '16rem' : '5rem' }}
        className="fixed top-0 left-0 h-full bg-white shadow-lg z-30"
      >
        <div className="flex items-center justify-between p-4">
          <motion.span
            animate={{ opacity: isSidebarOpen ? 1 : 0 }}
            className="font-bold text-xl text-red-600"
          >
            Admin Panel
          </motion.span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 rounded-lg hover:bg-gray-100"
          >
            {isSidebarOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </motion.button>
        </div>

        <nav className="mt-8">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 space-x-4 transition-colors ${
                  location.pathname === item.path
                    ? 'bg-red-50 text-red-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-6 h-6" />
                <motion.span
                  animate={{
                    opacity: isSidebarOpen ? 1 : 0,
                    display: isSidebarOpen ? 'block' : 'none',
                  }}
                >
                  {item.title}
                </motion.span>
              </Link>
            );
          })}
        </nav>
      </motion.div>

      {/* Main content */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-8 py-4">
            <h1 className="text-2xl font-semibold text-gray-800">
              {menuItems.find((item) => item.path === location.pathname)?.title ||
                'Admin Panel'}
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">{user?.email}</span>
              <Link
                to="/profile"
                className="p-2 text-gray-600 hover:text-red-600 transition-colors"
              >
                <img
                  src={user?.avatar || '/default-avatar.png'}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
              </Link>
            </div>
          </div>
        </header>

        <main className="p-8">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout; 