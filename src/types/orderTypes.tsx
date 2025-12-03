export type CartItem = {
    id: number;
    productId: number;
    name: string;
    price: number;
    imageUrl: string;
    quantity: number;
    variant?: string; // Untuk gilingan kopi
}

interface OrderItem {
    name: string;
    quantity: number;
    price: number;
}

// --- (2) Interface Pesanan (Order) ---
export type OrderStatus = 'Selesai' | 'Diproses' | 'Dikirim' | 'Dibatalkan' | 'Menunggu Pembayaran';

export type Order = {
    id: string;
    date: string;
    status: OrderStatus;
    totalAmount: number;
    shippingAddress: string;
    items: OrderItem[];
}