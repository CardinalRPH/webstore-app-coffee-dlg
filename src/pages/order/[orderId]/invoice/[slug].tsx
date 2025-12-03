import RootLayout from '@/components/Layout/RootLayout';
import { NextPageWithLayout } from '@/pages/_app';
import { formatCurrency } from '@/utils';
import React, { ReactElement } from 'react';
// Asumsikan Header.tsx sudah tersedia

// --- (1) Interface Detail Item Pesanan (Sama) ---
interface InvoiceItem {
    name: string;
    quantity: number;
    price: number; // Harga satuan
    variant?: string;
}

// --- (2) Data Faktur Tiruan ---
interface Invoice {
    invoiceId: string;
    orderId: string;
    invoiceDate: string;
    dueDate: string;
    customerName: string;
    customerEmail: string;
    billingAddress: string;
    shippingAddress: string;
    subtotal: number;
    shippingCost: number;
    taxRate: number; // Tambahkan PPN/Tax
    taxAmount: number;
    totalAmount: number;
    paymentMethod: string;
    items: InvoiceItem[];
}

const TAX_RATE = 0.11; // 11% PPN (sesuai regulasi Indonesia saat ini)

const calculateInvoiceTotals = (subtotal: number, shippingCost: number) => {
    const taxAmount = subtotal * TAX_RATE;
    const totalAmount = subtotal + shippingCost + taxAmount;
    return { taxAmount, totalAmount };
};

const subtotal = 450000;
const shippingCost = 30000;
const { taxAmount, totalAmount } = calculateInvoiceTotals(subtotal, shippingCost);

const mockInvoiceDetail: Invoice = {
    invoiceId: 'INV-DLG-20251128-001',
    orderId: 'DLG-20251128-001',
    invoiceDate: '28 November 2025',
    dueDate: '05 Desember 2025',
    customerName: 'Rizky Fadillah',
    customerEmail: 'rizky.f@email.com',
    billingAddress: 'Jl. Merdeka No. 10, Jakarta Pusat, DKI Jakarta, 10240',
    shippingAddress: 'Jl. Merdeka No. 10, Jakarta Pusat, DKI Jakarta, 10240', // Seringkali sama dengan Billing
    subtotal: subtotal,
    shippingCost: shippingCost,
    taxRate: TAX_RATE,
    taxAmount: taxAmount,
    totalAmount: totalAmount,
    paymentMethod: 'Transfer Bank BCA (Lunas)',
    items: [
        { name: 'Arabika Gayo Winey (250g)', quantity: 2, price: 150000, variant: 'Medium (Filter/V60)' },
        { name: 'Timbangan Digital DLG', quantity: 1, price: 150000 },
        { name: 'V60 Pour Over Kit (Size 02)', quantity: 1, price: 120000 }
    ],
};

const InvoicePage: NextPageWithLayout = () => {
    const invoice = mockInvoiceDetail;

    return (
        <>
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                {/* Tombol Aksi Cetak/Unduh (Disembunyikan saat dicetak) */}
                <div className="flex justify-end mb-6 space-x-3 print:hidden">
                    <button
                        onClick={() => window.print()}
                        className="bg-stone-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-stone-600 transition-colors shadow-md"
                    >
                        🖨️ Cetak Faktur
                    </button>
                </div>

                {/* --- KOTAK FAKTUR UTAMA --- */}
                <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl border border-gray-200">

                    {/* Header Faktur (Logo & ID) */}
                    <div className="flex justify-between items-start border-b pb-6 mb-8">
                        <div>
                            <h1 className="text-3xl font-extrabold text-amber-700">DAITEN GROUND LAB</h1>
                            <p className="text-sm text-gray-500">Jl. Kopi No. 1, Jakarta</p>
                            <p className="text-sm text-gray-500">NPWP: 01.xxx.xxx.x-xxx.000</p>
                        </div>
                        <div className="text-right">
                            <h2 className="text-3xl font-black text-stone-800">FAKTUR PENJUALAN</h2>
                            <p className="text-lg font-semibold text-stone-700 mt-1">#{invoice.invoiceId}</p>
                        </div>
                    </div>

                    {/* Info Transaksi & Alamat */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 mb-10 text-sm">
                        <div>
                            <h3 className="font-bold text-stone-700 mb-2">Ditagihkan Kepada:</h3>
                            <p className="font-semibold">{invoice.customerName}</p>
                            <p className="text-gray-600">{invoice.customerEmail}</p>
                            <p className="text-gray-600 w-4/5">{invoice.billingAddress}</p>
                        </div>
                        <div className="md:text-right">
                            <p><span className="font-bold">Tanggal Faktur:</span> {invoice.invoiceDate}</p>
                            <p><span className="font-bold">Tanggal Jatuh Tempo:</span> {invoice.dueDate}</p>
                            <p className="mt-4"><span className="font-bold">ID Pesanan (PO):</span> #{invoice.orderId}</p>
                        </div>
                    </div>

                    {/* --- DETAIL ITEM DALAM BENTUK TABEL FORMAL --- */}
                    <div className="mb-10">
                        <table className="w-full text-sm border-collapse">
                            <thead>
                                <tr className="bg-stone-100 border-y border-stone-300 text-stone-700">
                                    <th className="text-left py-3 px-2 w-1/2">Deskripsi Produk</th>
                                    <th className="py-3 px-2 w-16">Qty</th>
                                    <th className="text-right py-3 px-2 w-24">Harga Satuan</th>
                                    <th className="text-right py-3 px-2 w-24">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoice.items.map((item, index) => (
                                    <tr key={index} className="border-b border-gray-100">
                                        <td className="py-3 px-2">
                                            <p className="font-semibold text-stone-800">{item.name}</p>
                                            {item.variant && (
                                                <p className="text-xs text-gray-500 italic">Varian: {item.variant}</p>
                                            )}
                                        </td>
                                        <td className="text-center">{item.quantity}</td>
                                        <td className="text-right">{formatCurrency(item.price)}</td>
                                        <td className="text-right font-medium">{formatCurrency(item.price * item.quantity)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* --- Rincian Total dan Pembayaran --- */}
                    <div className="flex justify-end">
                        <div className="w-full md:w-1/2">
                            <div className="text-sm space-y-2 mb-6">
                                <div className="flex justify-between">
                                    <span>Subtotal:</span>
                                    <span className="font-medium">{formatCurrency(invoice.subtotal)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Biaya Pengiriman:</span>
                                    <span className="font-medium">{formatCurrency(invoice.shippingCost)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>PPN ({Math.round(invoice.taxRate * 100)}%):</span>
                                    <span className="font-medium">{formatCurrency(invoice.taxAmount)}</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold border-t border-stone-400 pt-3">
                                    <span>GRAND TOTAL:</span>
                                    <span className="text-amber-700">{formatCurrency(invoice.totalAmount)}</span>
                                </div>
                            </div>

                            <div className="p-3 bg-green-50 rounded-lg text-center font-bold text-stone-700">
                                Status Pembayaran: <span className="text-green-700">{invoice.paymentMethod}</span>
                            </div>
                        </div>
                    </div>

                    {/* Catatan Kaki */}
                    <div className="mt-12 border-t pt-4 text-center text-xs text-gray-500">
                        <p>Terima kasih atas pesanan Anda. Semua produk DLG dijamin kualitasnya.</p>
                        <p className="mt-1">Faktur ini sah tanpa tanda tangan karena dicetak melalui sistem.</p>
                    </div>

                </div>
            </main>

        </>
    );
};

InvoicePage.getLayout = (page: ReactElement) => {
    return (
        <RootLayout activeHeader='none'>
            {page}
        </RootLayout>
    )
}

export default InvoicePage;