import { Order } from '../interface/order.interface';

export const mockOrders: Order[] = [
    {
        id: 1,
        user_id: 1,
        table_number: 5,
        delivery_type: 'Dine-in',
        status: 'Completed',
        total_price: 150000,
        created_at: '2024-04-01T10:00:00Z',
        updated_at: '2024-04-01T11:30:00Z',
        items: [
            {
                id: 1,
                name: 'Burger Bò Phô Mai',
                quantity: 2,
                price: 50000,
                image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                note: 'Không hành tây, thêm phô mai'
            },
            {
                id: 2,
                name: 'Coca Cola',
                quantity: 1,
                price: 20000,
                image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
            },
            {
                id: 3,
                name: 'Khoai Tây Chiên',
                quantity: 1,
                price: 30000,
                image: 'https://images.unsplash.com/photo-1566478989037-eec042b0e1e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                note: 'Thêm tương cà'
            }
        ],
        user: {
            name: 'Nguyễn Văn A',
            email: 'nguyenvana@example.com'
        }
    },
    {
        id: 2,
        user_id: 2,
        address_id: 1,
        delivery_type: 'Delivery',
        status: 'Pending',
        total_price: 200000,
        created_at: '2024-04-02T15:30:00Z',
        updated_at: '2024-04-02T15:30:00Z',
        items: [
            {
                id: 4,
                name: 'Pizza Hải Sản',
                quantity: 1,
                price: 150000,
                image: 'https://images.unsplash.com/photo-1548372290-8d358b0612a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                note: 'Thêm phô mai, không ớt'
            },
            {
                id: 5,
                name: 'Pepsi',
                quantity: 2,
                price: 20000,
                image: 'https://images.unsplash.com/photo-1622483767078-4a1d0c4e7b71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
            }
        ],
        user: {
            name: 'Trần Thị B',
            email: 'tranthib@example.com'
        },
        address: {
            street: '123 Nguyễn Huệ',
            city: 'Quận 1, TP.HCM',
            phone: '0901234567'
        }
    },
    {
        id: 3,
        user_id: 3,
        delivery_type: 'Take-away',
        status: 'Cancelled',
        total_price: 175000,
        created_at: '2024-04-03T09:15:00Z',
        updated_at: '2024-04-03T10:00:00Z',
        items: [
            {
                id: 6,
                name: 'Gà Rán',
                quantity: 3,
                price: 35000,
                image: 'https://images.unsplash.com/photo-1559847844-1ff4d5b5f864?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                note: 'Không cay'
            },
            {
                id: 7,
                name: 'Khoai Tây Chiên',
                quantity: 2,
                price: 25000,
                image: 'https://images.unsplash.com/photo-1566478989037-eec042b0e1e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
            },
            {
                id: 8,
                name: '7Up',
                quantity: 1,
                price: 20000,
                image: 'https://images.unsplash.com/photo-1622483767078-4a1d0c4e7b71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
            }
        ],
        user: {
            name: 'Lê Văn C',
            email: 'levanc@example.com'
        }
    },
    {
        id: 4,
        user_id: 4,
        table_number: 8,
        delivery_type: 'Dine-in',
        status: 'Pending',
        total_price: 250000,
        created_at: '2024-04-04T12:00:00Z',
        updated_at: '2024-04-04T12:00:00Z',
        items: [
            {
                id: 9,
                name: 'Bò Bít Tết',
                quantity: 2,
                price: 80000,
                image: 'https://images.unsplash.com/photo-1544025162-1fbc2c1f1c6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                note: 'Chín vừa'
            },
            {
                id: 10,
                name: 'Salad Caesar',
                quantity: 1,
                price: 45000,
                image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
            },
            {
                id: 11,
                name: 'Nước Cam',
                quantity: 2,
                price: 25000,
                image: 'https://images.unsplash.com/photo-1615485925619-2d1b4a1b0b5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
            }
        ],
        user: {
            name: 'Phạm Thị D',
            email: 'phamthid@example.com'
        }
    },
    {
        id: 5,
        user_id: 5,
        address_id: 2,
        delivery_type: 'Delivery',
        status: 'Pending',
        total_price: 300000,
        created_at: '2024-04-05T18:30:00Z',
        updated_at: '2024-04-05T18:30:00Z',
        items: [
            {
                id: 12,
                name: 'Lẩu Thái',
                quantity: 1,
                price: 200000,
                image: 'https://images.unsplash.com/photo-1544145945-db0d1a1c3c1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                note: 'Ít cay'
            },
            {
                id: 13,
                name: 'Bánh Mì',
                quantity: 2,
                price: 30000,
                image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
            },
            {
                id: 14,
                name: 'Trà Đào',
                quantity: 2,
                price: 20000,
                image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
            }
        ],
        user: {
            name: 'Hoàng Văn E',
            email: 'hoangvane@example.com'
        },
        address: {
            street: '456 Lê Lợi',
            city: 'Quận 3, TP.HCM',
            phone: '0912345678'
        }
    }
]; 