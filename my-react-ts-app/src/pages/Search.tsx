import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
// import { SearchIcon } from '@heroicons/react/outline';

// Dữ liệu mẫu (sau này sẽ được thay thế bằng API call)
const mockProducts = [
  {
    id: 1,
    title: 'Burger Bò Phô Mai',
    price: 89000,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    description: 'Burger bò thơm ngon với phô mai tan chảy',
  },
  {
    id: 2,
    title: 'Pizza Hải Sản',
    price: 199000,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    description: 'Pizza với các loại hải sản tươi ngon',
  },
  // Thêm các sản phẩm khác...
];

const ITEMS_PER_PAGE = 12;

const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const page = parseInt(searchParams.get('page') || '1');

  const [searchResults, setSearchResults] = useState(mockProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState(query);

  useEffect(() => {
    const handleSearch = async () => {
      setIsLoading(true);
      // Giả lập API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSearchResults(mockProducts.filter(product => 
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      ));
      setIsLoading(false);
    };

    if (query) {
      handleSearch();
    }
  }, [query]);

  const totalPages = Math.ceil(searchResults.length / ITEMS_PER_PAGE);
  const currentProducts = searchResults.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    navigate(`/search?q=${encodeURIComponent(query)}&page=${newPage}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput.trim())}&page=1`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 mt-[20px]">
      <div className="container mx-auto px-4">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {query && (
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Kết quả tìm kiếm cho "{query}"
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Tìm thấy {searchResults.length} sản phẩm
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                      <p className="text-gray-600 mb-4">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-red-600 font-bold">
                          {product.price.toLocaleString('vi-VN')}đ
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors"
                        >
                          Thêm vào giỏ
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center space-x-2 mt-8">
                  {[...Array(totalPages)].map((_, index) => (
                    <motion.button
                      key={index + 1}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handlePageChange(index + 1)}
                      className={`px-4 py-2 rounded-lg ${
                        page === index + 1
                          ? 'bg-red-600 text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {index + 1}
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Search; 