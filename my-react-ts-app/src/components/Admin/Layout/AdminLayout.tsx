import React, { useState, useEffect } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HomeIcon,
  UsersIcon,
  CubeIcon,
  BellIcon,
  PlusCircleIcon,
  Bars3Icon,
  XMarkIcon,
  ChartBarIcon,
  TagIcon,
  ChevronRightIcon,
  UserCircleIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const location = useLocation();
  const user = useSelector((state: RootState) => state.auth.user);
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (user === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100">
        <motion.div
          className="flex flex-col items-center space-y-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full relative"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <motion.div
              className="absolute inset-0 border-4 border-orange-200 rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
          <motion.p
            className="text-gray-600 font-medium bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Đang tải...
          </motion.p>
        </motion.div>
      </div>
    );
  }
  
  if (user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  const menuItems = [
    {
      title: 'Tổng quan',
      path: '/admin',
      icon: HomeIcon,
    },
    {
      title: 'Thêm sản phẩm',
      path: '/admin/products',
      icon: PlusCircleIcon,
    },
    {
      title: 'Quản lý người dùng',
      path: '/admin/users',
      icon: UsersIcon,
    },
    {
      title: 'Quản lý danh mục',
      path: '/admin/categories',
      icon: TagIcon,
    },
    {
      title: 'Quản lý thông báo',
      path: '/admin/NotificationsPage',
      icon: BellIcon,
    },
    {
      title: 'Quản lý đơn hàng',
      path: '/admin/order',
      icon: ChartBarIcon,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      {/* Mobile Menu Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg md:hidden"
      >
        <Bars3Icon className="w-6 h-6 text-orange-600" />
      </motion.button>

      {/* Sidebar */}
      <AnimatePresence>
        {(isSidebarOpen || isMobileMenuOpen) && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className={`fixed top-0 left-0 h-full bg-white shadow-xl z-40 w-64 md:w-auto ${
              isMobileMenuOpen ? 'block' : 'hidden md:block'
            }`}
          >
            <div className="flex items-center justify-between p-4 border-b border-orange-100">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
                  <CubeIcon className="w-5 h-5 text-white" />
                </div>
                <motion.span
                  animate={{ opacity: isSidebarOpen ? 1 : 0 }}
                  className="font-bold text-xl bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent"
                >
                  Admin Panel
                </motion.span>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  if (window.innerWidth >= 768) {
                    setIsSidebarOpen(!isSidebarOpen);
                  } else {
                    setIsMobileMenuOpen(false);
                  }
                }}
                className="p-1 rounded-lg hover:bg-orange-50"
              >
                <XMarkIcon className="w-6 h-6 text-orange-600" />
              </motion.button>
            </div>

            <nav className="mt-8 px-4">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center px-4 py-3 rounded-xl transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                          : 'text-gray-600 hover:bg-orange-50'
                      }`}
                    >
                      <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-orange-600'}`} />
                      <motion.span
                        animate={{
                          opacity: isSidebarOpen ? 1 : 0,
                          display: isSidebarOpen ? 'block' : 'none',
                        }}
                        className="ml-4 font-medium"
                      >
                        {item.title}
                      </motion.span>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="ml-auto"
                        >
                          <ChevronRightIcon className="w-5 h-5" />
                        </motion.div>
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? 'md:ml-64' : 'md:ml-20'
        }`}
      >
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 md:px-8 py-4">
            <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
              {menuItems.find((item) => item.path === location.pathname)?.title ||
                'Admin Panel'}
            </h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-orange-50"
                >
                  <img
                    src={user?.avatar || '/default-avatar.png'}
                    alt="Profile"
                    className="w-8 h-8 rounded-full ring-2 ring-orange-500"
                  />
                  <span className="hidden md:block text-sm font-medium text-gray-600">
                    {user?.email}
                  </span>
                </motion.button>

                <AnimatePresence>
                  {isProfileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-50"
                    >
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-orange-50"
                      >
                        <UserCircleIcon className="w-5 h-5 mr-2 text-orange-600" />
                        Hồ sơ
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-orange-50"
                      >
                        <CogIcon className="w-5 h-5 mr-2 text-orange-600" />
                        Cài đặt
                      </Link>
                      <button
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
                        Đăng xuất
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-4 md:p-6"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 