import OauthLayout from '@/components/Layout/OauthLayout';
import { NextPageWithLayout } from '@/pages/_app';
import React, { useState, useEffect, ReactElement } from 'react';

// Asumsikan kita akan mengambil token dari URL (misal: /reset-password?token=XYZ123)
const useUrlToken = () => {
    // Di aplikasi nyata, ini akan membaca dari window.location.search
    // Untuk simulasi, kita akan menganggap token selalu ada
    return 'TOKEN-SIMULASI-XYZ123';
};

// Fungsi navigasi
const navigateTo = (path: string) => {
    console.log(`Navigasi ke: ${path}`);
    // Di aplikasi nyata, ini adalah navigate(path)
};

const ResetPasswordPage: NextPageWithLayout = () => {
    const token = useUrlToken();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Efek untuk memverifikasi token saat halaman dimuat (simulasi)
    useEffect(() => {
        if (!token) {
            console.error('Token tidak ditemukan. Arahkan pengguna ke halaman lupa password.');
            // Di aplikasi nyata: navigateTo('/forgot-password');
        } else {
            console.log(`Token ${token} terdeteksi. Siap menerima password baru.`);
        }
    }, [token]);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // --- Validasi Sederhana ---
        if (newPassword !== confirmPassword) {
            alert('Error: Kata Sandi Baru dan Konfirmasi Kata Sandi tidak cocok.');
            setIsLoading(false);
            return;
        }

        if (newPassword.length < 6) {
            alert('Error: Kata Sandi harus memiliki minimal 6 karakter.');
            setIsLoading(false);
            return;
        }

        // --- Simulasi Panggilan API Reset Password ---
        console.log('Mengirim password baru dengan token:', { token, newPassword });

        setTimeout(() => {
            setIsLoading(false);

            // Anggap proses reset berhasil
            setIsSuccess(true);

            // Di aplikasi nyata, di sini akan ada pengalihan otomatis setelah beberapa detik.
        }, 2000);
    };

    return (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 md:p-10 transform transition-all duration-300 border border-gray-200">

            <div className="text-center">
                <h2 className="text-4xl font-extrabold text-stone-900 mb-2">
                    Atur Ulang Kata Sandi
                </h2>
                <p className="text-gray-500 mb-6">
                    Masukkan kata sandi baru Anda di bawah ini.
                </p>
            </div>

            {isSuccess ? (
                /* --- Tampilan Sukses Reset Password --- */
                <div className="text-center p-6 bg-green-50 border border-green-300 rounded-lg">
                    <p className="text-3xl mb-4">🎉</p>
                    <p className="text-xl font-semibold text-green-700 mb-3">
                        Reset Berhasil!
                    </p>
                    <p className="text-sm text-gray-700 mb-4">
                        Kata sandi Anda telah berhasil diperbarui. Silakan gunakan kata sandi baru Anda untuk masuk.
                    </p>
                    <button
                        onClick={() => navigateTo('/login')}
                        className="w-full py-3 rounded-xl text-white font-bold bg-amber-600 hover:bg-amber-700 transition-colors shadow-md"
                    >
                        Masuk Sekarang
                    </button>
                </div>

            ) : (
                /* --- Tampilan Formulir Reset Password --- */
                <form className="space-y-6" onSubmit={handleSubmit}>

                    {/* Input Password Baru */}
                    <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                            Kata Sandi Baru
                        </label>
                        <div className="mt-1">
                            <input
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                autoComplete="new-password"
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                disabled={isLoading}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 transition duration-150"
                            />
                        </div>
                    </div>

                    {/* Input Konfirmasi Password Baru */}
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Konfirmasi Kata Sandi Baru
                        </label>
                        <div className="mt-1">
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                disabled={isLoading}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 transition duration-150"
                            />
                        </div>
                    </div>

                    {/* Tombol Submit */}
                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full flex justify-center py-3 px-4 rounded-xl shadow-lg text-lg font-bold text-white transition-colors duration-200 ${isLoading ? 'bg-amber-400 cursor-not-allowed' : 'bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500'
                                }`}
                        >
                            {isLoading ? 'Mengatur Ulang...' : 'Simpan Kata Sandi Baru'}
                        </button>
                    </div>
                </form>
            )}

        </div>
    );
};

ResetPasswordPage.getLayout = (page: ReactElement) => {
    return (
        <OauthLayout>
            {page}
        </OauthLayout>
    )
}


export default ResetPasswordPage;