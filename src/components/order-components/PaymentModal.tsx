import { formatCurrency } from "@/utils";

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccessConfirm: () => void;
    totalAmount: number;
    orderId: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onSuccessConfirm, totalAmount, orderId }) => {
    if (!isOpen) return null;

    return (
        // Overlay
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            
            {/* Modal Konten */}
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md mx-4 text-center animate-fadeInUp">
                <div className="text-green-600 text-6xl mb-4">
                    🎉
                </div>
                <h2 className="text-3xl font-extrabold text-green-700 mb-2">
                    Pembayaran Berhasil!
                </h2>
                <p className="text-gray-700 mb-6">
                    Kami telah menerima pembayaran Anda. Pesanan akan segera kami proses.
                </p>

                <div className="bg-gray-50 p-4 rounded-lg text-left mb-6 border">
                    <p className="text-sm">No. Pesanan:</p>
                    <p className="text-lg font-bold text-stone-800 mb-2">{orderId}</p>
                    <p className="text-sm">Total Dibayar:</p>
                    <p className="text-2xl font-black text-amber-700">{formatCurrency(totalAmount)}</p>
                </div>

                <button
                    onClick={onSuccessConfirm} // <-- Mengembalikan ke homepage
                    className="w-full bg-amber-600 text-white text-lg font-bold py-3 rounded-xl hover:bg-amber-700 transition-colors shadow-lg"
                >
                    OK, Kembali ke Beranda
                </button>
            </div>
        </div>
    );
};

export default SuccessModal