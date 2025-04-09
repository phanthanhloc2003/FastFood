import { useState } from 'react';
import { motion } from 'framer-motion';
import OrderCard from '../components/OrderCard';
import { mockOrders } from '../data/mockOrders';

const AdminOrders = () => {
    const [filter, setFilter] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState<string>('');

    const filteredOrders = mockOrders.filter(order => {
        const matchesFilter = filter === 'all' || order.status === filter;
        const matchesSearch = searchTerm === '' || 
            order.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.id.toString().includes(searchTerm);
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="container mx-auto px-4 py-8">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold mb-8 text-center"
            >
                Quản lý đơn hàng
            </motion.h1>

            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div className="flex space-x-4 bg-white p-4 rounded-lg shadow-md">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-full ${
                            filter === 'all' ? 'bg-orange-500 text-white' : 'bg-gray-100'
                        }`}
                    >
                        Tất cả
                    </button>
                    <button
                        onClick={() => setFilter('Pending')}
                        className={`px-4 py-2 rounded-full ${
                            filter === 'Pending' ? 'bg-orange-500 text-white' : 'bg-gray-100'
                        }`}
                    >
                        Đang xử lý
                    </button>
                    <button
                        onClick={() => setFilter('Completed')}
                        className={`px-4 py-2 rounded-full ${
                            filter === 'Completed' ? 'bg-orange-500 text-white' : 'bg-gray-100'
                        }`}
                    >
                        Đã hoàn thành
                    </button>
                    <button
                        onClick={() => setFilter('Cancelled')}
                        className={`px-4 py-2 rounded-full ${
                            filter === 'Cancelled' ? 'bg-orange-500 text-white' : 'bg-gray-100'
                        }`}
                    >
                        Đã hủy
                    </button>
                </div>

                <div className="relative">
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo tên hoặc mã đơn hàng..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <svg
                        className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="grid gap-6"
            >
                {filteredOrders.map((order) => (
                    <OrderCard key={order.id} order={order} isAdmin={true} />
                ))}
            </motion.div>
        </div>
    );
};

export default AdminOrders; 