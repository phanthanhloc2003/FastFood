import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

interface Product {
  id: number;
  category_id: number | null;
  name: string;
  description: string;
  ingredients: string[];
  price: number;
  rating: number;
  total_reviews: number;
  created_at: string;
  updated_at: string;
  images: ProductImage[];
  sizes: ProductSize[];
}

interface ProductImage {
  id: number;
  product_id: number;
  image_url: string;
}

interface ProductSize {
  id: number;
  product_id: number;
  size: string;
  price: number;
}

interface Category {
  id: number;
  name: string;
}

interface ProductFormData {
  category_id: number | null;
  name: string;
  description: string;
  ingredients: string;
  price: number;
  images: string[];
  sizes: { size: string; price: number }[];
}

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [sizeInputs, setSizeInputs] = useState<{ size: string; price: number }[]>([]);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<ProductFormData>();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Lỗi khi tải sản phẩm:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Lỗi khi tải danh mục:', error);
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      const productData = {
        ...data,
        ingredients: data.ingredients.split(',').map(item => item.trim()),
        images: imageUrls,
        sizes: sizeInputs
      };

      const url = editingId 
        ? `/api/products/${editingId}`
        : '/api/products';
      
      const method = editingId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        console.log(editingId ? 'Cập nhật thành công' : 'Thêm mới thành công');
        fetchProducts();
        handleCloseModal();
      } else {
        console.error('Có lỗi xảy ra');
      }
    } catch (error) {
      console.error('Lỗi khi lưu sản phẩm:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      try {
        const response = await fetch(`/api/products/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          console.log('Xóa thành công');
          fetchProducts();
        } else {
          console.error('Có lỗi xảy ra');
        }
      } catch (error) {
        console.error('Lỗi khi xóa sản phẩm:', error);
      }
    }
  };

  const handleEdit = (product: Product) => {
    setValue('category_id', product.category_id);
    setValue('name', product.name);
    setValue('description', product.description);
    setValue('ingredients', product.ingredients.join(', '));
    setValue('price', product.price);
    setImageUrls(product.images.map(img => img.image_url));
    setSizeInputs(product.sizes.map(size => ({ size: size.size, price: size.price })));
    setEditingId(product.id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    reset();
    setImageUrls([]);
    setSizeInputs([]);
    setEditingId(null);
  };

  const addImageUrl = () => {
    setImageUrls([...imageUrls, '']);
  };

  const removeImageUrl = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  const updateImageUrl = (index: number, value: string) => {
    const newUrls = [...imageUrls];
    newUrls[index] = value;
    setImageUrls(newUrls);
  };

  const addSizeInput = () => {
    setSizeInputs([...sizeInputs, { size: '', price: 0 }]);
  };

  const removeSizeInput = (index: number) => {
    setSizeInputs(sizeInputs.filter((_, i) => i !== index));
  };

  const updateSizeInput = (index: number, field: 'size' | 'price', value: string | number) => {
    const newSizes = [...sizeInputs];
    newSizes[index] = { ...newSizes[index], [field]: value };
    setSizeInputs(newSizes);
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Quản Lý Sản Phẩm</h1>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsModalOpen(true)}
          className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition duration-300"
        >
          Thêm Sản Phẩm
        </motion.button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tên Sản Phẩm
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Danh Mục
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Giá
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Đánh Giá
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao Tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {product.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {categories.find(c => c.id === product.category_id)?.name || 'Không có'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.price.toLocaleString('vi-VN')}đ
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-1">★</span>
                    {product.rating.toFixed(1)} ({product.total_reviews})
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleEdit(product)}
                    className="text-red-600 hover:text-red-900 mr-4"
                  >
                    Sửa
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(product.id)}
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
            className="bg-white rounded-2xl p-8 w-full max-w-2xl overflow-y-auto max-h-screen"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingId ? 'Sửa Sản Phẩm' : 'Thêm Sản Phẩm'}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Danh Mục
                </label>
                <select
                  {...register('category_id')}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">Chọn danh mục</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên Sản Phẩm
                </label>
                <input
                  {...register('name', { required: 'Vui lòng nhập tên sản phẩm' })}
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nguyên Liệu (phân cách bằng dấu phẩy)
                </label>
                <textarea
                  {...register('ingredients')}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giá Cơ Bản
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register('price', { 
                    required: 'Vui lòng nhập giá',
                    min: { value: 0, message: 'Giá phải lớn hơn 0' }
                  })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                )}
              </div>

              {/* Hình ảnh */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Hình Ảnh
                  </label>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={addImageUrl}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    + Thêm ảnh
                  </motion.button>
                </div>
                {imageUrls.map((url, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => updateImageUrl(index, e.target.value)}
                      placeholder="URL hình ảnh"
                      className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => removeImageUrl(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Xóa
                    </motion.button>
                  </div>
                ))}
              </div>

              {/* Kích thước */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Kích Thước
                  </label>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={addSizeInput}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    + Thêm kích thước
                  </motion.button>
                </div>
                {sizeInputs.map((size, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={size.size}
                      onChange={(e) => updateSizeInput(index, 'size', e.target.value)}
                      placeholder="Tên kích thước"
                      className="w-1/3 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      step="0.01"
                      value={size.price}
                      onChange={(e) => updateSizeInput(index, 'price', parseFloat(e.target.value))}
                      placeholder="Giá"
                      className="w-1/3 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => removeSizeInput(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Xóa
                    </motion.button>
                  </div>
                ))}
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

export default ProductManagement; 