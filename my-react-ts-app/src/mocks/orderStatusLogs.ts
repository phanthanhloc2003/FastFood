import { OrderStatusLog } from '../types/orderStatus';

export const orderStatusLogs: OrderStatusLog[] = [
  {
    id: 1,
    order_id: 1,
    status: 'Pending',
    message: 'Đơn hàng đã được tạo và đang chờ xử lý',
    created_at: '2024-03-20T10:00:00Z'
  },
  {
    id: 2,
    order_id: 1,
    status: 'Completed',
    message: 'Đơn hàng đã được giao thành công',
    created_at: '2024-03-20T12:30:00Z'
  },
  {
    id: 3,
    order_id: 2,
    status: 'Pending',
    message: 'Đơn hàng mới được tạo',
    created_at: '2024-03-21T09:15:00Z'
  },
  {
    id: 4,
    order_id: 2,
    status: 'Cancelled',
    message: 'Khách hàng yêu cầu hủy đơn hàng',
    created_at: '2024-03-21T10:45:00Z'
  },
  {
    id: 5,
    order_id: 3,
    status: 'Pending',
    message: 'Đơn hàng đang được xử lý',
    created_at: '2024-03-22T14:20:00Z'
  },
  {
    id: 6,
    order_id: 4,
    status: 'Completed',
    message: 'Đơn hàng đã được giao và thanh toán',
    created_at: '2024-03-23T16:00:00Z'
  },
  {
    id: 7,
    order_id: 5,
    status: 'Pending',
    message: 'Đơn hàng mới được tạo',
    created_at: '2024-03-24T11:30:00Z'
  },
  {
    id: 8,
    order_id: 5,
    status: 'Completed',
    message: 'Đơn hàng đã hoàn thành',
    created_at: '2024-03-24T13:45:00Z'
  }
]; 