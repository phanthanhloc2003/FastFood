import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { orderApi } from "../services/order";
import { format } from "date-fns";
import {
  StarIcon,
  StarIcon as StarOutlineIcon,

  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";

interface Product {
  id: number;
  name: string;
  description: string;
  ingredients: string[];
  price: number;
  rating: number;
  total_reviews: number;
  images: { id: number; url: string }[];
  sizes: { id: number; size: string; price: number }[];
}

const OrderHistory: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data = await orderApi.findPurchasedProducts();
        setProducts(data);
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm đã mua:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleRateProduct = (product: Product) => {
    setSelectedProduct(product);
    setShowRatingModal(true);
  };

  const handleSubmitRating = async () => {
    if (!selectedProduct || rating === 0) return;
    try {
      setIsSubmitting(true);
      // await orderApi.rateProduct(selectedProduct.id, { rating, comment });
      setShowSuccess(true);
      setTimeout(() => {
        setShowRatingModal(false);
        setShowSuccess(false);
        setRating(0);
        setComment("");
      }, 2000);
    } catch (error) {
      console.error("Lỗi khi gửi đánh giá:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100">
        <motion.div
          className="flex flex-col items-center space-y-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-20 h-20 border-4 border-orange-500 border-t-transparent rounded-full relative"
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
            className="text-gray-600 font-medium bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent text-xl"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Đang tải dữ liệu...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
            Sản phẩm đã mua
          </h1>
          <p className="text-gray-600 mt-2">
            Xem lại và đánh giá các sản phẩm đã mua
          </p>
        </motion.div>

        {/* Products List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden backdrop-blur-sm bg-white/80 hover:shadow-xl transition-shadow duration-300"
            >
              {/* Product Image */}
              <motion.div
                className="relative h-48 w-full overflow-hidden"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={product.images[0]?.url || "/placeholder-food.jpg"}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
                {product.images.length > 1 && (
                  <motion.div
                    className="absolute bottom-2 right-2 bg-white/90 rounded-full px-2 py-1 text-xs text-gray-700 shadow-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    +{product.images.length - 1}
                  </motion.div>
                )}
              </motion.div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                  {product.description}
                </p>

                {/* Ingredients */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.ingredients.map((ingredient, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>

                {/* Price and Rating */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <CurrencyDollarIcon className="w-5 h-5 text-orange-500" />
                    <span className="text-lg font-semibold text-gray-900">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(product.price)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <StarSolidIcon className="w-5 h-5 text-orange-500" />
                    <span className="text-sm font-medium text-gray-700">
                      {product.rating}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({product.total_reviews})
                    </span>
                  </div>
                </div>

                {/* Rating Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(`/rating/${product.id}`)}
                  className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <StarIcon className="w-5 h-5" />
                  <span>Đánh giá sản phẩm</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Rating Modal */}
        <AnimatePresence>
          {showRatingModal && selectedProduct && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl relative overflow-hidden"
              >
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100 opacity-50" />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-orange-100 rounded-full">
                      <StarIcon className="w-6 h-6 text-orange-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      Đánh giá sản phẩm
                    </h3>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">
                      {selectedProduct.name}
                    </h4>
                    <div className="flex items-center gap-2">
                      <img
                        src={selectedProduct.images[0]?.url || "/placeholder-food.jpg"}
                        alt={selectedProduct.name}
                        className="h-16 w-16 rounded-lg object-cover"
                      />
                      <div>
                        <p className="text-sm text-gray-600">
                          {selectedProduct.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex justify-center gap-2 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setRating(star)}
                        className="focus:outline-none"
                      >
                        {star <= rating ? (
                          <StarSolidIcon className="w-12 h-12 text-orange-500" />
                        ) : (
                          <StarOutlineIcon className="w-12 h-12 text-orange-300" />
                        )}
                      </motion.button>
                    ))}
                  </div>

                  {/* Rating Label */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center mb-6"
                  >
                    <p className="text-lg font-medium text-gray-700">
                      {rating === 0
                        ? "Chọn số sao để đánh giá"
                        : rating === 1
                        ? "Rất không hài lòng"
                        : rating === 2
                        ? "Không hài lòng"
                        : rating === 3
                        ? "Bình thường"
                        : rating === 4
                        ? "Hài lòng"
                        : "Rất hài lòng"}
                    </p>
                  </motion.div>

                  {/* Comment */}
                  <div className="mb-6">
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Chia sẻ trải nghiệm của bạn..."
                      className="w-full h-32 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none transition-all duration-200 hover:border-orange-300"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-end gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setShowRatingModal(false);
                        setRating(0);
                        setComment("");
                      }}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Hủy
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSubmitRating}
                      disabled={rating === 0 || isSubmitting}
                      className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md hover:shadow-lg"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Đang gửi...</span>
                        </>
                      ) : (
                        <>
                          <StarIcon className="w-5 h-5" />
                          <span>Gửi đánh giá</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Message */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-white rounded-2xl p-6 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <svg
                    className="w-8 h-8 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Cảm ơn bạn đã đánh giá!
                </h3>
                <p className="text-gray-600">
                  Đánh giá của bạn đã được gửi thành công
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default OrderHistory; 