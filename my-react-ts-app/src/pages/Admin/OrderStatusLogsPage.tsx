import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockOrders } from '../../data/mockOrders';
import { Order } from '../../interface/order.interface';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const OrderStatusLogsPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'Pending' | 'Completed' | 'Cancelled'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const navigate = useNavigate();

  const filteredOrders = orders.filter(order => {
    const matchesFilter = filter === 'all' || order.status === filter;
    const matchesSearch = searchTerm === '' || 
      order.id.toString().includes(searchTerm) ||
      order.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user?.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusCount = (status: string) => {
    return orders.filter(order => order.status === status).length;
  };

  const handleConfirmOrder = (orderId: number) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: 'Completed', updated_at: new Date().toISOString() } : order
    ));
  };

  const handleCancelOrder = (orderId: number) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: 'Cancelled', updated_at: new Date().toISOString() } : order
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Quản lý đơn hàng</h1>
          <p className="mt-2 text-sm text-gray-700">
            Theo dõi và quản lý tất cả đơn hàng
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Tìm kiếm theo mã đơn, tên hoặc email khách hàng..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg ${
                filter === 'all'
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              Tất cả ({orders.length})
            </button>
            <button
              onClick={() => setFilter('Pending')}
              className={`px-4 py-2 rounded-lg ${
                filter === 'Pending'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              Đang chờ ({getStatusCount('Pending')})
            </button>
            <button
              onClick={() => setFilter('Completed')}
              className={`px-4 py-2 rounded-lg ${
                filter === 'Completed'
                  ? 'bg-green-500 text-white'
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              Hoàn thành ({getStatusCount('Completed')})
            </button>
            <button
              onClick={() => setFilter('Cancelled')}
              className={`px-4 py-2 rounded-lg ${
                filter === 'Cancelled'
                  ? 'bg-red-500 text-white'
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              Đã hủy ({getStatusCount('Cancelled')})
            </button>
          </div>
        </div>

        {/* Orders List */}
        <div className="grid gap-4">
          <AnimatePresence>
            {filteredOrders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => navigate(`/admin/orders/status-logs/${order.id}`)}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">Đơn hàng #{order.id}</h3>
                      <p className="text-gray-500 text-sm">
                        {formatDate(order.created_at)}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>

                  <div className="mb-4">
                    <p className="font-medium">Khách hàng: {order.user?.name}</p>
                    <p className="text-gray-600 text-sm">Email: {order.user?.email}</p>
                    {order.address && (
                      <div className="mt-2">
                        <p className="text-gray-600 text-sm">Địa chỉ: {order.address.street}, {order.address.city}</p>
                        <p className="text-gray-600 text-sm">SĐT: {order.address.phone}</p>
                      </div>
                    )}
                    {order.table_number && (
                      <p className="text-gray-600 text-sm">Bàn số: {order.table_number}</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <p className="font-medium">Phương thức: {order.delivery_type}</p>
                    <p className="text-lg font-bold text-orange-500">
                      Tổng tiền: {order.total_price.toLocaleString('vi-VN')}đ
                    </p>
                  </div>

                  {order.status === 'Pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleConfirmOrder(order.id);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                      >
                        <CheckCircleIcon className="w-5 h-5" />
                        Xác nhận đơn hàng
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCancelOrder(order.id);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        <XCircleIcon className="w-5 h-5" />
                        Hủy đơn hàng
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredOrders.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500">Không tìm thấy đơn hàng phù hợp</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default OrderStatusLogsPage; 