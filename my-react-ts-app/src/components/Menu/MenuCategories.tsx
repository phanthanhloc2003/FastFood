import React from 'react';
import { motion } from 'framer-motion';

interface MenuCategoriesProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const MenuCategories: React.FC<MenuCategoriesProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-8">
      {categories.map((category) => (
        <motion.button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-colors
            ${
              selectedCategory === category
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {category}
        </motion.button>
      ))}
    </div>
  );
};

export default MenuCategories; 