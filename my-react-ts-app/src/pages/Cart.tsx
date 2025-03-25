import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import CartItem from '../components/Cart/CartItem';
import { Product } from '../types/product';

const mockCartItems: { product: Product; quantity: number }[] = [
  {
    product: {
      id: 1,
      title: 'Burger Bò Phô Mai',
      price: 89000,
      description: 'Burger bò thơm ngon với phô mai tan chảy',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      rating: 4.5,
      totalReviews: 128,
    },
    quantity: 2,
  },
  {
    product: {
      id: 2,
      title: 'Pizza Hải Sản',
      price: 199000,
      description: 'Pizza với các loại hải sản tươi ngon',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      rating: 4.8,
      totalReviews: 256,
    },
    quantity: 1,
  },
];

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: number) => {
    setCartItems(cartItems.filter((item) => item.product.id !== productId));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Giỏ hàng</h1>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 mb-4">Giỏ hàng của bạn đang trống</p>
            <Link
              to="/menu"
              className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
            >
              Tiếp tục mua sắm
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {cartItems.map((item) => (
                  <CartItem
                    key={item.product.id}
                    product={item.product}
                    quantity={item.quantity}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemoveItem}
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-6 rounded-lg shadow-md sticky top-24"
              >
                <h2 className="text-xl font-semibold mb-4">Tổng đơn hàng</h2>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Tạm tính</span>
                    <span>{total.toLocaleString('vi-VN')}đ</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phí vận chuyển</span>
                    <span>Miễn phí</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Tổng cộng</span>
                      <span>{total.toLocaleString('vi-VN')}đ</span>
                    </div>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsCheckoutModalOpen(true)}
                  className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                >
                  Tiến hành thanh toán
                </motion.button>
              </motion.div>
            </div>
          </div>
        )}

        {/* Checkout Modal */}
        <AnimatePresence>
          {isCheckoutModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
              >
                <h2 className="text-2xl font-bold mb-4">Xác nhận đơn hàng</h2>
                <p className="text-gray-600 mb-6">
                  Bạn có chắc chắn muốn tiến hành thanh toán đơn hàng này?
                </p>
                <div className="flex justify-end space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsCheckoutModalOpen(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Hủy
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      // Xử lý thanh toán ở đây
                      setIsCheckoutModalOpen(false);
                    }}
                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                  >
                    Xác nhận
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Cart; 