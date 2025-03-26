import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { RootState } from '../store/store';
import { removeFromCart, updateQuantity } from '../store/slices/cartSlice';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-[50px]">
      <h1 className="text-3xl font-bold mb-8">Giỏ hàng của bạn</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500">
          Giỏ hàng trống. Hãy thêm món ăn vào giỏ!
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          <AnimatePresence>
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex items-center bg-white rounded-lg shadow-md p-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="ml-6 flex-grow">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-red-500 font-medium">
                    {item.price.toLocaleString('vi-VN')}đ
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-1 bg-gray-100 rounded-md"
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  >
                    -
                  </motion.button>
                  <span className="font-medium">{item.quantity}</span>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-1 bg-gray-100 rounded-md"
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  >
                    +
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="text-red-500 hover:text-red-600"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    Xóa
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Tổng cộng:</span>
              <span className="text-2xl font-bold text-red-500">
                {totalAmount.toLocaleString('vi-VN')}đ
              </span>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition-colors"
            >
              Thanh toán
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart; 