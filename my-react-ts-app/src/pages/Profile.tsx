import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import ProfileHeader from '../components/Profile/ProfileHeader';
import AvatarUploadModal from '../components/Profile/AvatarUploadModal';
import ProfileTabs from '../components/Profile/ProfileTabs';
import ProfileInfo from '../components/Profile/ProfileInfo';
import OrderList from '../components/Profile/OrderList';
import AddressList from '../components/Profile/AddressList';
import ProfileSettings from '../components/Profile/ProfileSettings';
import { Address, Order } from '../types';

const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
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

      } catch (err: any) {
        setError(err.message || 'Có lỗi xảy ra khi tải dữ liệu');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
        setShowAvatarUpload(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddAddress = () => {
    // TODO: Implement add address
  };

  const handleEditAddress = (address: Address) => {
    // TODO: Implement edit address
  };

  const handleDeleteAddress = (address: Address) => {
    // TODO: Implement delete address
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 mt-[50px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
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
    </div>
  );
};

export default Profile; 