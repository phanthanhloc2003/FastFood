import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NotificationCard from '../../components/Notification/NotificationCard';
import { Notification } from '../../types/notification';
import { notificationApi } from '../../services/notification';

const NotificationsPage: React.FC = () => {
  const [notificationsList, setNotificationsList] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'all' | 'Unread' | 'Read'>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const filteredNotifications = notificationsList.filter(notification => {
    if (filter === 'all') return true;
    return notification.status === filter;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await notificationApi.getAll();
        setNotificationsList(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleMarkAsRead = async (id: number) => {
    try {
      setIsUpdating(true);
      await notificationApi.markAsRead(id);
      setNotificationsList(notificationsList.map(notification => {
        if (notification.id === id) {
          return {
            ...notification,
            status: 'Read'
          };
        }
        return notification;
      }));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setIsUpdating(true);
      await notificationApi.deleteNotification(id);
      setNotificationsList(notificationsList.filter(notification => notification.id !== id));
    } catch (error) {
      console.error('Error deleting notification:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const getUnreadCount = () => {
    return notificationsList.filter(n => n.status === 'Unread').length;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
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
            Đang tải thông báo...
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
      className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">Quản lý thông báo</h1>
          <p className="mt-2 text-sm text-gray-700">
            Theo dõi và quản lý tất cả thông báo hệ thống
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6 flex space-x-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'all'
                ? 'bg-orange-500 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Tất cả ({notificationsList.length})
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter('Unread')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'Unread'
                ? 'bg-orange-500 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Chưa đọc ({getUnreadCount()})
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter('Read')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'Read'
                ? 'bg-orange-500 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Đã đọc ({notificationsList.length - getUnreadCount()})
          </motion.button>
        </motion.div>

        {/* Notifications List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredNotifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                layout
              >
                <NotificationCard
                  notification={notification}
                  onMarkAsRead={handleMarkAsRead}
                  onDelete={handleDelete}
                  isUpdating={isUpdating}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredNotifications.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <p className="text-gray-500">Không có thông báo nào</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default NotificationsPage; 