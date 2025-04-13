import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import ProfileHeader from '../components/Profile/ProfileHeader';
import AvatarUploadModal from '../components/Profile/AvatarUploadModal';
import ProfileTabs from '../components/Profile/ProfileTabs';
import ProfileInfo from '../components/Profile/ProfileInfo';
import OrderList from '../components/Profile/OrderList';
import AddressList from '../components/Profile/AddressList';
import ProfileSettings from '../components/Profile/ProfileSettings';
import { Address, Order } from '../types';
import { useNavigate } from 'react-router-dom';
import usersApi from '../services/user';

interface User {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  avatar: string;
  role: string;
  address: string | null;
  dateOfBirth: string | null;
  gender: string | null;
  createdAt: string;
  updatedAt: string;
}

const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user) as User;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAvatarUpload, setShowAvatarUpload] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Fetch user data, orders, and addresses here
        // const userData = await usersApi.getUserProfile();
        // const ordersData = await usersApi.getUserOrders();
        // const addressesData = await usersApi.getUserAddresses();
        // setOrders(ordersData);
        // setAddresses(addressesData);
      } catch (err: any) {
        setError(err.message || 'Có lỗi xảy ra khi tải dữ liệu');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('avatar', file);
  
        const data = await usersApi.updateAvatar(formData);
        if (data.avatar) {
          setAvatarPreview(data.avatar);
        }
        setShowAvatarUpload(false);
      } catch (error: any) {
        setError(error.message || 'Có lỗi xảy ra khi cập nhật avatar');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleAddAddress = () => {
    navigate("/address");
  };

  const handleEditAddress = (address: Address) => {
    // Implement edit address logic
  };

  const handleDeleteAddress = (address: Address) => {
    // Implement delete address logic
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 mt-[50px]"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm bg-opacity-90"
        >
          <ProfileHeader
            user={user}
            avatarPreview={avatarPreview}
            onAvatarClick={() => setShowAvatarUpload(true)}
          />

          <AvatarUploadModal
            isOpen={showAvatarUpload}
            onClose={() => setShowAvatarUpload(false)}
            onAvatarChange={handleAvatarChange}
          />

          <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

          <div className="p-6">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center items-center h-64"
                >
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-main"></div>
                </motion.div>
              ) : error ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-red-600"
                >
                  {error}
                </motion.div>
              ) : (
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === 'profile' && <ProfileInfo user={user} />}
                  {activeTab === 'orders' && <OrderList orders={orders} />}
                  {activeTab === 'addresses' && (
                    <AddressList
                      addresses={addresses}
                      onAddAddress={handleAddAddress}
                      onEditAddress={handleEditAddress}
                      onDeleteAddress={handleDeleteAddress}
                    />
                  )}
                  {activeTab === 'settings' && <ProfileSettings />}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Profile; 