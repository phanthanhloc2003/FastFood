import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { logout } from '../../store/slices/authSlice';

interface UserMenuProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const UserMenu: React.FC<UserMenuProps> = ({ isOpen, onClose, className = '' }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    onClose();
    navigate('/');
  };

  if (!isAuthenticated) {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ${className}`}
          >
            <Link
              to="/login"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={onClose}
            >
              Đăng nhập
            </Link>
            <Link
              to="/register"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={onClose}
            >
              Đăng ký
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ${className}`}
        >
          <Link
            to="/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={onClose}
          >
            Thông tin cá nhân
          </Link>

          {user?.role === "admin"  ?  <Link
            to="/admin"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={onClose}
          >
           Quảng lý hệ thống
          </Link> :  <Link
            to="/orders"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={onClose}
          >
            Đơn hàng của tôi
          </Link>}
          <Link
            to="/address"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={onClose}
          >
            Địa chỉ
          </Link>
          <button
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            onClick={handleLogout}
          >
            Đăng xuất
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UserMenu; 