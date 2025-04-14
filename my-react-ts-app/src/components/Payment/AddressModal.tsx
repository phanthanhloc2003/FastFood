import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Address } from '../../types/address';

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  addresses: Address[];
  selectedAddress: Address | null;
  onSelectAddress: (address: Address) => void;
  onAddNewAddress: () => void;
}

const AddressModal: React.FC<AddressModalProps> = ({
  isOpen,
  onClose,
  addresses,
  selectedAddress,
  onSelectAddress,
  onAddNewAddress,
}) => {
  const modalVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      opacity: 0, 
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={overlayVariants}
        >
          <div className="fixed inset-0 bg-black/50" onClick={onClose} />
          
          <motion.div
            className="relative w-full max-w-md bg-white rounded-xl shadow-xl"
            variants={modalVariants}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-medium text-gray-900">Chọn địa chỉ giao hàng</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4 max-h-[60vh] overflow-y-auto">
              <div className="space-y-3">
                {addresses.map((address) => (
                  <motion.div
                    key={address.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedAddress?.id === address.id
                        ? 'border-primary-main bg-primary-light/10'
                        : 'border-gray-200 hover:border-primary-main'
                    }`}
                    onClick={() => {
                      onSelectAddress(address);
                      onClose();
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{address.name}</p>
                        <p className="text-gray-600">{address.phone}</p>
                        <p className="text-gray-600 mt-1">
                          {address.address_line}, {address.ward}, {address.district}, {address.province}
                        </p>
                      </div>
                      {address.is_default && (
                        <span className="px-2 py-1 text-xs font-medium text-primary-main bg-primary-light/20 rounded-full">
                          Mặc định
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                className="w-full mt-4 flex items-center justify-center gap-2 bg-primary-main text-white py-3 rounded-lg font-medium"
                onClick={onAddNewAddress}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <PlusIcon className="w-5 h-5" />
                Thêm địa chỉ mới
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddressModal; 