import { Order, OrderStatus } from "@/types/orderTypes"
import { formatCurrency } from "@/utils"

const OrderHistoryCard = ({ order }: { order: Order }) => {
    const getStatusColor = (status: OrderStatus) => {
        switch (status) {
            case 'Selesai':
                return 'bg-green-100 text-green-800';
            case 'Diproses':
                return 'bg-amber-100 text-amber-800';
            case 'Dikirim':
                return 'bg-blue-100 text-blue-800';
            case 'Dibatalkan':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };
    return (
        <div key={order.id} className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-amber-600">

            {/* Header Pesanan */}
            <div className="flex justify-between items-center border-b pb-3 mb-3">
                <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Nomor Pesanan</span>
                    <span className="font-bold text-lg text-stone-800">{order.id}</span>
                </div>
                <div className="flex flex-col items-end">
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
    )
}

export default OrderHistoryCard