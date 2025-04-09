import { motion } from 'framer-motion';
import { Order } from '../interface/order.interface';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

interface OrderCardProps {
    order: Order;
    isAdmin?: boolean;
}

const OrderCard = ({ order, isAdmin = false }: OrderCardProps) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Completed':
                return 'bg-green-100 text-green-800';
            case 'Pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'Cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow"
        >
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-lg font-semibold">Đơn hàng #{order.id}</h3>
                    <p className="text-gray-500 text-sm">
                        {format(new Date(order.created_at), 'dd/MM/yyyy HH:mm')}
                    </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                </span>
            </div>

            {isAdmin && order.user && (
                <div className="mb-4">
                    <p className="font-medium">Khách hàng: {order.user.name}</p>
                    <p className="text-gray-600 text-sm">Email: {order.user.email}</p>
                </div>
            )}

            <div className="mb-4">
                <p className="font-medium">Phương thức: {order.delivery_type}</p>
                {order.table_number && (
                    <p className="text-gray-600">Bàn số: {order.table_number}</p>
                )}
                {order.address && (
                    <div className="mt-2">
                        <p className="text-gray-600">Địa chỉ: {order.address.street}, {order.address.city}</p>
                        <p className="text-gray-600">SĐT: {order.address.phone}</p>
                    </div>
                )}
            </div>

            <div className="flex justify-between items-center">
                <p className="text-lg font-bold text-orange-600">
                    {order.total_price.toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                    })}
                </p>
            </div>
        </motion.div>
    );
};

export default OrderCard; 