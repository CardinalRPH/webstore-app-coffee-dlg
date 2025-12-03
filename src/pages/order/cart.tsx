"use-client";

import { formatCurrency } from '@/utils';
import type { CartItem } from '@/types/orderTypes';
import { ReactElement, useState } from 'react';
import CartCardList from '@/components/order-components/CartCardList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { NextPageWithLayout } from '../_app';
import RootLayout from '@/components/Layout/RootLayout';
// Asumsikan Header.tsx sudah tersedia

// --- (1) Interface Item Keranjang ---

// --- (2) Data Keranjang Tiruan ---
const initialCartItems: CartItem[] = [
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
    {
        id: 3,
        productId: 205,
        name: 'Blend Mantap Pagi',
        price: 115000,
        imageUrl: 'https://via.placeholder.com/100x100?text=Blend',
        quantity: 3,
        variant: 'Whole Bean (Biji Utuh)',
    },
];

const SHIPPING_COST = 30000; // Biaya pengiriman tiruan

const CartPage: NextPageWithLayout = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

    // --- LOGIKA PERHITUNGAN ---
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const grandTotal = subtotal > 0 ? subtotal + SHIPPING_COST : 0; // Hanya tambahkan biaya kirim jika ada item

    // --- HANDLER KERANJANG ---

    // Mengubah Kuantitas
    const handleQuantityChange = (id: number, currQuantity: number) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, quantity: currQuantity } : item
            )
        );
    };

    // Menghapus Item
    const handleRemoveItem = (id: number) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };



    return (
        <>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <h1 className="text-4xl font-extrabold text-stone-800 mb-8 border-b pb-4">
                    <FontAwesomeIcon icon={faCartShopping} /> Keranjang Belanja Anda
                </h1>

                {cartItems.length === 0 ? (
                    /* Tampilan Keranjang Kosong */
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
                    /* Tampilan Keranjang Ada Isinya */
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                        {/* --- Kolom Kiri: Daftar Item Keranjang --- */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map(item => (
                                <CartCardList handleQuantityChange={handleQuantityChange} handleRemoveItem={handleRemoveItem} key={item.id} item={item} />
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
                                    <span className="font-semibold">{formatCurrency(SHIPPING_COST)}</span>
                                </div>
                                <div className="flex justify-between text-2xl font-black text-amber-700 pt-2">
                                    <span>Total Pembayaran:</span>
                                    <span>{formatCurrency(grandTotal)}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => alert("Lanjut ke Halaman Checkout...")}
                                className="w-full bg-green-600 text-white text-xl font-bold py-3 rounded-xl hover:bg-green-700 transition-colors shadow-lg"
                            >
                                Lanjutkan ke Checkout
                            </button>

                            <a
                                href="/menu"
                                className="block text-center mt-4 text-sm text-amber-700 hover:text-amber-800 font-semibold"
                            >
                                <FontAwesomeIcon icon={faArrowLeft} /> Lanjut Belanja
                            </a>
                        </div>
                    </div>
                )}
            </main>
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