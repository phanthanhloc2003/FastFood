import { Notification } from '../types/notification';

export const notifications: Notification[] = [
  {
    id: 1,
    order_id: 1,
    user_id: 1,
    message: 'Đơn hàng #1 đã được tạo bởi Nguyễn Văn A',
    status: 'Unread',
    created_at: '2024-03-20T10:00:00Z',
    user: {
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com'
    },
    order: {
      id: 1,
      total_price: 150000
    }
  },
  {
    id: 2,
    order_id: 2,
    user_id: 2,
    message: 'Đơn hàng #2 đã bị hủy bởi Trần Thị B',
    status: 'Read',
    created_at: '2024-03-20T11:30:00Z',
    user: {
      name: 'Trần Thị B',
      email: 'tranthib@example.com'
    },
    order: {
      id: 2,
      total_price: 250000
    }
  },
  {
    id: 3,
    order_id: 3,
    user_id: 3,
    message: 'Đơn hàng #3 đã được thanh toán thành công',
    status: 'Unread',
    created_at: '2024-03-21T09:15:00Z',
    user: {
      name: 'Lê Văn C',
      email: 'levanc@example.com'
    },
    order: {
      id: 3,
      total_price: 180000
    }
  },
  {
    id: 4,
    order_id: 4,
    user_id: 4,
    message: 'Yêu cầu hủy đơn hàng #4 từ Phạm Thị D',
    status: 'Unread',
    created_at: '2024-03-21T14:20:00Z',
    user: {
      name: 'Phạm Thị D',
      email: 'phamthid@example.com'
    },
    order: {
      id: 4,
      total_price: 320000
    }
  },
  {
    id: 5,
    order_id: 5,
    user_id: 5,
    message: 'Đơn hàng #5 đã được giao thành công',
    status: 'Read',
    created_at: '2024-03-22T16:00:00Z',
    user: {
      name: 'Hoàng Văn E',
      email: 'hoangvane@example.com'
    },
    order: {
      id: 5,
      total_price: 210000
    }
  }
]; 