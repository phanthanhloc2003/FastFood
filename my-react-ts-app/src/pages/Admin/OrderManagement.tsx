import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

interface Order {
  id: number;
  customerName: string;
  phone: string;
  address: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      customerName: 'Nguyễn Văn A',
      phone: '0123456789',
      address: '123 Đường ABC, Quận 1, TP.HCM',
      items: [
        { name: 'Burger Bò', quantity: 2, price: 50000 },
        { name: 'Coca Cola', quantity: 1, price: 20000 },
      ],
      total: 120000,
      status: 'pending',
      createdAt: '2024-03-20T10:00:00',
    },
    {
      id: 2,
      customerName: 'Trần Thị B',
      phone: '0987654321',
      address: '456 Đường XYZ, Quận 2, TP.HCM',
      items: [
        { name: 'Pizza Hải Sản', quantity: 1, price: 150000 },
        { name: 'Pepsi', quantity: 2, price: 20000 },
      ],
      total: 190000,
      status: 'pending',
      createdAt: '2024-03-20T11:30:00',
    },
    {
      id: 3,
      customerName: 'Lê Văn C',
      phone: '0369852147',
      address: '789 Đường DEF, Quận 3, TP.HCM',
      items: [
        { name: 'Gà Rán', quantity: 3, price: 35000 },
        { name: 'Khoai Tây Chiên', quantity: 2, price: 25000 },
        { name: '7Up', quantity: 1, price: 20000 },
      ],
      total: 175000,
      status: 'confirmed',
      createdAt: '2024-03-20T09:15:00',
    },
  ]);

  const handleConfirmOrder = (orderId: number) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: 'confirmed' } : order
    ));
  };

  const handleCancelOrder = (orderId: number) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: 'cancelled' } : order
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Quản lý đơn hàng</h1>
      
      <div className="grid gap-6">
        {orders.map((order) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold">Đơn hàng #{order.id}</h2>
                <p className="text-gray-600">Thời gian: {formatDate(order.createdAt)}</p>
              </div>
              <div className="flex space-x-2">
                {order.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleConfirmOrder(order.id)}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center"
                    >
                      <CheckCircleIcon className="w-5 h-5 mr-2" />
                      Xác nhận
                    </button>
                    <button
                      onClick={() => handleCancelOrder(order.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center"
                    >
                      <XCircleIcon className="w-5 h-5 mr-2" />
                      Huỷ đơn
                    </button>
                  </>
                )}
                {order.status === 'confirmed' && (
                  <span className="bg-green-100 text-green-800 px-4 py-2 rounded-lg">
                    Đã xác nhận
                  </span>
                )}
                {order.status === 'cancelled' && (
                  <span className="bg-red-100 text-red-800 px-4 py-2 rounded-lg">
                    Đã huỷ
                  </span>
                )}
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">Thông tin khách hàng</h3>
              <p>Tên: {order.customerName}</p>
              <p>SĐT: {order.phone}</p>
              <p>Địa chỉ: {order.address}</p>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">Chi tiết đơn hàng</h3>
              <div className="border rounded-lg">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between p-3 border-b last:border-b-0">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-gray-600">Số lượng: {item.quantity}</p>
                    </div>
                    <p className="font-medium">{item.price.toLocaleString('vi-VN')}đ</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <p className="text-xl font-bold">
                Tổng tiền: {order.total.toLocaleString('vi-VN')}đ
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OrderManagement; 