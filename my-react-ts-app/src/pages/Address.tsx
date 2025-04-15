import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusIcon, MapPinIcon } from "@heroicons/react/24/outline";
import AddressForm from "../components/Address/AddressForm";
import AddressCard from "../components/Address/AddressCard";
import type { Address as adress } from "../types";
import { addressApi } from "../services/address";

export interface AddressFormData {
  name: string;
  phone: string;
  address_line: string;
  province: string;
  district: string;
  ward: string;
  is_default: boolean;
}

export const Address: React.FC = () => {
  const [addresses, setAddresses] = useState<adress[] | null>();
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<adress | null>(null);
  const [loadPage , setLoadPage] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    const fectData = async () => {
      const data = await addressApi.getAll();
      setAddresses(data)
    };

    const timer = setTimeout(() => {
      fectData();
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [loadPage]);

  const handleAddAddress = async (newAddress: AddressFormData) => {
    try {
      setIsSubmitting(true);
      const response = await addressApi.create(newAddress);
      if (response) {
        setShowForm(false);
        setLoadPage(!loadPage)
        setNotification({
          type: "success",
          message: "Thêm địa chỉ thành công!",
        });
      }
    } catch (error) {
      setNotification({
        type: "error",
        message: "Có lỗi xảy ra khi thêm địa chỉ",
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setNotification(null), 1000);
    }
  };

  const handleDeleteAddress = async (id: number) => {
    try {
      setIsSubmitting(true);
      const response = await addressApi.delete(id);
      if (response) {
        setLoadPage(!loadPage)
        setNotification({
          type: "success",
          message: "Xóa địa chỉ thành công!",
        });
      }
    } catch (error) {
      setNotification({
        type: "error",
        message: "Có lỗi xảy ra khi xóa địa chỉ",
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setNotification(null), 1000);
    }
  };

  const handleSetDefault = async (id: number) => {
    try {
      setIsSubmitting(true);
      const response =  await addressApi.setDefault(id);

      if (response) {
        setLoadPage(!loadPage)
        setNotification({
          type: 'success',
          message: 'Đã cập nhật địa chỉ mặc định!',
        });
      }
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Có lỗi xảy ra khi cập nhật địa chỉ mặc định',
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setNotification(null), 1000);
    }
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
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: {
        duration: 0.3,
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.98,
    },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-primary-main border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.h2
            className="text-xl font-bold text-gray-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Đang tải dữ liệu...
          </motion.h2>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            className="flex items-center justify-center mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <MapPinIcon className="h-12 w-12 text-primary-main" />
          </motion.div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Địa chỉ giao hàng
          </h1>
          <p className="text-gray-600">Quản lý địa chỉ giao hàng của bạn</p>
        </motion.div>

        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => {
            setEditingAddress(null);
            setShowForm(true);
          }}
          className="w-full mb-8 p-4 flex items-center justify-center space-x-2 bg-white rounded-xl border-2 border-dashed border-gray-300 text-gray-600 hover:border-primary-main hover:text-primary-main transition-colors duration-200 shadow-sm"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Thêm địa chỉ mới</span>
        </motion.button>

      {addresses &&   <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <AnimatePresence mode="popLayout">
            {addresses.map((address, index) => (
              <motion.div
                key={address.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ delay: index * 0.1 }}
                layout
              >
                <AddressCard
                  address={address}
                  onEdit={setEditingAddress}
                  onDelete={handleDeleteAddress}
                  onSetDefault={handleSetDefault}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>}

        <AnimatePresence>
          {showForm && (
            <AddressForm
              initialData={editingAddress}
              onSubmit={handleAddAddress}
              onClose={() => {
                setShowForm(false);
                setEditingAddress(null);
              }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
                notification.type === "success" ? "bg-green-500" : "bg-red-500"
              } text-white`}
            >
              {notification.message}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isSubmitting && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <motion.div
                className="bg-white rounded-xl p-6 flex flex-col items-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <motion.div
                  className="w-12 h-12 border-4 border-primary-main border-t-transparent rounded-full mb-4"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-gray-700"
                >
                  Đang xử lý...
                </motion.p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Address;
