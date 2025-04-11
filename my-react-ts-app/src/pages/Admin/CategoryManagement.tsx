import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { categoriesApi } from '../../services/categorie';

interface Category {
  id: number;
  name: string;
  description: string;
}

export interface CategoryFormData {
  name: string;
  description: string;
}

const CategoryManagement: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [notificationMessage, setNotificationMessage] = useState('');

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<CategoryFormData>();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoriesApi.getAll();
      setCategories(response);
    } catch (error) {
      console.error('Lỗi khi tải danh mục:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: CategoryFormData) => {
    try {
      if (editingId) {
        const response = await categoriesApi.update(editingId, data);
        if (response) {
          fetchCategories();
          handleCloseModal();
          setNotificationMessage('Cập nhật danh mục thành công!');
          setShowNotification(true);
          setTimeout(() => setShowNotification(false), 3000);
        }
      } else {
        const response = await categoriesApi.create(data);
        if (response) {
          fetchCategories();
          handleCloseModal();
          setNotificationMessage('Tạo danh mục thành công!');
          setShowNotification(true);
          setTimeout(() => setShowNotification(false), 3000);
        }
      }
    } catch (error) {
      console.error('Lỗi khi lưu danh mục:', error);
      setNotificationMessage('Có lỗi xảy ra khi lưu danh mục!');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  const handleDelete = async (id: number) => {
    const category = categories.find(c => c.id === id);
    if (category) {
      setCategoryToDelete(category);
      setDeleteModalOpen(true);
    }
  };

  const confirmDelete = async () => {
    if (categoryToDelete) {
      try {
        await categoriesApi.delete(categoryToDelete.id);
        fetchCategories();
        setDeleteModalOpen(false);
        setNotificationMessage('Xóa danh mục thành công!');
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
      } catch (error) {
        console.error('Lỗi khi xóa danh mục:', error);
        setNotificationMessage('Có lỗi xảy ra khi xóa danh mục!');
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
      }
    }
  };

  const handleEdit = (category: Category) => {
    setValue('name', category.name);
    setValue('description', category.description);
    setEditingId(category.id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    reset();
    setEditingId(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
          >
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>{notificationMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {deleteModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 w-full max-w-md"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Xác nhận xóa</h2>
              <p className="text-gray-600 mb-6">
                Bạn có chắc chắn muốn xóa danh mục "{categoryToDelete?.name}"?
              </p>
              <div className="flex justify-end space-x-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setDeleteModalOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Hủy
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={confirmDelete}
                  className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
                >
                  Xóa
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Quản Lý Danh Mục</h1>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsModalOpen(true)}
          className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition duration-300"
        >
          Thêm Danh Mục
        </motion.button>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tên Danh Mục
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mô Tả
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao Tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((category) => (
              <motion.tr
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {category.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {category.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {category.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleEdit(category)}
                    className="text-red-600 hover:text-red-900 mr-4"
                  >
                    Sửa
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(category.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Xóa
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 w-full max-w-md"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingId ? 'Sửa Danh Mục' : 'Thêm Danh Mục'}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên Danh Mục
                </label>
                <input
                  {...register('name', { required: 'Vui lòng nhập tên danh mục' })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mô Tả
                </label>
                <textarea
                  {...register('description')}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Hủy
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
                >
                  {editingId ? 'Cập Nhật' : 'Thêm Mới'}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement; 