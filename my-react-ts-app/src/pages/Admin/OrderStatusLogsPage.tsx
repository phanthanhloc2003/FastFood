import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { orderStatusLogs } from '../../mocks/orderStatusLogs';
import OrderStatusLogCard from '../../components/OrderStatusLogCard';
import { OrderStatusLog } from '../../types/orderStatus';

const OrderStatusLogsPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'Pending' | 'Completed' | 'Cancelled'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = orderStatusLogs.filter(log => {
    const matchesFilter = filter === 'all' || log.status === filter;
    const matchesSearch = searchTerm === '' || 
      log.order_id.toString().includes(searchTerm) ||
      log.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusCount = (status: string) => {
    return orderStatusLogs.filter(log => log.status === status).length;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Quản lý trạng thái đơn hàng</h1>
          <p className="mt-2 text-sm text-gray-700">
            Theo dõi và quản lý lịch sử trạng thái của tất cả đơn hàng
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Tìm kiếm theo mã đơn hoặc nội dung..."
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
              Tất cả ({orderStatusLogs.length})
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

        {/* Logs List */}
        <div className="grid gap-4">
          <AnimatePresence>
            {filteredLogs.map((log) => (
              <OrderStatusLogCard key={log.id} log={log} />
            ))}
          </AnimatePresence>
        </div>

        {filteredLogs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500">Không tìm thấy kết quả phù hợp</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default OrderStatusLogsPage; 