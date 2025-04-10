import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrdersPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Quản lý đơn hàng</h1>
      <button onClick={() => navigate('/admin/orders/status-logs/1')}>
        Xem chi tiết đơn hàng
      </button>
    </div>
  );
};

export default OrdersPage; 