import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MenuItem from '../components/Menu/MenuItem';
import MenuCategories from '../components/Menu/MenuCategories';

// Mock data - sau này sẽ được thay thế bằng API call
const menuItems = [
  {
    id: '1',
    name: 'Burger Bò Phô Mai',
    description: 'Burger bò với phô mai tan chảy, rau xanh tươi và sốt đặc biệt',
    price: 89000,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
    category: 'Burger'
  },
  {
    id: '2',
    name: 'Pizza Hải Sản',
    description: 'Pizza với hải sản tươi ngon, phô mai Mozzarella và sốt cà chua',
    price: 159000,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',
    category: 'Pizza'
  },
  {
    id: '3',
    name: 'Gà Rán Sốt Cay',
    description: 'Gà rán giòn với sốt cay đặc biệt của nhà hàng',
    price: 79000,
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58',
    category: 'Gà Rán'
  },
  // Thêm nhiều món ăn khác...
];

const categories = ['Tất cả', 'Burger', 'Pizza', 'Gà Rán', 'Món Phụ', 'Đồ Uống'];

const Menu: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === 'Tất cả' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-8 mt-[50px]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-center mb-8">Thực Đơn</h1>
        
        <div className="mb-8">
          <input
            type="text"
            placeholder="Tìm kiếm món ăn..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <MenuCategories
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <MenuItem {...item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Menu; 