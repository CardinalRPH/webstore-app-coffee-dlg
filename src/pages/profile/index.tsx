"use-client";
import React, { ReactElement, useState } from 'react';
import { NextPageWithLayout } from '../_app';
import RootLayout from '@/components/Layout/RootLayout';
import { Address } from '@/types/profileTypes';
import AddAddressModal from '@/components/profile-components/AddressModal';
// Asumsikan Header.tsx sudah tersedia

// --- (1) Data Interface & Mock Data ---

// User Profile (Sama)
interface UserProfile {
    name: string;
    email: string;
    phone: string;
    joinDate: string;
    birthDate: string;
}

const mockUserProfile: UserProfile = {
    name: "Rizal Fadillah",
    email: "rizky.f@email.com",
    phone: "0812-XXXX-9999",
    joinDate: "15 Maret 2024",
    birthDate: "20 Mei 1995",
};

const initialMockAddresses: Address[] = [
    { id: 1, label: 'Rumah Utama', recipient: 'Rizal Fadillah', phone: '0812-XXXX-9999', fullAddress: 'Jl. Merdeka No. 10, Kel. Kebon Kacang, Jakarta Pusat', isMain: true },
    { id: 2, label: 'Kantor Pusat', recipient: 'Bapak Budi', phone: '0811-YYYY-8888', fullAddress: 'Gedung Kopi Lantai 5, SCBD, Jakarta Selatan', isMain: false },
];

// Riwayat Pesanan Ringkas
type OrderStatusSummary = 'Selesai' | 'Dikirim' | 'Dibatalkan' | 'Menunggu Pembayaran';
interface OrderSummary {
    id: string;
    date: string;
    status: OrderStatusSummary;
    totalAmount: number;
}

const mockOrderSummaries: OrderSummary[] = [
    { id: 'DLG-20251128-001', date: '28 Nov 2025', status: 'Selesai', totalAmount: 480000 },
    { id: 'DLG-20251201-002', date: '01 Des 2025', status: 'Dikirim', totalAmount: 165000 },
    { id: 'DLG-20251205-004', date: '05 Des 2025', status: 'Menunggu Pembayaran', totalAmount: 510000 },
];

// Fungsi Pembantu
const formatCurrency = (amount: number) => {
    return `Rp${amount.toLocaleString('id-ID')}`;
};

const getStatusColor = (status: OrderStatusSummary) => {
    switch (status) {
        case 'Selesai':
            return 'text-green-600 bg-green-50';
        case 'Dikirim':
            return 'text-blue-600 bg-blue-50';
        case 'Menunggu Pembayaran':
            return 'text-red-600 bg-red-50';
        case 'Dibatalkan':
            return 'text-gray-600 bg-gray-50';
        default:
            return 'text-gray-600 bg-gray-50';
    }
};




// --- (3) Komponen Halaman Profil Utama ---
type ProfileSection = 'account' | 'address' | 'orders' | 'settings';

const ProfilePage: NextPageWithLayout = () => {
    const user = mockUserProfile;
    const [activeSection, setActiveSection] = useState<ProfileSection>('account');
    const [isEditingAccount, setIsEditingAccount] = useState(false);
    const [editableUser, setEditableUser] = useState(user);
    const [addresses, setAddresses] = useState<Address[]>(initialMockAddresses);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

    // STATE UNTUK GANTI PASSWORD
    const [passwordFields, setPasswordFields] = useState({ oldPassword: '', newPassword: '', confirmNewPassword: '' });

    // Handlers
    const handleSaveAccount = () => {
        alert("Profil berhasil diperbarui!");
        setIsEditingAccount(false);
    };

    const handleSaveAddress = (newAddressData: Omit<Address, 'id'>) => {
        const newAddress: Address = {
            ...newAddressData,
            id: addresses.length + 1, // Simple ID generation
        };
        setAddresses([...addresses, newAddress]);
        alert(`Alamat ${newAddress.label} berhasil ditambahkan!`);
    };
    
    const handleChangePassword = (e: React.FormEvent) => {
        e.preventDefault();
        const { oldPassword, newPassword, confirmNewPassword } = passwordFields;
        if (!oldPassword || !newPassword || !confirmNewPassword) {
            alert('Mohon isi semua field.');
            return;
        }
        if (newPassword !== confirmNewPassword) {
            alert('Password Baru dan Konfirmasi Password Baru tidak cocok.');
            return;
        }
        if (oldPassword === newPassword) {
             alert('Password baru tidak boleh sama dengan password lama.');
             return;
        }

        // Simulasi berhasil
        alert('Password berhasil diganti! Anda akan diminta login ulang.');
        setPasswordFields({ oldPassword: '', newPassword: '', confirmNewPassword: '' });
    };

    const renderContent = () => {
        switch (activeSection) {
            case 'account':
                return (
                    // Konten Akun Saya (Sama seperti sebelumnya)
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-stone-800">Informasi Akun Saya</h2>
                            {isEditingAccount ? (
                                <button onClick={handleSaveAccount} className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                                    Simpan Perubahan
                                </button>
                            ) : (
                                <button onClick={() => setIsEditingAccount(true)} className="text-amber-600 border border-amber-600 px-4 py-2 rounded-lg font-semibold hover:bg-amber-700 hover:text-white transition-colors">
                                    Edit Profil
                                </button>
                            )}
                        </div>

                        {/* Formulir Detail Akun */}
                        <form className="space-y-4">
                            {/* ... (Input fields yang sama) ... */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                                <input type="text" value={isEditingAccount ? editableUser.name : user.name} onChange={(e) => setEditableUser({ ...editableUser, name: e.target.value })} disabled={!isEditingAccount} className={`w-full p-3 mt-1 border rounded-lg ${isEditingAccount ? 'bg-white border-amber-500' : 'bg-gray-50 border-gray-200'}`} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="email" value={user.email} disabled={true} className="w-full p-3 mt-1 border rounded-lg bg-gray-100 border-gray-200 cursor-not-allowed" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
                                <input type="text" value={isEditingAccount ? editableUser.phone : user.phone} onChange={(e) => setEditableUser({ ...editableUser, phone: e.target.value })} disabled={!isEditingAccount} className={`w-full p-3 mt-1 border rounded-lg ${isEditingAccount ? 'bg-white border-amber-500' : 'bg-gray-50 border-gray-200'}`} />
                            </div>
                        </form>
                        
                        <div className="mt-6 pt-4 border-t text-sm text-gray-600 space-y-1">
                            <p>Tanggal Bergabung: <span className="font-medium text-stone-800">{user.joinDate}</span></p>
                            <p>Tanggal Lahir: <span className="font-medium text-stone-800">{user.birthDate}</span></p>
                        </div>
                    </div>
                );

            case 'address':
                return (
                    // Konten Alamat Pengiriman (BARU)
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                        <div className="flex justify-between items-center mb-6 border-b pb-3">
                            <h2 className="text-2xl font-bold text-stone-800">Alamat Pengiriman</h2>
                            <button onClick={() => setIsAddressModalOpen(true)} className="bg-amber-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-amber-700 transition-colors shadow-md">
                                + Tambah Alamat Baru
                            </button>
                        </div>
                        
                        <div className="space-y-4">
                            {addresses.map((addr) => (
                                <div key={addr.id} className={`p-4 rounded-lg border-2 ${addr.isMain ? 'border-amber-600 bg-amber-50' : 'border-gray-200 bg-white'}`}>
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-lg font-bold text-stone-800 flex items-center">
                                            {addr.label} 
                                            {addr.isMain && <span className="ml-2 px-2 py-0.5 text-xs font-semibold text-white bg-amber-600 rounded-full">UTAMA</span>}
                                        </h3>
                                        <div className="text-sm space-x-2">
                                            <button className="text-blue-600 hover:text-blue-800">Edit</button>
                                            {!addr.isMain && <button className="text-red-600 hover:text-red-800">Hapus</button>}
                                        </div>
                                    </div>
                                    <p className="text-sm font-medium">{addr.recipient} ({addr.phone})</p>
                                    <p className="text-sm text-gray-600 mt-1">{addr.fullAddress}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'orders':
                return (
                    // Konten Riwayat Pesanan (BARU)
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                        <div className="flex justify-between items-center mb-6 border-b pb-3">
                            <h2 className="text-2xl font-bold text-stone-800">Riwayat Pesanan Terbaru</h2>
                            <a href="/order-history" className="text-amber-600 font-semibold hover:text-amber-700 transition-colors">
                                Lihat Semua →
                            </a>
                        </div>
                        
                        <div className="space-y-4">
                            {mockOrderSummaries.map((order) => (
                                <div key={order.id} className="p-4 rounded-lg border flex justify-between items-center bg-gray-50">
                                    <div>
                                        <p className="font-semibold text-stone-800">Pesanan #{order.id}</p>
                                        <p className="text-xs text-gray-500">{order.date}</p>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                        <span className="font-bold text-lg text-amber-700">{formatCurrency(order.totalAmount)}</span>
                                        <button className="text-stone-700 hover:text-stone-900 text-sm font-semibold">
                                            Detail
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'settings':
                return (
                    // Konten Pengaturan (GANTI PASSWORD BARU)
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                        <h2 className="text-2xl font-bold text-stone-800 mb-6 border-b pb-3">Pengaturan Akun</h2>
                        
                        <h3 className="text-xl font-semibold text-stone-700 mb-4">Ganti Kata Sandi</h3>
                        <form onSubmit={handleChangePassword} className="space-y-4 w-full md:w-3/4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Kata Sandi Lama</label>
                                <input
                                    type="password" required
                                    value={passwordFields.oldPassword}
                                    onChange={(e) => setPasswordFields({ ...passwordFields, oldPassword: e.target.value })}
                                    className="w-full p-3 mt-1 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Kata Sandi Baru</label>
                                <input
                                    type="password" required
                                    value={passwordFields.newPassword}
                                    onChange={(e) => setPasswordFields({ ...passwordFields, newPassword: e.target.value })}
                                    className="w-full p-3 mt-1 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Konfirmasi Kata Sandi Baru</label>
                                <input
                                    type="password" required
                                    value={passwordFields.confirmNewPassword}
                                    onChange={(e) => setPasswordFields({ ...passwordFields, confirmNewPassword: e.target.value })}
                                    className="w-full p-3 mt-1 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <button type="submit" className="bg-amber-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-amber-700 transition-colors mt-4">
                                Perbarui Kata Sandi
                            </button>
                        </form>

                        <div className="mt-10 border-t pt-6">
                            <h3 className="text-xl font-semibold text-red-700 mb-2">Kelola Akun</h3>
                            <button className="text-red-600 border border-red-600 px-4 py-2 rounded-lg text-sm hover:bg-red-600 hover:text-white transition-colors">
                                Hapus Akun Saya Permanen
                            </button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    // Data untuk Sidebar Navigasi (Sama)
    const navItems: { id: ProfileSection, label: string, icon: string }[] = [
        { id: 'account', label: 'Akun Saya', icon: '👤' },
        { id: 'orders', label: 'Riwayat Pesanan', icon: '📦' },
        { id: 'address', label: 'Alamat Pengiriman', icon: '🏠' },
        { id: 'settings', label: 'Pengaturan', icon: '⚙️' },
    ];

    return (
       <>
       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <h1 className="text-4xl font-extrabold text-stone-800 mb-8 border-b pb-4">
                    Area Profil Pelanggan
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    
                    {/* --- Kolom Kiri: Sidebar Navigasi (Sama) --- */}
                    <aside className="lg:col-span-1">
                        <div className="bg-white p-4 rounded-xl shadow-lg sticky top-24">
                            <p className="text-lg font-bold text-stone-800 mb-4 border-b pb-2">
                                Hai, {user.name.split(' ')[0]}!
                            </p>
                            
                            <nav className="space-y-2">
                                {navItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => { setActiveSection(item.id); setIsEditingAccount(false); }}
                                        className={`w-full text-left flex items-center p-3 rounded-lg font-medium transition-colors ${
                                            activeSection === item.id
                                                ? 'bg-amber-600 text-white shadow-md'
                                                : 'text-stone-700 hover:bg-stone-100'
                                        }`}
                                    >
                                        <span className="mr-3">{item.icon}</span>
                                        {item.label}
                                    </button>
                                ))}
                            </nav>

                            <button className="w-full mt-4 text-red-500 font-semibold border border-red-500 hover:bg-red-500 hover:text-white py-2 rounded-lg transition-colors">
                                Keluar (Logout)
                            </button>
                        </div>
                    </aside>

                    {/* --- Kolom Kanan: Konten Aktif --- */}
                    <div className="lg:col-span-3">
                        {renderContent()}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-stone-800 text-white mt-16">
                {/* ... Konten Footer ... */}
            </footer>

            {/* --- INTEGRASI MODAL TAMBAH ALAMAT --- */}
            <AddAddressModal
                isOpen={isAddressModalOpen}
                onClose={() => setIsAddressModalOpen(false)}
                onSave={handleSaveAddress}
            />
       </>
    );
};


ProfilePage.getLayout = (page: ReactElement) => {
    return (
        <RootLayout activeHeader='none'>
            {page}
        </RootLayout>
    )
}

export default ProfilePage;