"use-client";
import React, { useState, useMemo, ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';
import RootLayout from '@/components/Layout/RootLayout';
import CartCardList from '@/components/order-components/CartCardList';
import CheckoutModal from '@/components/order-components/CartCoModal';
// Asumsikan Header.tsx sudah tersedia

// --- (1) Interface Item Keranjang (Sama) ---
interface CartItem {
    id: number;
    productId: number;
    name: string;
    price: number;
    imageUrl: string;
    quantity: number;
    variant?: string;
}

// --- Data Keranjang & Biaya (Sama) ---
const initialCartItems: CartItem[] = [
    // ... (item-item yang sudah ada di keranjang)
    {
        id: 1,
        productId: 101,
        name: 'Arabika Gayo Winey',
        price: 150000,
        imageUrl: 'https://via.placeholder.com/100x100?text=Gayo',
        quantity: 2,
        variant: 'Medium (Filter/V60)',
    },
    {
        id: 2,
        productId: 301,
        name: 'Grinder Manual Keramik',
        price: 350000,
        imageUrl: 'https://via.placeholder.com/100x100?text=Grinder',
        quantity: 1,
    },
    // ...
];

export const SHIPPING_OPTIONS = [
    { id: 'REG', name: 'Reguler (3-5 Hari)', cost: 30000 },
    { id: 'YES', name: 'Express (1-2 Hari)', cost: 55000 },
    { id: 'ECO', name: 'Ekonomi (5-7 Hari)', cost: 20000 },
];



// --- (3) Komponen Halaman Keranjang Utama ---
const CartPage: NextPageWithLayout = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
    const [isModalOpen, setIsModalOpen] = useState(false); // State Modal
    const [currentShippingCost, setCurrentShippingCost] = useState(SHIPPING_OPTIONS[0].cost);

    // Fungsi Format Mata Uang
    const formatCurrency = (amount: number) => {
        return `Rp${amount.toLocaleString('id-ID')}`;
    };

    // --- LOGIKA PERHITUNGAN ---
    const subtotal = useMemo(() =>
        cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        [cartItems]
    );

    // Total biaya kirim hanya ditambahkan jika ada item di keranjang
    const finalShippingCost = subtotal > 0 ? currentShippingCost : 0;
    const grandTotal = subtotal + finalShippingCost;


    // Handler yang dipanggil dari Modal
    const handleCheckoutConfirm = (shippingMethod: string, address: string, cost: number) => {
        setCurrentShippingCost(cost); // Update biaya kirim final di halaman utama
        console.log(`Checkout dimulai: Alamat: ${address}, Kurir: ${shippingMethod}, Biaya Kirim: ${formatCurrency(cost)}`);
        alert(`Sukses! Siap checkout dengan ${shippingMethod}. Total biaya kirim baru: ${formatCurrency(cost)}`);
        // Lanjutkan ke halaman checkout final/pembayaran di aplikasi nyata
    };

    // Handler Keranjang (Sama)
    const handleQuantityChange = (id: number, currQuantity: number) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, quantity: currQuantity } : item
            )
        );
    };

    const handleRemoveItem = (id: number) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };


    return (
        <>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <h1 className="text-4xl font-extrabold text-stone-800 mb-8 border-b pb-4">
                    🛒 Keranjang Belanja Anda
                </h1>

                {cartItems.length === 0 ? (
                    // ... (Tampilan Keranjang Kosong)
                    <div className="text-center py-20 bg-white rounded-xl shadow-lg">
                        <p className="text-2xl text-gray-600 mb-4">Keranjang Anda masih kosong.</p>
                        <a
                            href="/menu"
                            className="inline-block bg-amber-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-amber-700 transition-colors shadow-md"
                        >
                            Mulai Belanja Kopi
                        </a>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                        {/* --- Kolom Kiri: Daftar Item Keranjang (Sama) --- */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map(item => (
                                <CartCardList item={item} handleQuantityChange={handleQuantityChange} key={item.id} handleRemoveItem={handleRemoveItem} />
                            ))}
                        </div>

                        {/* --- Kolom Kanan: Ringkasan Pembayaran --- */}
                        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-2xl sticky top-24 h-fit">
                            <h2 className="text-2xl font-bold text-stone-800 mb-4 border-b pb-3">Ringkasan Pesanan</h2>

                            <div className="space-y-3 text-lg mb-6">
                                <div className="flex justify-between">
                                    <span>Subtotal Produk:</span>
                                    <span className="font-semibold">{formatCurrency(subtotal)}</span>
                                </div>
                                <div className="flex justify-between border-b pb-3">
                                    <span>Biaya Pengiriman:</span>
                                    <span className="font-semibold text-red-600">{formatCurrency(finalShippingCost)}</span>
                                </div>
                                <div className="flex justify-between text-2xl font-black text-amber-700 pt-2">
                                    <span>Total Pembayaran:</span>
                                    <span>{formatCurrency(grandTotal)}</span>
                                </div>
                            </div>

                            {/* Tombol yang MEMBUKA MODAL */}
                            <button
                                onClick={() => setIsModalOpen(true)} // <-- Tombol pemicu modal
                                className="w-full bg-green-600 text-white text-xl font-bold py-3 rounded-xl hover:bg-green-700 transition-colors shadow-lg"
                            >
                                Lanjutkan ke Checkout
                            </button>

                            <a
                                href="/menu"
                                className="block text-center mt-4 text-sm text-amber-700 hover:text-amber-800 font-semibold"
                            >
                                ← Lanjut Belanja
                            </a>
                        </div>
                    </div>
                )}
            </main>

            {/* --- INTEGRASI MODAL --- */}
            <CheckoutModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCheckoutConfirm={handleCheckoutConfirm}
            />
        </>
    );
};

CartPage.getLayout = (page: ReactElement) => {
    return (
        <RootLayout activeHeader='none'>
            {page}
        </RootLayout>
    )
}


export default CartPage;