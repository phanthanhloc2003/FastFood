import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { notifications } from '../../mocks/notifications';
import NotificationCard from '../../components/NotificationCard';
import { Notification } from '../../types/notification';

const NotificationsPage: React.FC = () => {
  const [notificationsList, setNotificationsList] = useState<Notification[]>(notifications);
  const [filter, setFilter] = useState<'all' | 'Unread' | 'Read'>('all');

  const filteredNotifications = notificationsList.filter(notification => {
    if (filter === 'all') return true;
    return notification.status === filter;
  });

  const handleMarkAsRead = (id: number) => {
    setNotificationsList(notificationsList.map(notification => {
      if (notification.id === id) {
        return {
          ...notification,
          status: 'Read'
        };
      }
      return notification;
    }));
  };

  const getUnreadCount = () => {
    return notificationsList.filter(n => n.status === 'Unread').length;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Quản lý thông báo</h1>
          <p className="mt-2 text-sm text-gray-700">
            Theo dõi và quản lý tất cả thông báo hệ thống
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex space-x-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'all'
                ? 'bg-orange-500 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Tất cả ({notificationsList.length})
          </button>
          <button
            onClick={() => setFilter('Unread')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'Unread'
                ? 'bg-orange-500 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Chưa đọc ({getUnreadCount()})
          </button>
          <button
            onClick={() => setFilter('Read')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'Read'
                ? 'bg-orange-500 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Đã đọc ({notificationsList.length - getUnreadCount()})
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredNotifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onMarkAsRead={handleMarkAsRead}
              />
            ))}
          </AnimatePresence>
        </div>

        {filteredNotifications.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500">Không có thông báo nào</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage; 