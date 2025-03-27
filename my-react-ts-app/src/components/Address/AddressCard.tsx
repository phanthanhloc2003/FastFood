import React from 'react';
import { motion } from 'framer-motion';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Address {
  id: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  ward: string;
  isDefault: boolean;
}

interface AddressCardProps {
  address: Address;
  isSelected?: boolean;
  onSelect?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const AddressCard: React.FC<AddressCardProps> = ({
  address,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`p-4 rounded-xl border-2 ${
        isSelected ? 'border-red-500' : 'border-gray-200'
      } cursor-pointer hover:shadow-md transition-all duration-200`}
      onClick={onSelect}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-semibold text-gray-900">{address.fullName}</h3>
          <p className="text-gray-600">{address.phone}</p>
        </div>
        {address.isDefault && (
          <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">
            Mặc định
          </span>
        )}
      </div>

      <p className="text-gray-700 mb-4">
        {address.address}, {address.ward}, {address.district}, {address.city}
      </p>

      <div className="flex justify-end space-x-2">
        {onEdit && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="p-2 text-gray-600 hover:text-red-600 transition-colors"
          >
            <PencilIcon className="h-5 w-5" />
          </motion.button>
        )}
        {onDelete && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-2 text-gray-600 hover:text-red-600 transition-colors"
          >
            <TrashIcon className="h-5 w-5" />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default AddressCard; 