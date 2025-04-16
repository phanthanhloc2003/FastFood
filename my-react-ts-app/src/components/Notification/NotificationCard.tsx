import { motion } from "framer-motion";
import { BellAlertIcon, BellIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { Notification } from "../../types/notification";

interface NotificationCardProps {
  notification: Notification;
  onMarkAsRead: (id: number) => void;
  isUpdating?: boolean;
}

const NotificationCard = ({ notification, onMarkAsRead, isUpdating }: NotificationCardProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`p-4 rounded-lg border ${
        notification.status === 'Read'
          ? "bg-gray-50 border-gray-200"
          : "bg-white border-orange-200 shadow-sm"
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          {notification.status === 'Read' ? (
            <BellIcon className="w-6 h-6 text-gray-400" />
          ) : (
            <BellAlertIcon className="w-6 h-6 text-orange-500" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-medium text-gray-900">
                {notification.user?.name || 'Khách hàng'}
              </h3>
              <span className="text-xs px-2 py-1 bg-orange-100 text-orange-800 rounded-full">
                Đơn hàng #{notification.order_id}
              </span>
            </div>
            <span className="text-xs text-gray-500">
              {format(new Date(notification.created_at), "HH:mm dd/MM/yyyy")}
            </span>
          </div>

          <div className="mt-2 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <ShoppingBagIcon className="w-4 h-4 text-orange-500" />
              <span>{notification.message}</span>
            </div>
            {notification.order && (
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm text-gray-600">Tổng tiền:</span>
                <span className="text-sm font-medium text-orange-600">
                  {formatCurrency(notification.order.total_price)}
                </span>
              </div>
            )}
          </div>

          {notification.status === 'Unread' && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onMarkAsRead(notification.id)}
              disabled={isUpdating}
              className="mt-3 px-3 py-1.5 text-xs bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
            >
              {isUpdating ? "Đang cập nhật..." : "Đánh dấu đã đọc"}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default NotificationCard; 