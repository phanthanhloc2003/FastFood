import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon } from '@heroicons/react/24/outline';
import AddressForm from '../components/Address/AddressForm';
import AddressCard from '../components/Address/AddressCard';

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

const Address: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  const handleAddAddress = (newAddress: Omit<Address, 'id'>) => {
    const address = {
      ...newAddress,
      id: Date.now().toString(),
    };

    if (newAddress.isDefault) {
      setAddresses(prev =>
        prev.map(addr => ({
          ...addr,
          isDefault: false,
        }))
      );
    }

    setAddresses(prev => [...prev, address]);
    setShowAddForm(false);
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Địa chỉ giao hàng</h1>
          <p className="text-gray-600">Quản lý địa chỉ giao hàng của bạn</p>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAddForm(true)}
          className="w-full mb-8 p-4 flex items-center justify-center space-x-2 bg-white rounded-xl border-2 border-dashed border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500 transition-colors duration-200"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Thêm địa chỉ mới</span>
        </motion.button>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <AnimatePresence>
            {addresses.map(address => (
              <motion.div
                key={address.id}
                variants={itemVariants}
                layout
                exit={{ opacity: 0, x: -100 }}
              >
                <AddressCard
                  address={address}
                  isSelected={selectedAddress === address.id}
                  onSelect={() => setSelectedAddress(address.id)}
                  onDelete={() => handleDeleteAddress(address.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {showAddForm && (
            <AddressForm
              onSubmit={handleAddAddress}
              onClose={() => setShowAddForm(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Address; 