import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import MenuCategories from '../components/Menu/MenuCategories';
import AddToCartAnimation from '../components/AddToCartAnimation';
import { Product, Category, ProductSize } from '../types/product';
import { categoriesApi } from '../services/categorie';
import { productApi } from '../services/product';
import { cartApi } from '../services/cart';
import { addToCart } from '../store/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';

const Menu: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddToCart, setShowAddToCart] = useState(false);
  const [addedProduct, setAddedProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await categoriesApi.getAll();
        setCategories(data);
      } catch (err) {
        setError('Không thể tải danh mục. Vui lòng thử lại sau.');
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await productApi.getAll();
        setProducts(data);
      } catch (err) {
        setError('Không thể tải sản phẩm. Vui lòng thử lại sau.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    }
    

    fetchProducts();
    fetchCategories();
  }, []);

  const filteredItems = products.filter((item) => {
    const matchesCategory = !selectedCategory || item.categoryId.id === selectedCategory.id;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

   const handleAddToCart = async (
     product: Product,
     size: ProductSize,
     quantity: number
   ) => {
     try {
 
       if(isAuthenticated){
         const cart = {
           productSizeId:size.id,
           quantity:quantity
         }
         await cartApi.create(cart);
         setAddedProduct(product);
         setShowAddToCart(true);
         const itemToAdd = {
           product : product,
           quantity: quantity,
           size: size.size,
           sizeId: size.id,
           price: size.price,
         };
         dispatch(addToCart(itemToAdd));
       }
 
       else{
         navigate('/login', { state: { from: location.pathname } })
       }
     } catch (error) {
       console.error("err", error);
     }
   };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 mt-[50px] flex justify-center items-center min-h-[300px]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 mt-[50px] flex flex-col items-center min-h-[300px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-600 text-center mb-4"
        >
          <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p>{error}</p>
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
        >
          Thử lại
        </motion.button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-[50px]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 100,
          damping: 20
        }}
      >
        <motion.h1 
          className="text-4xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 20,
            delay: 0.2
          }}
        >
          Thực Đơn
        </motion.h1>
        
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 20,
            delay: 0.3
          }}
        >
          <input
            type="text"
            placeholder="Tìm kiếm món ăn..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 20,
            delay: 0.4
          }}
        >
          <MenuCategories
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </motion.div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    delay: index * 0.1
                  }
                }}
                exit={{ 
                  opacity: 0, 
                  y: -50, 
                  scale: 0.8,
                  transition: {
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                  }
                }}
                whileHover={{ 
                  y: -10,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 10
                  }
                }}
              >
                <ProductCard 
                  product={item} 
                  onAddToCart={handleAddToCart}
                  index={index}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <AddToCartAnimation
          isVisible={showAddToCart}
          productName={addedProduct?.name || ''}
          onComplete={() => setShowAddToCart(false)}
        />
      </motion.div>
    </div>
  );
};

export default Menu; 