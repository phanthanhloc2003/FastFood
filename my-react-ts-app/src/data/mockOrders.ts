import { Order } from '../interface/order.interface';

export const mockOrders: Order[] = [
    {
        id: 1,
        user_id: 1,
        table_number: 5,
        delivery_type: 'Dine-in',
        status: 'Completed',
        total_price: 150.00,
        created_at: '2024-04-01T10:00:00Z',
        updated_at: '2024-04-01T11:30:00Z',
        user: {
            name: 'Nguyen Van A',
            email: 'nguyenvana@example.com'
        }
    },
    {
        id: 2,
        user_id: 2,
        address_id: 1,
        delivery_type: 'Delivery',
        status: 'Pending',
        total_price: 200.00,
        created_at: '2024-04-02T15:30:00Z',
        updated_at: '2024-04-02T15:30:00Z',
        user: {
            name: 'Tran Thi B',
            email: 'tranthib@example.com'
        },
        address: {
            street: '123 Nguyen Hue',
            city: 'Ho Chi Minh',
            phone: '0901234567'
        }
    },
    {
        id: 3,
        user_id: 3,
        delivery_type: 'Take-away',
        status: 'Cancelled',
        total_price: 75.50,
        created_at: '2024-04-03T09:15:00Z',
        updated_at: '2024-04-03T10:00:00Z',
        user: {
            name: 'Le Van C',
            email: 'levanc@example.com'
        }
    }
]; 