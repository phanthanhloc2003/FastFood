import { useState } from 'react';
import { motion } from 'framer-motion';
import OrderCard from '../components/OrderCard';
import { mockOrders } from '../data/mockOrders';

const UserOrders = () => {
    const [filter, setFilter] = useState<string>('all');

    const filteredOrders = mockOrders.filter(order => {
        if (filter === 'all') return true;
        return order.status === filter;
    });

    return (
        <div className="container mx-auto px-4 py-8">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold mb-8 text-center"
            >
                Đơn hàng của tôi
            </motion.h1>

            <div className="flex justify-center mb-8">
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
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="grid gap-6"
            >
                {filteredOrders.map((order, index) => (
                    <OrderCard key={order.id} order={order} />
                ))}
            </motion.div>
        </div>
    );
};

export default UserOrders; 