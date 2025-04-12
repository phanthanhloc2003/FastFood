import React from 'react';
import { motion } from 'framer-motion';
import { Category } from '../../types/product';

interface MenuCategoriesProps {
  categories: Category[];
  selectedCategory: Category | null;
  onSelectCategory: (category: Category | null) => void;
}

const MenuCategories: React.FC<MenuCategoriesProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-8">
      <motion.button
        onClick={() => onSelectCategory(null)}
        className={`px-6 py-2 rounded-full text-sm font-medium transition-colors
          ${
            !selectedCategory
              ? 'bg-red-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Tất cả
      </motion.button>
      {categories.map((category) => (
        <motion.button
          key={category.id}
          onClick={() => onSelectCategory(category)}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-colors
            ${
              selectedCategory?.id === category.id
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {category.name}
        </motion.button>
      ))}
    </div>
  );
};

export default MenuCategories; 