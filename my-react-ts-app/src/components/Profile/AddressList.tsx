import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PencilIcon, TrashIcon, PlusIcon, CheckIcon } from '@heroicons/react/24/outline';
import { Address } from '../../types';

interface AddressListProps {
  addresses: Address[];
  onAddAddress: () => void;
  onDeleteAddress: (address: Address) => void;
  onSetDefault: (address: Address) => void;
}

const AddressList: React.FC<AddressListProps> = ({
  addresses,
  onAddAddress,
  onDeleteAddress,
  onSetDefault,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-800">Địa chỉ của tôi</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAddAddress}
          className="flex items-center px-3 py-1.5 bg-primary-main text-white rounded-lg hover:bg-primary-dark transition-colors text-sm"
        >
          <PlusIcon className="w-4 h-4 mr-1" />
          Thêm địa chỉ
        </motion.button>
      </div>
      
      <div className="space-y-3">
        <AnimatePresence>
          {addresses.map((address, index) => (
            <motion.div
              key={address.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ 
                type: 'spring',
                stiffness: 300,
                damping: 25,
                delay: index * 0.05 
              }}
              className={`border rounded-xl p-4 ${address.is_default ? 'border-primary-main bg-primary-light/10' : 'border-gray-200'} hover:shadow-md transition-all duration-300`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
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
                    onClick={() => onDeleteAddress(address)}
                    className="p-1.5 text-gray-500 hover:text-red-600 transition-colors rounded-full hover:bg-red-50"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </motion.button>
                  
                  {!address.is_default && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onSetDefault(address)}
                      className="p-1.5 text-gray-500 hover:text-primary-main transition-colors rounded-full hover:bg-primary-light/20"
                    >
                      <CheckIcon className="w-4 h-4" />
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AddressList; 