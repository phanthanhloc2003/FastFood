import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { orderApi } from '../services/order';
import { OrderResponse } from '../types/orderStatus';
import { format } from 'date-fns';
import { 
  ShoppingBagIcon, 
  ClockIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  MapPinIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';

const UserOrders = () => {
    const [filter, setFilter] = useState<string>('all');
    const [orders, setOrders] = useState<OrderResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCancelling, setIsCancelling] = useState<number | null>(null);

    const filteredOrders = orders.filter(order => {
        if (filter === 'all') return true;
        return order.status === filter;
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const data = await orderApi.getHistory();
                if (data) {
                    setOrders(data);
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleCancelOrder = async (orderId: number, reason: string) => {
        try {
            setIsCancelling(orderId);
            // TODO: Call API to cancel order
            setOrders(orders.map(order => {
                if (order.id === orderId) {
                    return {
                        ...order,
                        status: 'Cancelled',
                        updated_at: new Date().toISOString()
                    };
                }
                return order;
            }));
        } catch (error) {
            console.error('Error cancelling order:', error);
        } finally {
            setIsCancelling(null);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'Completed':
                return 'bg-green-100 text-green-800';
            case 'Cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Pending':
                return <ClockIcon className="w-5 h-5 text-yellow-500" />;
            case 'Completed':
                return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
            case 'Cancelled':
                return <XCircleIcon className="w-5 h-5 text-red-500" />;
            default:
                return <ClockIcon className="w-5 h-5 text-gray-500" />;
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
                <motion.div
                    className="flex flex-col items-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div
                        className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full"
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
                        Đang tải đơn hàng...
                    </motion.h2>
                </motion.div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 py-8 px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 text-center"
                >
                    <h1 className="text-3xl font-bold text-gray-900">Lịch sử đơn hàng</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Theo dõi và quản lý tất cả đơn hàng của bạn
                    </p>
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-8"
                >
                    <div className="flex flex-wrap gap-2 justify-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 rounded-full transition-colors flex items-center gap-2 ${
                                filter === 'all' ? 'bg-orange-500 text-white' : 'bg-white hover:bg-gray-100'
                            }`}
                        >
                            <ShoppingBagIcon className="w-5 h-5" />
                            Tất cả ({orders.length})
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setFilter('Pending')}
                            className={`px-4 py-2 rounded-full transition-colors flex items-center gap-2 ${
                                filter === 'Pending' ? 'bg-orange-500 text-white' : 'bg-white hover:bg-gray-100'
                            }`}
                        >
                            <ClockIcon className="w-5 h-5" />
                            Đang xử lý ({orders.filter(o => o.status === 'Pending').length})
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setFilter('Completed')}
                            className={`px-4 py-2 rounded-full transition-colors flex items-center gap-2 ${
                                filter === 'Completed' ? 'bg-orange-500 text-white' : 'bg-white hover:bg-gray-100'
                            }`}
                        >
                            <CheckCircleIcon className="w-5 h-5" />
                            Đã hoàn thành ({orders.filter(o => o.status === 'Completed').length})
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setFilter('Cancelled')}
                            className={`px-4 py-2 rounded-full transition-colors flex items-center gap-2 ${
                                filter === 'Cancelled' ? 'bg-orange-500 text-white' : 'bg-white hover:bg-gray-100'
                            }`}
                        >
                            <XCircleIcon className="w-5 h-5" />
                            Đã hủy ({orders.filter(o => o.status === 'Cancelled').length})
                        </motion.button>
                    </div>
                </motion.div>

                {/* Orders List */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="space-y-4"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredOrders.map((order, index) => (
                            <motion.div
                                key={order.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                layout
                            >
                                <div className="bg-white rounded-xl shadow-lg overflow-hidden backdrop-blur-lg bg-opacity-90">
                                    <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium">
                                                    #{order.order_code}
                                                </span>
                                                <span className={`px-2 py-1 text-xs rounded-full flex items-center gap-1 ${
                                                    order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                    order.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {getStatusIcon(order.status)}
                                                    {order.status === 'Pending' ? 'Đang xử lý' :
                                                     order.status === 'Completed' ? 'Đã hoàn thành' :
                                                     order.status === 'Cancelled' ? 'Đã hủy' : order.status}
                                                </span>
                                            </div>
                                            <span className="text-sm text-orange-100">
                                                {format(new Date(order.created_at), "HH:mm dd/MM/yyyy")}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                                            <div className="flex items-start gap-3">
                                                <div className="p-2 bg-orange-100 rounded-full">
                                                    <MapPinIcon className="w-5 h-5 text-orange-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-600">Địa chỉ giao hàng:</p>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {order.address.address_line}, {order.address.ward}, {order.address.district}, {order.address.province}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-orange-100 rounded-full">
                                                    <CurrencyDollarIcon className="w-5 h-5 text-orange-600" />
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm text-gray-600">Tổng tiền:</p>
                                                    <p className="text-lg font-bold text-orange-600">
                                                        {new Intl.NumberFormat('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND'
                                                        }).format(Number(order.total_price))}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        {order.status === 'Pending' && (
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                disabled={isCancelling === order.id}
                                                onClick={() => handleCancelOrder(order.id, 'Khách hàng yêu cầu hủy')}
                                                className="w-full px-4 py-2 text-sm text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {isCancelling === order.id ? 'Đang hủy...' : 'Hủy đơn hàng'}
                                            </motion.button>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {filteredOrders.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-center py-12 bg-white rounded-xl shadow-lg"
                        >
                            <ShoppingBagIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500">Không có đơn hàng nào</p>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </motion.div>
    );
};

export default UserOrders; 