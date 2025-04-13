import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { StarIcon, ShoppingCartIcon, HeartIcon, FireIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
import ProductGallery from '../components/Product/ProductGallery';
import ProductReviews from '../components/Product/ProductReviews';
import { productApi } from '../services/product';
import { Product } from '../types/product';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedSize, setSelectedSize] = useState<string>("s");
  const [quantity, setQuantity] = useState<number>(1);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [showAddedToCart, setShowAddedToCart] = useState<boolean>(false);
  const [showIngredients, setShowIngredients] = useState<boolean>(false);
  const [showSparkles, setShowSparkles] = useState<boolean>(false);
  const [data, setData] = useState<Product>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const feactDataProductOne = async () => {
      if (id) {
        setIsLoading(true);
        try {
          const data = await productApi.getById(id);
          setData(data);
        } catch (error) {
          console.error("Lỗi khi tải dữ liệu sản phẩm:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    feactDataProductOne();
  }, [id]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Hiệu ứng cho các phần tử con
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  // Hiệu ứng cho ingredients
  const ingredientVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.2,
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }),
    hover: {
      scale: 1.05,
      x: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  // Hiệu ứng cho sparkles
  const sparkleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10
      }
    },
    exit: {
      scale: 0,
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  // Hiệu ứng cho nút thêm vào giỏ hàng
  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  // Hiệu ứng cho thông báo
  const notificationVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    exit: {
      opacity: 0,
      y: 50,
      scale: 0.8,
      transition: {
        duration: 0.3
      }
    }
  };

  // Hiệu ứng cho loading skeleton
  const skeletonVariants = {
    initial: { opacity: 0.5 },
    animate: { 
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  useEffect(() => {
    // Hiển thị ingredients sau khi component mount
    const timer = setTimeout(() => {
      setShowIngredients(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = () => {
    if (data) {
      console.log(`Thêm ${quantity} sản phẩm ${data.name} kích thước ${selectedSize} vào giỏ hàng`);
      setShowAddedToCart(true);
      setShowSparkles(true);
      setTimeout(() => {
        setShowSparkles(false);
      }, 1500);

      setTimeout(() => {
        setShowAddedToCart(false);
      }, 2000);
    }
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const getSelectedPrice = () => {
    if (data) {
      const selectedSizeObj = data.sizes.find(size => size.size === selectedSize);
      return selectedSizeObj ? selectedSizeObj.price : data.price;
    }
  };

  // Component loading skeleton
  const LoadingSkeleton = () => (
    <div className="min-h-screen bg-gray-50 py-12 mt-[40px]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Skeleton cho phần hình ảnh */}
          <motion.div 
            className="bg-white rounded-xl shadow-md overflow-hidden"
            variants={skeletonVariants}
            initial="initial"
            animate="animate"
          >
            <div className="aspect-w-1 aspect-h-1 w-full bg-gray-200"></div>
          </motion.div>

          {/* Skeleton cho phần thông tin sản phẩm */}
          <div className="flex flex-col space-y-6">
            <motion.div 
              className="bg-white rounded-xl shadow-md p-6"
              variants={skeletonVariants}
              initial="initial"
              animate="animate"
            >
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="flex space-x-1 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-5 h-5 bg-gray-200 rounded-full"></div>
                ))}
              </div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
              
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-3"></div>
              <div className="flex space-x-3 mb-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-12 h-10 bg-gray-200 rounded-lg"></div>
                ))}
              </div>
              
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-3"></div>
              <div className="space-y-2 mb-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded w-4/5"></div>
                ))}
              </div>
              
              <div className="flex justify-between items-center mb-6">
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                <div className="flex space-x-2">
                  <div className="w-8 h-8 bg-gray-200 rounded"></div>
                  <div className="w-8 h-8 bg-gray-200 rounded"></div>
                  <div className="w-8 h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
              
              <div className="h-12 bg-gray-200 rounded w-full"></div>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-xl shadow-md p-6"
              variants={skeletonVariants}
              initial="initial"
              animate="animate"
            >
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-3"></div>
              <div className="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          className="mt-12 bg-white rounded-xl shadow-md p-6"
          variants={skeletonVariants}
          initial="initial"
          animate="animate"
        >
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );

  return (
    <>
      {isLoading ? (
        <LoadingSkeleton />
      ) : data ? (
        <motion.div
          className="min-h-screen bg-gray-50 py-12 mt-[40px]"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="container mx-auto px-4">
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
              variants={itemVariants}
            >
              {/* Phần hình ảnh */}
              <motion.div variants={itemVariants}>
                <ProductGallery
                  images={data.images.map(img => img.url)}
                  title={data.name}
                />
              </motion.div>

              {/* Phần thông tin sản phẩm */}
              <motion.div variants={itemVariants} className="flex flex-col">
                <div className="bg-white rounded-xl shadow-md p-6 mb-6 relative overflow-hidden">
                  {/* Hiệu ứng sparkles */}
                  <AnimatePresence>
                    {showSparkles && (
                      <>
                        <motion.div
                          className="absolute top-10 right-10 text-yellow-400"
                          variants={sparkleVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                        >
                          <SparklesIcon className="w-8 h-8" />
                        </motion.div>
                        <motion.div
                          className="absolute bottom-20 left-10 text-yellow-400"
                          variants={sparkleVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          transition={{ delay: 0.2 }}
                        >
                          <SparklesIcon className="w-6 h-6" />
                        </motion.div>
                        <motion.div
                          className="absolute top-1/2 left-1/2 text-yellow-400"
                          variants={sparkleVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          transition={{ delay: 0.4 }}
                        >
                          <SparklesIcon className="w-10 h-10" />
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>

                  <div className="flex justify-between items-start mb-4">
                    <motion.h1
                      className="text-2xl font-bold text-gray-800"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ type: "spring", stiffness: 100 }}
                    >
                      {data.name}
                    </motion.h1>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={toggleFavorite}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      {isFavorite ? (
                        <HeartIcon className="w-6 h-6 text-red-500" />
                      ) : (
                        <HeartIcon className="w-6 h-6" />
                      )}
                    </motion.button>
                  </div>

                  <motion.div
                    className="flex items-center mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex">
                      {[...Array(5)].map((_, index) => (
                        <motion.span
                          key={index}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                        >
                          {index < data.rating ? (
                            <StarIcon className="w-5 h-5 text-yellow-400" />
                          ) : (
                            <StarIconOutline className="w-5 h-5 text-yellow-400" />
                          )}
                        </motion.span>
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-500">
                      ({data.total_reviews} đánh giá)
                    </span>
                  </motion.div>

                  <motion.div
                    className="mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <p className="text-gray-600">{data.description}</p>
                  </motion.div>

                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Kích thước</h3>
                    <div className="flex space-x-3">
                      {data.sizes.map((size) => (
                        <motion.button
                          key={size.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleSizeChange(size.size)}
                          className={`px-4 py-2 rounded-lg border ${
                            selectedSize === size.size
                              ? 'border-primary-main bg-primary-main text-white'
                              : 'border-gray-300 text-gray-700 hover:border-primary-main'
                          }`}
                        >
                          {size.size.toUpperCase()}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <h3 className="text-lg font-medium text-gray-800 mb-2 flex items-center">
                      <FireIcon className="w-5 h-5 text-orange-500 mr-2" />
                      Thành phần
                    </h3>
                    <ul className="list-none text-gray-600">
                      {data.ingredients.map((ingredient, index) => (
                        <motion.li
                          key={index}
                          custom={index}
                          variants={ingredientVariants}
                          initial="hidden"
                          animate={showIngredients ? "visible" : "hidden"}
                          whileHover="hover"
                          className="mb-2 flex items-center"
                        >
                          <motion.span
                            className="w-2 h-2 bg-primary-main rounded-full mr-2"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.7 + index * 0.2 }}
                          />
                          {ingredient}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div
                    className="flex items-center justify-between mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <motion.div
                      className="text-2xl font-bold text-primary-main"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.9, type: "spring" }}
                    >
                      {getSelectedPrice() ? Number(getSelectedPrice()).toLocaleString('vi-VN') : '0'} đ
                    </motion.div>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleQuantityChange(quantity - 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                      >
                        -
                      </motion.button>
                      <span className="px-3 py-1 border-x border-gray-300">{quantity}</span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleQuantityChange(quantity + 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                      >
                        +
                      </motion.button>
                    </div>
                  </motion.div>

                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={handleAddToCart}
                    className="w-full bg-primary-main text-white py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-primary-dark transition-colors"
                  >
                    <ShoppingCartIcon className="w-5 h-5" />
                    <span>Thêm vào giỏ hàng</span>
                  </motion.button>
                </div>

                <motion.div
                  className="bg-white rounded-xl shadow-md p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Thông tin danh mục</h2>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">{data.categoryId.name}</h3>
                  <p className="text-gray-600">{data.categoryId.description}</p>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Phần đánh giá */}
            <motion.div
              className="mt-12"
              variants={itemVariants}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Đánh giá sản phẩm</h2>
                {data.total_reviews > 0 ? (
                  <ProductReviews reviews={[]} />
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Chưa có đánh giá nào cho sản phẩm này
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Thông báo đã thêm vào giỏ hàng */}
          <AnimatePresence>
            {showAddedToCart && (
              <motion.div
                variants={notificationVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2"
              >
                <ShoppingCartIcon className="w-5 h-5" />
                <span>Đã thêm vào giỏ hàng!</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Không tìm thấy sản phẩm</h2>
            <p className="text-gray-600">Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail; 