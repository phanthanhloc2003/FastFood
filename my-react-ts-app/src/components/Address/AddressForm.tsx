import React from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import type { Address } from '../../types';

interface AddressFormData {
  name: string;
  phone: string;
  address_line: string;
  province: string;
  district: string;
  ward: string;
  is_default: boolean;
}

interface AddressFormProps {
  initialData?: Address | null;
  onSubmit: (address: AddressFormData) => void;
  onClose: () => void;
}

const schema = yup.object().shape({
  name: yup.string().required('Vui lòng nhập họ và tên'),
  phone: yup
    .string()
    .required('Vui lòng nhập số điện thoại')
    .matches(/^(0|\+84)[0-9]{9}$/, 'Số điện thoại không hợp lệ'),
  address_line: yup.string().required('Vui lòng nhập địa chỉ'),
  province: yup.string().required('Vui lòng nhập tỉnh/thành'),
  district: yup.string().required('Vui lòng nhập quận/huyện'),
  ward: yup.string().required('Vui lòng nhập phường/xã'),
  is_default: yup.boolean().default(false),
});

const AddressForm: React.FC<AddressFormProps> = ({ initialData, onSubmit, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddressFormData>({
    resolver: yupResolver(schema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          phone: initialData.phone,
          address_line: initialData.address_line,
          province: initialData.province,
          district: initialData.district,
          ward: initialData.ward,
          is_default: initialData.is_default,
        }
      : {
          name: '',
          phone: '',
          address_line: '',
          province: '',
          district: '',
          ward: '',
          is_default: false,
        },
  });

  const onSubmitForm = (data: AddressFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="bg-white rounded-xl p-6 w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-4">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-semibold text-gray-800"
          >
            {initialData ? 'Chỉnh sửa địa chỉ' : 'Thêm địa chỉ mới'}
          </motion.h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="w-6 h-6" />
          </motion.button>
        </div>

        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Họ và tên
            </label>
            <input
              {...register('name')}
              type="text"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-main focus:border-transparent ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm mt-1"
              >
                {errors.name.message}
              </motion.p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số điện thoại
            </label>
            <input
              {...register('phone')}
              type="tel"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-main focus:border-transparent ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.phone && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm mt-1"
              >
                {errors.phone.message}
              </motion.p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Địa chỉ
            </label>
            <input
              {...register('address_line')}
              type="text"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-main focus:border-transparent ${
                errors.address_line ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.address_line && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm mt-1"
              >
                {errors.address_line.message}
              </motion.p>
            )}
          </motion.div>

          <motion.div
            className="grid grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tỉnh/Thành
              </label>
              <input
                {...register('province')}
                type="text"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-main focus:border-transparent ${
                  errors.province ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.province && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.province.message}
                </motion.p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quận/Huyện
              </label>
              <input
                {...register('district')}
                type="text"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-main focus:border-transparent ${
                  errors.district ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.district && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.district.message}
                </motion.p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phường/Xã
              </label>
              <input
                {...register('ward')}
                type="text"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-main focus:border-transparent ${
                  errors.ward ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.ward && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.ward.message}
                </motion.p>
              )}
            </div>
          </motion.div>

          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <input
              {...register('is_default')}
              type="checkbox"
              id="is_default"
              className="h-4 w-4 text-primary-main focus:ring-primary-main border-gray-300 rounded"
            />
            <label htmlFor="is_default" className="ml-2 block text-sm text-gray-700">
              Đặt làm địa chỉ mặc định
            </label>
          </motion.div>

          <motion.div
            className="flex justify-end space-x-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.button
              type="button"
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Hủy
            </motion.button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-main rounded-lg hover:bg-primary-dark"
            >
              {initialData ? 'Cập nhật' : 'Thêm mới'}
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddressForm; 