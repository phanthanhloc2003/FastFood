import React from 'react';
import { motion } from 'framer-motion';
import { Notification } from '../types/notification';
import { BellIcon } from '@heroicons/react/24/outline';

interface NotificationCardProps {
  notification: Notification;
  onMarkAsRead: (id: number) => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ notification, onMarkAsRead }) => {
  const isUnread = notification.status === 'Unread';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition-shadow ${
        isUnread ? 'border-l-4 border-orange-500' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <BellIcon className={`h-5 w-5 ${isUnread ? 'text-orange-500' : 'text-gray-400'}`} />
            <span className={`text-sm font-medium ${isUnread ? 'text-orange-500' : 'text-gray-500'}`}>
              {new Date(notification.created_at).toLocaleDateString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
          <p className="text-gray-800">{notification.message}</p>
          {notification.user && (
            <div className="mt-2 text-sm text-gray-600">
              <p>Khách hàng: {notification.user.name}</p>
              <p>Email: {notification.user.email}</p>
            </div>
          )}
          {notification.order && (
            <div className="mt-2 text-sm text-gray-600">
              <p>Mã đơn: #{notification.order.id}</p>
              <p>
                Tổng tiền:{' '}
                {notification.order.total_price.toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND'
                })}
              </p>
            </div>
          )}
        </div>
        {isUnread && (
          <button
            onClick={() => onMarkAsRead(notification.id)}
            className="px-3 py-1 text-sm text-orange-500 hover:text-orange-600"
          >
            Đánh dấu đã đọc
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default NotificationCard; 