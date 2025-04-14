import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon } from '@heroicons/react/24/outline';
import AddressForm from '../components/Address/AddressForm';
import AddressCard from '../components/Address/AddressCard';
import type { Address as adress } from '../types';

interface AddressFormData {
  name: string;
  phone: string;
  address_line: string;
  province: string;
  district: string;
  ward: string;
  is_default: boolean;
}

 export const Address: React.FC = () => {
  const [addresses, setAddresses] = useState<adress[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<adress | null>(null);

  const handleAddAddress = (newAddress: AddressFormData) => {
    const address: adress = {
      ...newAddress,
      id: Date.now(),
      created_at: new Date().toISOString(),
    };

    if (newAddress.is_default) {
      setAddresses(prev =>
        prev.map(addr => ({
          ...addr,
          is_default: false,
        }))
      );
    }

    setAddresses(prev => [...prev, address]);
    setShowForm(false);
  };

  const handleEditAddress = (updatedAddress: AddressFormData) => {
    if (editingAddress) {
      setAddresses(prev =>
        prev.map(addr =>
          addr.id === editingAddress.id ? { ...updatedAddress, id: editingAddress.id, created_at: editingAddress.created_at } : addr
        )
      );
    }
    setEditingAddress(null);
    setShowForm(false);
  };

  const handleDeleteAddress = (id: number) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
  };

  const handleSetDefault = (id: number) => {
    setAddresses(prev =>
      prev.map(addr => ({
        ...addr,
        is_default: addr.id === id,
      }))
    );
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

  // const itemVariants = {
  //   hidden: { opacity: 0, y: 20 },
  //   visible: { opacity: 1, y: 0 },
  // };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-24 pb-12">
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
          onClick={() => {
            setEditingAddress(null);
            setShowForm(true);
          }}
          className="w-full mb-8 p-4 flex items-center justify-center space-x-2 bg-white rounded-xl border-2 border-dashed border-gray-300 text-gray-600 hover:border-primary-main hover:text-primary-main transition-colors duration-200 shadow-sm"
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
              <AddressCard
                key={address.id}
                address={address}
                onEdit={setEditingAddress}
                onDelete={handleDeleteAddress}
                onSetDefault={handleSetDefault}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {showForm && (
            <AddressForm
              initialData={editingAddress}
              onSubmit={editingAddress ? handleEditAddress : handleAddAddress}
              onClose={() => {
                setShowForm(false);
                setEditingAddress(null);
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Address; 