import React from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { clearCart } from '../store/slices/cartSlice';
import CartItem from '../components/Cart/CartItem';
import { useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state: RootState) => state.cart);

  const totalAmount = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 mt-[50px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Giỏ hàng</h1>
            {items.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => dispatch(clearCart())}
                className="text-red-500 hover:text-red-600"
              >
                Xóa tất cả
              </motion.button>
            )}
          </div>

          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">Giỏ hàng trống</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/')}
                className="bg-primary-main text-white px-6 py-2 rounded-lg hover:bg-primary-dark"
              >
                Tiếp tục mua sắm
              </motion.button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <CartItem key={item.productId} item={item} />
              ))}

              <div className="border-t pt-6">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-medium">Tổng cộng:</span>
                  <span className="text-2xl font-bold text-primary-main">
                    {totalAmount.toLocaleString()}đ
                  </span>
                </div>
                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCheckout}
                    className="bg-primary-main text-white px-8 py-3 rounded-lg hover:bg-primary-dark"
                  >
                    Tiến hành đặt hàng
                  </motion.button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Cart; 