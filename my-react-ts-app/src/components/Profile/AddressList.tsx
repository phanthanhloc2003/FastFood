import React from 'react';
import { motion } from 'framer-motion';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Address } from '../../types';

interface AddressListProps {
  addresses: Address[];
  onAddAddress: () => void;
  onEditAddress: (address: Address) => void;
  onDeleteAddress: (address: Address) => void;
}

const AddressList: React.FC<AddressListProps> = ({
  addresses,
  onAddAddress,
  onEditAddress,
  onDeleteAddress,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Địa chỉ của tôi</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAddAddress}
          className="flex items-center px-4 py-2 bg-primary-main text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Thêm địa chỉ mới
        </motion.button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((address, index) => (
          <motion.div
            key={address.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{address.fullName}</h3>
                <p className="text-sm text-gray-500">{address.phone}</p>
              </div>
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onEditAddress(address)}
                  className="p-2 text-gray-500 hover:text-primary-main transition-colors"
                >
                  <PencilIcon className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onDeleteAddress(address)}
                  className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                >
                  <TrashIcon className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              {address.address}, {address.ward}, {address.district}, {address.city}
            </p>
            {address.isDefault && (
              <span className="mt-2 inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                Mặc định
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AddressList; 