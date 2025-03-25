import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Address, Order } from '../types/user';
import { useNavigate } from 'react-router-dom';
import AddressForm from '../components/Address/AddressForm';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsLoading(true);
//         const [userData, ordersData, addressesData] = await Promise.all([
//           authAPI.getProfile(),
//           orderAPI.getOrders(),
//           addressAPI.getAddresses(),
//         ]);
//         setUser(userData.data);
//         setOrders(ordersData.data);
//         setAddresses(addressesData.data);
//       } catch (err) {
//         setError('Có lỗi xảy ra khi tải dữ liệu');
//         console.error(err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

  const handleLogout = async () => {
    try {
    
      localStorage.removeItem('token');
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddAddress = async (data: Omit<Address, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    try {
      // const response = await addressAPI.addAddress(data);
      // setAddresses([...addresses, response.data]);
      // setShowAddressForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateAddress = async (data: Omit<Address, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    // if (!editingAddress) return;
    // try {
    //   const response = await addressAPI.updateAddress(editingAddress.id, data);
    //   setAddresses(addresses.map(addr => 
    //     addr.id === editingAddress.id ? response.data : addr
    //   ));
    //   setShowAddressForm(false);
    //   setEditingAddress(null);
    // } catch (err) {
    //   console.error(err);
    // }
  };

  const handleDeleteAddress = async (id: string) => {
    // try {
    //   await addressAPI.deleteAddress(id);
    //   setAddresses(addresses.filter(addr => addr.id !== id));
    // } catch (err) {
    //   console.error(err);
    // }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Tabs */}
          <div className="border-b">
            <nav className="flex">
              {['profile', 'orders', 'addresses'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === tab
                      ? 'text-orange-600 border-b-2 border-orange-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab === 'profile'
                    ? 'Thông tin cá nhân'
                    : tab === 'orders'
                    ? 'Đơn hàng'
                    : 'Địa chỉ'}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={user?.avatar || 'https://via.placeholder.com/100'}
                      alt={user?.fullName}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                    <div>
                      <h2 className="text-2xl font-bold">{user?.fullName}</h2>
                      <p className="text-gray-600">{user?.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        value={user?.email}
                        readOnly
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Số điện thoại
                      </label>
                      <input
                        type="tel"
                        value={user?.phone}
                        readOnly
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleLogout}
                      className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Đăng xuất
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {activeTab === 'orders' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">
                            Đơn hàng #{order.id}
                          </h3>
                          <p className="text-gray-600">
                            {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            order.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : order.status === 'cancelled'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {order.status === 'completed'
                            ? 'Hoàn thành'
                            : order.status === 'cancelled'
                            ? 'Đã hủy'
                            : 'Đang xử lý'}
                        </span>
                      </div>

                      <div className="mt-4">
                        <p className="text-gray-600">
                          Tổng tiền: {order.totalAmount.toLocaleString('vi-VN')}đ
                        </p>
                        <p className="text-gray-600">
                          Địa chỉ: {order.address.address}
                        </p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'addresses' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  {showAddressForm ? (
                    <AddressForm
                      onSubmit={editingAddress ? handleUpdateAddress : handleAddAddress}
                      onCancel={() => {
                        setShowAddressForm(false);
                        setEditingAddress(null);
                      }}
                      initialData={editingAddress || undefined}
                    />
                  ) : (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowAddressForm(true)}
                        className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                      >
                        Thêm địa chỉ mới
                      </motion.button>

                      {addresses.map((address) => (
                        <div
                          key={address.id}
                          className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold">{address.fullName}</h3>
                              <p className="text-gray-600">{address.phone}</p>
                            </div>
                            {address.isDefault && (
                              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                                Mặc định
                              </span>
                            )}
                          </div>

                          <p className="mt-2 text-gray-600">
                            {address.address}, {address.ward}, {address.district},{' '}
                            {address.city}
                          </p>

                          <div className="mt-4 flex space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                setEditingAddress(address);
                                setShowAddressForm(true);
                              }}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              Sửa
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleDeleteAddress(address.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Xóa
                            </motion.button>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 