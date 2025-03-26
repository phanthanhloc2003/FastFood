import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import UserMenu from './UserMenu';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

const Header: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const totalQuantity = useSelector((state: RootState) => state.cart.totalQuantity);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center"
            >
              <img
                src="/logo.png"
                alt="Logo"
                className="h-12 w-auto"
              />
              <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-primary-main to-secondary-main bg-clip-text text-transparent">
                FastFood
              </span>
            </motion.div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {[
              { name: 'Trang chủ', path: '/' },
              { name: 'Thực đơn', path: '/menu' },
              { name: 'Về chúng tôi', path: '/about' },
              { name: 'Liên hệ', path: '/contact' },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative py-2 text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'text-primary-main'
                    : 'text-gray-700 hover:text-primary-main'
                }`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 right-0 h-0.5 bg-primary-main bottom-0"
                  />
                )}
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-6">
            <Link to="/cart" className="relative">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <div className="text-gray-700 hover:text-red-500">
                  <ShoppingCartIcon className="h-6 w-6" />
                </div>
                {totalQuantity > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
                  >
                    {totalQuantity}
                  </motion.div>
                )}
              </motion.div>
            </Link>
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-main transition-colors font-medium"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-primary-main to-secondary-main text-white px-6 py-2 rounded-full hover:from-primary-dark hover:to-secondary-dark transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Đăng ký
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header; 