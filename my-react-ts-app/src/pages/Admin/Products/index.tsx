import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductList from '../../../components/Admin/Products/ProductList';
import ProductForm from '../../../components/Admin/Products/ProductForm';
import AdminLayout from '../../../components/Admin/Layout/AdminLayout';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  mainImage: string;
  images: string[];
  category: string;
  status: 'active' | 'inactive';
  stock: number;
  rating: number;
  totalReviews: number;
  ingredients: string[];
}

const ProductsPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedProduct(null);
  };

  const handleSubmit = async (formData: any) => {
    setIsLoading(true);
    try {
      // TODO: Implement API call to save product
      console.log('Saving product:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      handleCloseForm();
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Convert Product to ProductFormData format
  const convertProductToFormData = (product: Product) => {
    return {
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: null, // We can't convert string URL back to File
      stock: product.stock,
      status: product.status
    };
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Quản lý sản phẩm</h1>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddProduct}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Thêm sản phẩm mới
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          {showForm ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white rounded-lg shadow-lg p-6 mb-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {selectedProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
                </h2>
                <button
                  onClick={handleCloseForm}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <ProductForm
                initialData={selectedProduct ? convertProductToFormData(selectedProduct) : undefined}
                onSubmit={handleSubmit}
                isLoading={isLoading}
              />
            </motion.div>
          ) : (
            <ProductList onEditProduct={handleEditProduct} />
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
};

export default ProductsPage; 