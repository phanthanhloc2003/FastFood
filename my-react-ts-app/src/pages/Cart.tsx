import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { removeFromCart, updateQuantity, clearCart, updateSize } from '../store/slices/cartSlice';
import { TrashIcon, ShoppingBagIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size: 'S' | 'M' | 'L';
}

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalAmount = cartItems.reduce((total, item) => {
    const sizeMultiplier = item.size === 'S' ? 1 : item.size === 'M' ? 1.2 : 1.5;
    return total + (item.price * item.quantity * sizeMultiplier);
  }, 0);

  const [deliveryType, setDeliveryType] = useState<'Dine-in' | 'Take-away' | 'Delivery'>('Delivery');
  const [tableNumber, setTableNumber] = useState<number | null>(null);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleSizeChange = (id: string, newSize: 'S' | 'M' | 'L') => {
    dispatch(updateSize({ id, size: newSize }));
  };

  const handleCheckout = async () => {
    try {
      const orderData = {
        user_id: 1, // TODO: Lấy từ user đang đăng nhập
        table_number: deliveryType === 'Dine-in' ? tableNumber : null,
        address_id: deliveryType === 'Delivery' ? 1 : null, // TODO: Lấy từ địa chỉ của user
        delivery_type: deliveryType,
        status: 'Pending',
        total_price: totalAmount,
        items: cartItems
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        dispatch(clearCart());
        navigate('/checkout/success');
      } else {
        console.error('Lỗi khi tạo đơn hàng');
      }
    } catch (error) {
      console.error('Lỗi khi tạo đơn hàng:', error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Giỏ hàng của bạn</h1>
          <p className="text-gray-600">
            {cartItems.length} {cartItems.length === 1 ? 'món' : 'món'} trong giỏ hàng
          </p>
        </motion.div>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-white rounded-2xl shadow-sm"
          >
            <ShoppingBagIcon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Giỏ hàng trống</h2>
            <p className="text-gray-600 mb-8">Hãy thêm món ăn vào giỏ để tiếp tục.</p>
            <Link
              to="/menu"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 transition-colors duration-200"
            >
              Xem thực đơn
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-2"
            >
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, x: -100 }}
                    className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-center p-6">
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="ml-6 flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex space-x-2">
                            {(['S', 'M', 'L'] as const).map((size) => (
                              <motion.button
                                key={size}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleSizeChange(item.id, size)}
                                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                                  item.size === size
                                    ? 'bg-red-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                              >
                                {size}
                              </motion.button>
                            ))}
                          </div>
                          <p className="text-red-600 font-medium">
                            {(item.price * (item.size === 'S' ? 1 : item.size === 'M' ? 1.2 : 1.5)).toLocaleString('vi-VN')}đ
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-2">
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="p-1 hover:text-red-600 transition-colors"
                          >
                            <MinusIcon className="h-4 w-4" />
                          </motion.button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="p-1 hover:text-red-600 transition-colors"
                          >
                            <PlusIcon className="h-4 w-4" />
                          </motion.button>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => dispatch(removeFromCart(item.id))}
                          className="text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Tổng đơn hàng</h2>
                
                {/* Chọn loại đơn hàng */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loại đơn hàng
                  </label>
                  <select
                    value={deliveryType}
                    onChange={(e) => setDeliveryType(e.target.value as 'Dine-in' | 'Take-away' | 'Delivery')}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="Dine-in">Tại quán</option>
                    <option value="Take-away">Mang về</option>
                    <option value="Delivery">Giao hàng</option>
                  </select>
                </div>

                {/* Số bàn (chỉ hiển thị khi chọn Dine-in) */}
                {deliveryType === 'Dine-in' && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số bàn
                    </label>
                    <input
                      type="number"
                      value={tableNumber || ''}
                      onChange={(e) => setTableNumber(Number(e.target.value))}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Nhập số bàn"
                    />
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Tạm tính</span>
                    <span>{totalAmount.toLocaleString('vi-VN')}đ</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Phí vận chuyển</span>
                    <span>Miễn phí</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Tổng cộng</span>
                      <span className="text-red-600">{totalAmount.toLocaleString('vi-VN')}đ</span>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCheckout}
                    className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200"
                  >
                    Thanh toán ngay
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => dispatch(clearCart())}
                    className="w-full mt-2 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
                  >
                    Xóa giỏ hàng
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart; 