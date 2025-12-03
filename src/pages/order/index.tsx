import { ReactElement } from 'react';
import RootLayout from '@/components/Layout/RootLayout';
import { NextPageWithLayout } from '../_app';
// Asumsikan Header.tsx sudah tersedia

// --- (1) Interface Detail Item Pesanan (Sama) ---
interface OrderItem {
    name: string;
    quantity: number;
    price: number;
}

// --- (2) Interface Pesanan (Order) (STATUS BARU DITAMBAHKAN) ---
type OrderStatus = 'Selesai' | 'Diproses' | 'Dikirim' | 'Dibatalkan' | 'Menunggu Pembayaran';

interface Order {
    id: string;
    date: string;
    status: OrderStatus;
    totalAmount: number;
    shippingAddress: string;
    items: OrderItem[];
}

// --- (3) Data Riwayat Pesanan Tiruan (Satu pesanan baru: Menunggu Pembayaran) ---
const mockOrderHistory: Order[] = [
    // PESANAN MENUNGGU PEMBAYARAN
    {
        id: 'DLG-20251205-004',
        date: '05 Desember 2025',
        status: 'Menunggu Pembayaran',
        totalAmount: 510000,
        shippingAddress: 'Jl. Pemuda No. 5, Surabaya',
        items: [
            { name: 'Kopi Luwak (Limited Edition)', quantity: 1, price: 480000 },
        ],
    },
    // PESANAN SELESAI
    {
        id: 'DLG-20251128-001',
        date: '28 November 2025',
        status: 'Selesai',
        totalAmount: 480000,
        shippingAddress: 'Jl. Merdeka No. 10, Jakarta Pusat',
        items: [
            { name: 'Arabika Gayo Winey (250g)', quantity: 2, price: 150000 },
            { name: 'Timbangan Digital DLG', quantity: 1, price: 180000 },
        ],
    },
    // PESANAN DIKIRIM
    {
        id: 'DLG-20251201-002',
        date: '01 Desember 2025',
        status: 'Dikirim',
        totalAmount: 165000,
        shippingAddress: 'Perumahan Citra Raya Blok C2, Tangerang',
        items: [
            { name: 'Robusta Dampit Peaberry (250g)', quantity: 1, price: 95000 },
            { name: 'Blend Mantap Pagi (250g)', quantity: 1, price: 70000 },
        ],
    },
    // PESANAN DIBATALKAN
    {
        id: 'DLG-20251203-003',
        date: '03 Desember 2025',
        status: 'Dibatalkan',
        totalAmount: 0,
        shippingAddress: 'Jl. Sudirman, Bandung',
        items: [
            { name: 'Flores Bajawa (Limited Edition)', quantity: 1, price: 185000 },
        ],
    },
];

// Fungsi Pembantu
const formatCurrency = (amount: number) => {
    return `Rp${amount.toLocaleString('id-ID')}`;
};

// Fungsi untuk mendapatkan warna status (DIPERBARUI)
const getStatusColor = (status: OrderStatus) => {
    switch (status) {
        case 'Menunggu Pembayaran':
            return 'bg-red-600 text-white'; // Warna mencolok untuk urgensi
        case 'Selesai':
            return 'bg-green-100 text-green-800';
        case 'Diproses':
            return 'bg-amber-100 text-amber-800';
        case 'Dikirim':
            return 'bg-blue-100 text-blue-800';
        case 'Dibatalkan':
            return 'bg-gray-200 text-gray-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

const OrderHistoryPage: NextPageWithLayout = () => {

    // --- MEMISAHKAN PESANAN ---
    const pendingPaymentOrders = mockOrderHistory.filter(order =>
        order.status === 'Menunggu Pembayaran'
    );

    const historyOrders = mockOrderHistory.filter(order =>
        order.status !== 'Menunggu Pembayaran'
    );

    const userIsLoggedIn = true;

    if (!userIsLoggedIn) {
        // ... (Logika jika tidak login)
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-50">
                <p className="text-xl text-stone-700">Silakan masuk untuk melihat riwayat pesanan Anda.</p>
            </div>
        );
    }

    return (
        <>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <h1 className="text-4xl font-extrabold text-stone-800 mb-8 border-b pb-4">
                    Riwayat Pesanan Anda 📦
                </h1>

                {/* --- SECTION 1: MENUNGGU PEMBAYARAN (BARU) --- */}
                {pendingPaymentOrders.length > 0 && (
                    <section className="mb-10 p-6 bg-red-50 border-2 border-red-300 rounded-xl shadow-lg">
                        <h2 className="text-2xl font-bold text-red-800 mb-4 flex items-center">
                            ⚠️ Pesanan Menunggu Pembayaran ({pendingPaymentOrders.length})
                        </h2>
                        <div className="space-y-4">
                            {pendingPaymentOrders.map(order => (
                                <div key={order.id} className="flex justify-between items-center bg-white p-4 rounded-lg border border-red-200">
                                    <div className="flex flex-col">
                                        <p className="font-semibold text-stone-800">
                                            Pesanan #{order.id}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Total: <span className="font-bold text-red-600">{formatCurrency(order.totalAmount)}</span>
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => console.log(`Arahkan ke detail pembayaran untuk ${order.id}`)}
                                        className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-700 transition-colors shadow-md"
                                    >
                                        Lanjutkan Pembayaran →
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                )}


                {/* --- SECTION 2: RIWAYAT UTAMA --- */}
                <h2 className="text-2xl font-bold text-stone-800 mb-6 mt-10">
                    {historyOrders.length > 0 ? 'Riwayat Pesanan Lainnya' : 'Riwayat Pesanan'}
                </h2>

                {historyOrders.length === 0 && pendingPaymentOrders.length === 0 ? (
                    /* Tampilan Riwayat Kosong Total */
                    <div className="text-center py-20 bg-white rounded-xl shadow-lg">
                        <p className="text-2xl text-gray-600 mb-4">Anda belum memiliki riwayat pesanan.</p>
                        <a
                            href="/menu"
                            className="inline-block bg-amber-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-amber-700 transition-colors shadow-md"
                        >
                            Mulai Belanja Kopi
                        </a>
                    </div>
                ) : (
                    /* Daftar Pesanan History */
                    <div className="space-y-6">
                        {historyOrders.map((order) => (
                            <div key={order.id} className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-amber-600">

                                {/* Header Pesanan */}
                                <div className="flex justify-between items-center border-b pb-3 mb-3">
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-500">Nomor Pesanan</span>
                                        <span className="font-bold text-lg text-stone-800">{order.id}</span>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        {/* Status */}
                                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Detail Ringkas */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                                    <div>
                                        <p className="text-gray-500">Tanggal:</p>
                                        <p className="font-medium">{order.date}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Total Pembayaran:</p>
                                        <p className="font-bold text-amber-700">{formatCurrency(order.totalAmount)}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-gray-500">Alamat Kirim:</p>
                                        <p className="font-medium truncate">{order.shippingAddress}</p>
                                    </div>
                                </div>

                                {/* Daftar Item dalam Pesanan */}
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <h3 className="text-sm font-semibold mb-2 text-stone-700">Item:</h3>
                                    <ul className="space-y-1 text-sm text-gray-600">
                                        {order.items.map((item, index) => (
                                            <li key={index} className="flex justify-between">
                                                <span>{item.name} <span className="text-xs">({item.quantity}x)</span></span>
                                                <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Tombol Aksi */}
                                <div className="mt-5 text-right space-x-3">
                                    {order.status === 'Dikirim' && (
                                        <button className="text-blue-600 hover:text-blue-800 font-semibold text-sm">
                                            Lacak Pesanan →
                                        </button>
                                    )}
                                    <button
                                        onClick={() => console.log(`Lihat detail pesanan ${order.id}`)}
                                        className="bg-stone-800 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-stone-900 transition-colors"
                                    >
                                        Lihat Detail
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </>
    );
};


OrderHistoryPage.getLayout = (page: ReactElement) => {
    return (
        <RootLayout activeHeader='none'>
            {page}
        </RootLayout>
    )
}

export default OrderHistoryPage;