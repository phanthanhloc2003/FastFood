export interface Order {
    id: number;
    user_id: number;
    table_number?: number;
    address_id?: number;
    delivery_type: 'Dine-in' | 'Take-away' | 'Delivery';
    status: 'Pending' | 'Completed' | 'Cancelled';
    total_price: number;
    created_at: string;
    updated_at: string;
    user?: {
        name: string;
        email: string;
    };
    address?: {
        street: string;
        city: string;
        phone: string;
    };
} 