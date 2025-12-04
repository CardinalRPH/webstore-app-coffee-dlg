"use-client";

import Header1 from '@/components/layout-component/Header1';
import RootLayout from '@/components/Layout/RootLayout';
import { NextPageWithLayout } from '@/pages/_app';
import React, { ReactElement } from 'react';
// Asumsikan Header.tsx sudah tersedia

// --- (1) Interface Detail Item Pesanan (Sama) ---
interface OrderItem {
    name: string;
    quantity: number;
    price: number; // Harga satuan
    variant?: string; // Varian produk (misal: gilingan kopi)
}

// --- (2) Interface Pesanan (Order) (Sama) ---
type OrderStatus = 'Selesai' | 'Diproses' | 'Dikirim' | 'Dibatalkan';

interface Order {
    id: string;
    date: string;
    status: OrderStatus;
    subtotal: number;
    shippingCost: number;
    totalAmount: number;
    shippingAddress: {
        receiver: string;
        phone: string;
        address: string;
    };
    paymentMethod: string;
    items: OrderItem[];
}

// --- (3) Data Detail Pesanan Tiruan ---
const mockOrderDetail: Order = {
    id: 'DLG-20251128-001',
    date: '28 November 2025',
    status: 'Selesai',
    subtotal: 450000, // Harga Produk
    shippingCost: 30000, // Biaya Kirim
    totalAmount: 480000, // Total Akhir
    shippingAddress: {
        receiver: 'Rizal Fadillah',
        phone: '0812-XXXX-9999',
        address: 'Jl. Merdeka No. 10, RT 01/RW 03, Kel. Kebon Kacang, Kec. Tanah Abang, Jakarta Pusat, DKI Jakarta, 10240',
    },
    paymentMethod: 'Transfer Bank BCA',
    items: [
        { name: 'Arabika Gayo Winey (250g)', quantity: 2, price: 150000, variant: 'Medium (Filter/V60)' },
        { name: 'Timbangan Digital DLG', quantity: 1, price: 150000 },
        { name: 'V60 Pour Over Kit (Size 02)', quantity: 1, price: 120000 }
    ],
};

// Fungsi Pembantu
const formatCurrency = (amount: number) => {
    return `Rp${amount.toLocaleString('id-ID')}`;
};

const getStatusColor = (status: OrderStatus) => {
    switch (status) {
        case 'Selesai':
            return 'bg-green-600 text-white';
        case 'Diproses':
            return 'bg-amber-500 text-white';
        case 'Dikirim':
            return 'bg-blue-600 text-white';
        case 'Dibatalkan':
            return 'bg-red-600 text-white';
        default:
            return 'bg-gray-500 text-white';
    }
};

const OrderDetailPage: NextPageWithLayout = () => {
    const order = mockOrderDetail;

    return (
        <>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                {/* Header Halaman dan Status */}
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <h1 className="text-3xl font-extrabold text-stone-800">
                        Detail Pesanan #{order.id}
                    </h1>
                    <span className={`px-4 py-2 text-sm font-bold rounded-full shadow-md ${getStatusColor(order.status)}`}>
                        Status: {order.status}
                    </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* --- Kolom Kiri: Detail Item dan Biaya --- */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* 1. DETAIL PRODUK */}
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            <h2 className="text-xl font-bold text-stone-700 mb-4 border-b pb-2">Item Pesanan</h2>

                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b text-gray-500">
                                        <th className="text-left py-2">Produk</th>
                                        <th className="text-center py-2 w-16">Qty</th>
                                        <th className="text-right py-2 w-24">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.items.map((item, index) => (
                                        <tr key={index} className="border-b last:border-b-0">
                                            <td className="py-3">
                                                <p className="font-semibold text-stone-800">{item.name}</p>
                                                {item.variant && (
                                                    <p className="text-xs text-gray-500 italic">Varian: {item.variant}</p>
                                                )}
                                                <p className="text-xs text-gray-400">{formatCurrency(item.price)} / unit</p>
                                            </td>
                                            <td className="text-center font-medium">{item.quantity}</td>
                                            <td className="text-right font-bold text-stone-900">{formatCurrency(item.price * item.quantity)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* 2. RINGKASAN BIAYA */}
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            <h2 className="text-xl font-bold text-stone-700 mb-4 border-b pb-2">Rincian Pembayaran</h2>

                            <div className="space-y-2 text-base">
                                <div className="flex justify-between">
                                    <span>Subtotal Produk:</span>
                                    <span className="font-semibold">{formatCurrency(order.subtotal)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Biaya Pengiriman:</span>
                                    <span className="font-semibold">{formatCurrency(order.shippingCost)}</span>
                                </div>
                                <div className="flex justify-between text-xl font-black text-amber-700 border-t pt-3 mt-3">
                                    <span>GRAND TOTAL:</span>
                                    <span>{formatCurrency(order.totalAmount)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- Kolom Kanan: Info Pengiriman dan Pembayaran --- */}
                    <div className="lg:col-span-1 space-y-8">

                        {/* 3. ALAMAT PENGIRIMAN */}
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            <h2 className="text-xl font-bold text-stone-700 mb-4 border-b pb-2">Informasi Pengiriman</h2>
                            <div className="text-sm space-y-2">
                                <p><strong>Penerima:</strong> {order.shippingAddress.receiver}</p>
                                <p><strong>No. Telp:</strong> {order.shippingAddress.phone}</p>
                                <p><strong>Alamat Kirim:</strong></p>
                                <p className="bg-gray-50 p-3 rounded-lg border">{order.shippingAddress.address}</p>
                                {order.status === 'Dikirim' && (
                                    <button className="w-full mt-3 bg-blue-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-600">
                                        Lacak Kiriman
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* 4. INFO PEMBAYARAN */}
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            <h2 className="text-xl font-bold text-stone-700 mb-4 border-b pb-2">Pembayaran</h2>
                            <div className="text-sm space-y-2">
                                <p><strong>Tanggal Pesan:</strong> {order.date}</p>
                                <p><strong>Metode Pembayaran:</strong> <span className="font-semibold text-amber-700">{order.paymentMethod}</span></p>
                            </div>
                        </div>

                        {/* Tombol Aksi Tambahan */}
                        <div className="text-center">
                            <button className="text-gray-600 hover:text-red-700 text-sm font-semibold border-b border-gray-400">
                                Ajukan Pengembalian Dana/Barang
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

OrderDetailPage.getLayout = (page: ReactElement) => {
    return (
        <RootLayout activeHeader='none'>
            {page}
        </RootLayout>
    )
}

export default OrderDetailPage;