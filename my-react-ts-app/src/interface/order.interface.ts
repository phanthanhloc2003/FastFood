import { Address } from "../types";

export interface OrderItem {
    id: number;
    name: string;
    quantity: number;
    price: number;
    image?: string;
    note?: string;
}

export interface Order {
    id: number;
    order_code:string;
    user_id: number;
    table_number?: number;
    address_id?: number;
    delivery_type: 'Dine-in' | 'Take-away' | 'Delivery';
    status: 'Pending' | 'Completed' | 'Cancelled';
    total_price: number;
    created_at: string;
    updated_at: string;
    items: OrderItem[];
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