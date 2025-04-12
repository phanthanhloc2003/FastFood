import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {  useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { ShoppingCartIcon, Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import UserMenu from './UserMenu';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const totalQuantity = useSelector((state: RootState) => 
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );
  const user = useSelector((state: RootState) => state.auth.user);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Thực đơn', path: '/menu' },
    { name: 'Về chúng tôi', path: '/about' },
    { name: 'Liên hệ', path: '/contact' },
  ];

  const handleProfileClick = () => {
    if (isAuthenticated) {
      setIsProfileMenuOpen(!isProfileMenuOpen);
    } else {
      navigate('/login');
    }
  };

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
          <Link to="/" className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="flex items-center"
            >
              <div className="relative w-12 h-12 md:w-14 md:h-14">
                <motion.div
                  className="w-full h-full"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 1, ease: "linear", repeat: Infinity }}
                >
                  <img
                    src="/images/logo.svg"
                    alt="FastFood Logo"
                    className="w-full h-full object-contain"
                  />
                </motion.div>
                <motion.div
                  className="absolute -bottom-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.8, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
              <motion.span
                className="ml-2 text-xl md:text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                FastFood
              </motion.span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative py-2 text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'text-orange-500'
                    : 'text-gray-700 hover:text-orange-500'
                }`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 right-0 h-0.5 bg-orange-500 bottom-0"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingCartIcon className="h-6 w-6 text-gray-700" />
              {totalQuantity > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                >
                  {totalQuantity}
                </motion.span>
              )}
            </Link>

            {/* Profile Button */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleProfileClick}
                className="flex items-center space-x-2 focus:outline-none"
              >
                {isAuthenticated ? (
                  <>
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt="User Avatar"
                        className="w-10 h-10 rounded-full object-cover border-2 border-orange-500"
                      />
                    ) : (
                      <UserCircleIcon className="h-10 w-10 text-gray-700" />
                    )}
                    <span className="hidden md:block text-sm font-medium text-gray-700">
                      {user?.fullName || 'Tài khoản'}
                    </span>
                  </>
                ) : (
                  <UserCircleIcon className="h-10 w-10 text-gray-700" />
                )}
              </motion.button>

              <UserMenu 
                isOpen={isProfileMenuOpen} 
                onClose={() => setIsProfileMenuOpen(false)}
              />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{ type: "spring", damping: 20 }}
                className="fixed inset-0 bg-white z-40 md:hidden"
              >
                <div className="flex flex-col h-full p-6">
                  <div className="flex justify-between items-center mb-8">
                    <Link to="/" className="flex items-center space-x-3" onClick={() => setIsMobileMenuOpen(false)}>
                      <div className="relative w-12 h-12">
                        <img
                          src="/images/logo.svg"
                          alt="FastFood Logo"
                          className="w-full h-full object-contain"
                        />
                        <motion.div
                          className="absolute -bottom-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [1, 0.8, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      </div>
                      <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                        FastFood
                      </span>
                    </Link>
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>

                  <nav className="flex flex-col space-y-4">
                    {navItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`text-lg font-medium py-2 ${
                          location.pathname === item.path
                            ? 'text-orange-500'
                            : 'text-gray-700'
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
};

export default Header; 