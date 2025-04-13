import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
  updateItemSize,
} from "../store/slices/cartSlice";
import {
  TrashIcon,
  ShoppingBagIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { Product, ProductSize } from "../types/product";
import { cartApi } from "../services/cart";

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const result = useSelector((state: RootState) => state.cart);
  const [deliveryType, setDeliveryType] = useState<
    "Dine-in" | "Take-away" | "Delivery"
  >("Delivery");
  const [tableNumber, setTableNumber] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleQuantityChange = async (
    sizeId: number,
    productId: number,
    size: string,
    quantity: number
  ) => {
    try {
      await cartApi.changeQuantity({ sizeId, quantity });
      if (quantity < 1) {
        dispatch(removeFromCart({ productId, size }));
      } else {
        dispatch(updateQuantity({ productId, size, quantity: quantity }));
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật số lượng:", error);
    }
  };
  const handleSizeChange = async (
    oldSizeId: number,
    product: Product,
    currentSize: string,
    newSize: ProductSize
  ) => {
    try {
      await cartApi.changeSize({ oldSizeId, newSizeId: newSize.id });
      dispatch(
        updateItemSize({
          productId: product.id,
          oldSize: currentSize,
          newSize: newSize.size,
          newSizeId: newSize.id,
          newPrice: +newSize.price,
        })
      );
    } catch (error) {
      console.error("Lỗi khi thay đổi size:", error);
    }
  };

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      const orderData = {
        user_id: 1,
        table_number: deliveryType === "Dine-in" ? tableNumber : null,
        address_id: deliveryType === "Delivery" ? 1 : null,
        delivery_type: deliveryType,
        status: "Pending",
        total_price: result.total,
        items: cartItems.map((item) => ({
          product_id: item.product.id,
          size_id: item.sizeId,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        // await cartApi.clear();
        dispatch(clearCart());
        navigate("/checkout/success");
      } else {
        console.error("Lỗi khi tạo đơn hàng");
      }
    } catch (error) {
      console.error("Lỗi khi tạo đơn hàng:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const hanldeRemoveOrderItem = async (
    id: number,
    productId: number,
    size: string
  ) => {
    await cartApi.remove(id);
    dispatch(
      removeFromCart({
        productId: productId,
        size: size,
      })
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="text-xl font-bold text-gray-900">Giỏ hàng của bạn</h1>
          <p className="text-sm text-gray-500 mt-1">
            {cartItems.length} {cartItems.length === 1 ? "món" : "món"} trong
            giỏ hàng
          </p>
        </motion.div>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8 bg-white rounded-lg shadow-sm"
          >
            <ShoppingBagIcon className="mx-auto h-12 w-12 text-gray-400 mb-3" />
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Giỏ hàng trống
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Hãy thêm món ăn vào giỏ để tiếp tục.
            </p>
            <Link
              to="/menu"
              className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-full text-white bg-red-600 hover:bg-red-700 transition-colors duration-200"
            >
              Xem thực đơn
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-2 space-y-3"
            >
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    key={`${item.product.id}-${item.size}`}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, x: -100 }}
                    className="bg-white rounded-lg shadow-sm overflow-hidden"
                  >
                    <div className="flex flex-col sm:flex-row p-4">
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                        src={
                          item.product.images && item.product.images.length > 0
                            ? item.product.images[0].url
                            : "/placeholder.jpg"
                        }
                        alt={item.product.name}
                        className="w-24 h-24 object-cover rounded-lg mb-3 sm:mb-0"
                      />
                      <div className="flex-1 sm:ml-4">
                        <div className="flex justify-between items-start">
                          <h3 className="text-base font-medium text-gray-900">
                            {item.product.name}
                          </h3>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() =>
                              hanldeRemoveOrderItem(
                                item.sizeId,
                                item.product.id,
                                item.size
                              )
                            }
                            className="text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </motion.button>
                        </div>

                        <div className="mt-2 flex flex-wrap gap-2">
                          {item.product.sizes.map((sizeOption) => (
                            <motion.button
                              key={sizeOption.id}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() =>
                                handleSizeChange(
                                  item.sizeId,
                                  item.product,
                                  item.size,
                                  sizeOption
                                )
                              }
                              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                                item.size === sizeOption.size
                                  ? "bg-red-600 text-white shadow-sm"
                                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                              }`}
                            >
                              <div className="flex items-center space-x-1">
                                <span>{sizeOption.size}</span>
                                <span className="text-xs opacity-75">
                                  {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  }).format(sizeOption.price)}
                                </span>
                              </div>
                            </motion.button>
                          ))}
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center space-x-2 bg-gray-50 rounded-full px-3 py-1">
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() =>
                                handleQuantityChange(
                                  item.sizeId,
                                  item.product.id,
                                  item.size,
                                  item.quantity - 1
                                )
                              }
                              className="p-1 hover:text-red-600 transition-colors"
                            >
                              <MinusIcon className="h-4 w-4" />
                            </motion.button>
                            <span className="w-6 text-center font-medium">
                              {item.quantity}
                            </span>
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() =>
                                handleQuantityChange(
                                  item.sizeId,
                                  item.product.id,
                                  item.size,
                                  item.quantity + 1
                                )
                              }
                              className="p-1 hover:text-red-600 transition-colors"
                            >
                              <PlusIcon className="h-4 w-4" />
                            </motion.button>
                          </div>
                          <p className="text-red-600 font-medium">
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(item.price)}
                          </p>
                        </div>
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
              <div className="bg-white rounded-lg shadow-sm p-4 sticky top-20">
                <h2 className="text-base font-semibold text-gray-900 mb-4">
                  Tổng đơn hàng
                </h2>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Tạm tính</span>
                    <span>{result.total.toLocaleString("vi-VN")}đ</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Phí vận chuyển</span>
                    <span>Miễn phí</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-base font-semibold">
                      <span>Tổng cộng</span>
                      <span className="text-red-600">
                        {result.total.toLocaleString("vi-VN")}đ
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <select
                      value={deliveryType}
                      onChange={(e) =>
                        setDeliveryType(
                          e.target.value as "Dine-in" | "Take-away" | "Delivery"
                        )
                      }
                      className="w-full px-3 py-2 text-sm rounded-full border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="Dine-in">Tại quán</option>
                      <option value="Take-away">Mang về</option>
                      <option value="Delivery">Giao hàng</option>
                    </select>

                    {deliveryType === "Dine-in" && (
                      <input
                        type="number"
                        value={tableNumber || ""}
                        onChange={(e) => setTableNumber(Number(e.target.value))}
                        className="w-full px-3 py-2 text-sm rounded-full border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Nhập số bàn"
                      />
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCheckout}
                    className="w-full bg-red-600 text-white py-2.5 rounded-full font-medium hover:bg-red-700 transition-colors duration-200 text-sm"
                  >
                    Thanh toán ngay
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => dispatch(clearCart())}
                    className="w-full bg-gray-100 text-gray-700 py-2.5 rounded-full font-medium hover:bg-gray-200 transition-colors duration-200 text-sm"
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
