"use-client";

import RootLayout from '@/components/Layout/RootLayout';
import SuccessModal from '@/components/order-components/PaymentModal';
import { NextPageWithLayout } from '@/pages/_app';
import { formatCurrency } from '@/utils';
import { ReactElement, useState } from 'react';

// --- (1) Interface & Data Tiruan Pembayaran ---

interface CheckoutSummary {
    orderId: string;
    subtotal: number;
    shippingCost: number;
    totalAmount: number;
    shippingAddress: string;
    itemsCount: number;
}

const mockSummary: CheckoutSummary = {
    orderId: 'DLG-20251206-005',
    subtotal: 750000,
    shippingCost: 30000, // Dari pilihan kurir (Reguler)
    totalAmount: 780000,
    shippingAddress: 'Jl. Contoh No. 12, Kel. Menteng, Jakarta Pusat (Reguler 3-5 Hari)',
    itemsCount: 4, // Total item di keranjang
};

const PAYMENT_METHODS = [
    { id: 'BCA', name: 'Transfer Bank BCA', icon: '🏦' },
    { id: 'Mandiri', name: 'Transfer Bank Mandiri', icon: '🏦' },
    { id: 'QRIS', name: 'QRIS (Semua Bank/E-Wallet)', icon: '📱' },
    { id: 'GOPAY', name: 'GoPay / ShopeePay', icon: '💰' },
];


// --- (3) Komponen Halaman Pembayaran Utama ---

const PaymentPage: NextPageWithLayout = () => {
    const summary = mockSummary;
    const [selectedMethod, setSelectedMethod] = useState(PAYMENT_METHODS[0].id);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    // Simulasi Proses Pembayaran
    const handleProcessPayment = () => {
        // Logika pembayaran (misal: memanggil API pembayaran)
        console.log(`Memproses pembayaran sebesar ${formatCurrency(summary.totalAmount)} menggunakan ${selectedMethod}...`);

        // Simulasikan berhasil setelah 1 detik
        setTimeout(() => {
            setIsSuccessModalOpen(true);
        }, 1000);
    };

    // Handler ketika Modal Berhasil diklik 'OK'
    const handleSuccessConfirm = () => {
        // Di aplikasi nyata, ini akan menjadi navigasi ke homepage menggunakan React Router
        alert("Kembali ke Halaman Beranda...");
        // Contoh nyata: navigate('/'); 
        setIsSuccessModalOpen(false);
    };

    return (
        <>
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <h1 className="text-4xl font-extrabold text-stone-800 mb-8 border-b pb-4">
                    💵 Pembayaran
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* --- Kolom Kiri: Rincian Pesanan (Summary) --- */}
                    <div className="lg:order-last bg-white p-6 rounded-xl shadow-2xl h-fit border border-gray-100">
                        <h2 className="text-2xl font-bold text-stone-800 mb-4 border-b pb-3">
                            Ringkasan Pembayaran
                        </h2>

                        <div className="space-y-3 text-lg mb-6">
                            <div className="flex justify-between">
                                <span>Subtotal ({summary.itemsCount} Item):</span>
                                <span className="font-semibold">{formatCurrency(summary.subtotal)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Biaya Pengiriman:</span>
                                <span className="font-semibold">{formatCurrency(summary.shippingCost)}</span>
                            </div>
                            <div className="flex justify-between text-2xl font-black text-red-600 border-t pt-3 mt-3">
                                <span>TOTAL DIBAYAR:</span>
                                <span>{formatCurrency(summary.totalAmount)}</span>
                            </div>
                        </div>

                        <div className="text-sm border-t pt-3">
                            <p className="font-semibold text-stone-700 mb-1">Dikirim ke:</p>
                            <p className="text-gray-600">{summary.shippingAddress}</p>
                        </div>
                    </div>

                    {/* --- Kolom Kanan: Pilihan Metode Pembayaran --- */}
                    <div className="lg:order-first">
                        <h2 className="text-2xl font-bold text-stone-800 mb-4">
                            Pilih Metode Pembayaran
                        </h2>

                        <div className="space-y-4 mb-8">
                            {PAYMENT_METHODS.map((method) => (
                                <label key={method.id} className="flex items-center space-x-4 cursor-pointer p-4 bg-white rounded-xl shadow-md border-2 transition-all duration-200"
                                    style={selectedMethod === method.id ? { borderColor: '#B45309' } : { borderColor: '#e5e7eb' }}
                                >
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        checked={selectedMethod === method.id}
                                        onChange={() => setSelectedMethod(method.id)}
                                        className="h-5 w-5 text-amber-600 border-gray-300 focus:ring-amber-500"
                                    />
                                    <div className="text-2xl">{method.icon}</div>
                                    <span className="font-semibold text-lg text-stone-800">{method.name}</span>
                                </label>
                            ))}
                        </div>

                        <button
                            onClick={handleProcessPayment}
                            className="w-full bg-amber-600 text-white text-xl font-bold py-3 rounded-xl hover:bg-amber-700 transition-colors shadow-xl disabled:bg-gray-400"
                            disabled={!selectedMethod}
                        >
                            Bayar Sekarang {formatCurrency(summary.totalAmount)}
                        </button>
                    </div>

                </div>
            </main>

            {/* --- INTEGRASI MODAL KEBERHASILAN --- */}
            <SuccessModal
                isOpen={isSuccessModalOpen}
                onClose={() => setIsSuccessModalOpen(false)} // Opsional close button
                onSuccessConfirm={handleSuccessConfirm} // Mengalihkan ke homepage
                totalAmount={summary.totalAmount}
                orderId={summary.orderId}
            />
        </>
    );
};

PaymentPage.getLayout = (page: ReactElement) => {
    return (
        <RootLayout activeHeader='none'>
            {page}
        </RootLayout>
    )
}

export default PaymentPage;