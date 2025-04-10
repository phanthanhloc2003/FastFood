import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { mockOrders } from '../../data/mockOrders';

const OrderDetailPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  if (!orderId || isNaN(Number(orderId))) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900">ID đơn hàng không hợp lệ</h1>
          <button
            onClick={() => navigate('/admin/orders')}
            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Quay lại danh sách đơn hàng
          </button>
        </div>
      </div>
    );
  }

  // Tìm đơn hàng theo ID
  const order = mockOrders.find(order => order.id === Number(orderId));
  
  // Kiểm tra đơn hàng có tồn tại không
  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900">Không tìm thấy đơn hàng #{orderId}</h1>
          <button
            onClick={() => navigate('/admin/orders')}
            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Quay lại danh sách đơn hàng
          </button>
        </div>
      </div>
    );
  }

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
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b">
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() => navigate('/admin/orders')}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeftIcon className="w-6 h-6 text-gray-600" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Chi tiết đơn hàng #{order.id}</h1>
            </div>
            <div className="flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {order.status}
              </span>
              <p className="text-gray-500 text-sm">
                Đặt lúc: {formatDate(order.created_at)}
              </p>
            </div>
          </div>

          {/* Thông tin khách hàng */}
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold mb-4">Thông tin khách hàng</h2>
            <div className="grid gap-2">
              <p><span className="font-medium">Tên:</span> {order.user?.name}</p>
              <p><span className="font-medium">Email:</span> {order.user?.email}</p>
              {order.address && (
                <>
                  <p><span className="font-medium">Địa chỉ:</span> {order.address.street}, {order.address.city}</p>
                  <p><span className="font-medium">SĐT:</span> {order.address.phone}</p>
                </>
              )}
              {order.table_number && (
                <p><span className="font-medium">Bàn số:</span> {order.table_number}</p>
              )}
            </div>
          </div>

          {/* Thông tin đơn hàng */}
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold mb-4">Thông tin đơn hàng</h2>
            <div className="mb-4">
              <p className="font-medium">Phương thức: {order.delivery_type}</p>
            </div>
            <div className="space-y-4">
              {/* Danh sách món ăn */}
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Món ăn</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số lượng</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Đơn giá</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {order.items.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            {item.image && (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-10 w-10 rounded-full object-cover mr-3"
                              />
                            )}
                            <div>
                              <div className="text-sm font-medium text-gray-900">{item.name}</div>
                              {item.note && (
                                <div className="text-xs text-gray-500">Ghi chú: {item.note}</div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{item.quantity}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{item.price.toLocaleString('vi-VN')}đ</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{(item.price * item.quantity).toLocaleString('vi-VN')}đ</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end">
                <div className="text-right">
                  <p className="text-gray-600">Tổng tiền:</p>
                  <p className="text-2xl font-bold text-orange-500">
                    {order.total_price.toLocaleString('vi-VN')}đ
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          {order.status === 'Pending' && (
            <div className="p-6 flex gap-4">
              <button
                onClick={() => {
                  // Gọi API xác nhận đơn hàng
                  console.log('Xác nhận đơn hàng:', order.id);
                }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <CheckCircleIcon className="w-5 h-5" />
                Xác nhận đơn hàng
              </button>
              <button
                onClick={() => {
                  // Gọi API hủy đơn hàng
                  console.log('Hủy đơn hàng:', order.id);
                }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <XCircleIcon className="w-5 h-5" />
                Hủy đơn hàng
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default OrderDetailPage; 