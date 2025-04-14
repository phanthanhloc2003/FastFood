import React from 'react';
import { motion } from 'framer-motion';
import { PencilIcon, TrashIcon, CheckIcon } from '@heroicons/react/24/outline';
import { Address } from '../../types';

interface AddressCardProps {
  address: Address;
  onEdit: (address: Address) => void;
  onDelete: (id: number) => void;
  onSetDefault: (id: number) => void;
}

const AddressCard: React.FC<AddressCardProps> = ({
  address,
  onEdit,
  onDelete,
  onSetDefault,
}) => {
  return (
    <motion.div
      layout
      className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 ${
        address.is_default ? 'border-2 border-primary-main' : 'border border-gray-200'
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-medium text-gray-800">{address.name}</h3>
            {address.is_default && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-primary-main text-white rounded-full"
              >
                <CheckIcon className="w-3 h-3 mr-1" />
                Mặc định
              </motion.span>
            )}
          </div>
          <p className="text-sm text-gray-600 mb-1">{address.phone}</p>
          <p className="text-sm text-gray-600">
            {address.address_line}, {address.ward}, {address.district}, {address.province}
          </p>
        </div>
        
        <div className="flex flex-col gap-2 ml-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onEdit(address);
            }}
            className="p-1.5 text-gray-500 hover:text-primary-main transition-colors rounded-full hover:bg-primary-light/20"
          >
            <PencilIcon className="w-4 h-4" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete(address.id);
            }}
            className="p-1.5 text-gray-500 hover:text-red-600 transition-colors rounded-full hover:bg-red-50"
          >
            <TrashIcon className="w-4 h-4" />
          </motion.button>
          
          {!address.is_default && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onSetDefault(address.id);
              }}
              className="p-1.5 text-gray-500 hover:text-primary-main transition-colors rounded-full hover:bg-primary-light/20"
            >
              <CheckIcon className="w-4 h-4" />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AddressCard; 