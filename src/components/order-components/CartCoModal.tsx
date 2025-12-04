import { SHIPPING_OPTIONS } from "@/pages/order/cart";
import { formatCurrency } from "@/utils";
import { useState } from "react";


// --- (2) Komponen MODAL CHECKOUT BARU ---
interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCheckoutConfirm: (shippingMethod: string, address: string, cost: number) => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onCheckoutConfirm }) => {
    const [selectedShipping, setSelectedShipping] = useState(SHIPPING_OPTIONS[0]);
    const [address, setAddress] = useState('Jl. Contoh No. 12, Kel. Menteng, Kec. Menteng, Jakarta Pusat');

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (!address.trim()) {
            alert('Mohon isi alamat pengiriman.');
            return;
        }
        onCheckoutConfirm(selectedShipping.name, address, selectedShipping.cost);
        onClose();
    };

    return (
        // Overlay
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

            {/* Modal Konten */}
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg mx-4 animate-fadeInUp">
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h2 className="text-2xl font-bold text-stone-800">Lanjutkan ke Pengiriman</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl leading-none">
                        &times;
                    </button>
                </div>

                {/* Form Alamat */}
                <div className="mb-6">
                    <label htmlFor="address" className="block text-sm font-medium text-stone-700 mb-2">
                        Alamat Pengiriman Lengkap
                    </label>
                    <textarea
                        id="address"
                        rows={3}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                        placeholder="Nama Jalan, Nomor Rumah, RT/RW, Kelurahan, Kecamatan..."
                        required
                    />
                </div>

                {/* Pilihan Kurir */}
                <div className="mb-6">
                    <h3 className="text-sm font-medium text-stone-700 mb-2">Pilih Jenis Pengiriman:</h3>
                    <div className="space-y-3">
                        {SHIPPING_OPTIONS.map((option) => (
                            <label key={option.id} className="flex items-center space-x-3 cursor-pointer p-3 border rounded-lg transition-colors duration-200 hover:bg-amber-50"
                                style={selectedShipping.id === option.id ? { borderColor: '#B45309', borderWidth: '2px' } : {}} // Styling aktif
                            >
                                <input
                                    type="radio"
                                    name="shipping"
                                    checked={selectedShipping.id === option.id}
                                    onChange={() => setSelectedShipping(option)}
                                    className="h-4 w-4 text-amber-600 border-gray-300 focus:ring-amber-500"
                                />
                                <div className="flex justify-between flex-1">
                                    <span className="font-semibold text-stone-800">{option.name}</span>
                                    <span className="font-bold text-amber-700">{formatCurrency(option.cost)}</span>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Tombol Konfirmasi */}
                <button
                    onClick={handleSubmit}
                    className="w-full bg-amber-600 text-white text-lg font-bold py-3 rounded-xl hover:bg-amber-700 transition-colors shadow-lg"
                >
                    Konfirmasi Pengiriman & Lanjut Pembayaran
                </button>

            </div>
        </div>
    );
};

export default CheckoutModal
