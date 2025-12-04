import { Address } from "@/types/profileTypes";
import { useState } from "react";

interface AddAddressModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (newAddress: Omit<Address, 'id'>) => void;
}

const AddAddressModal: React.FC<AddAddressModalProps> = ({ isOpen, onClose, onSave }) => {
    const [addressData, setAddressData] = useState({
        label: '', recipient: '', phone: '', fullAddress: '', isMain: false
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Validasi sederhana
        if (Object.values(addressData).some(val => val === '' && typeof val === 'string')) {
            alert('Mohon lengkapi semua field.');
            return;
        }
        onSave(addressData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg mx-4">
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h2 className="text-2xl font-bold text-stone-800">Tambah Alamat Pengiriman Baru</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl leading-none">&times;</button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                    {/* Input Field (disingkat) */}
                    {['label', 'recipient', 'phone'].map(key => (
                        <div key={key}>
                            <label className="block font-medium text-stone-700 capitalize">{key.replace('label', 'Nama Label').replace('recipient', 'Nama Penerima')}:</label>
                            <input
                                type="text" required
                                value={addressData[key as keyof typeof addressData] as string}
                                onChange={(e) => setAddressData({ ...addressData, [key]: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                    ))}
                    <div>
                        <label className="block font-medium text-stone-700">Alamat Lengkap:</label>
                        <textarea
                            rows={3} required
                            value={addressData.fullAddress}
                            onChange={(e) => setAddressData({ ...addressData, fullAddress: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <label className="flex items-center space-x-2 pt-2">
                        <input
                            type="checkbox"
                            checked={addressData.isMain}
                            onChange={(e) => setAddressData({ ...addressData, isMain: e.target.checked })}
                            className="h-4 w-4 text-amber-600 rounded"
                        />
                        <span className="text-sm font-medium">Jadikan Alamat Utama</span>
                    </label>

                    <button type="submit" className="w-full bg-amber-600 text-white font-bold py-3 rounded-lg hover:bg-amber-700 mt-4">
                        Simpan Alamat
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddAddressModal