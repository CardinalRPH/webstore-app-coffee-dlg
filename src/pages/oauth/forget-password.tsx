"use-client";
import OauthLayout from '@/components/Layout/OauthLayout';
import React, { ReactElement, useState } from 'react';
import { NextPageWithLayout } from '../_app';

// Asumsikan kita menggunakan fungsi navigasi (misal dari React Router)
const navigateTo = (path: string) => {
    console.log(`Navigasi ke: ${path}`);
    // Di aplikasi nyata, ini adalah navigate(path)
};

const ForgotPasswordPage: NextPageWithLayout = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsLoading(true);

        // --- Simulasi Panggilan API Reset Password ---
        console.log('Mengirim tautan reset ke:', email);

        setTimeout(() => {
            setIsLoading(false);
            setIsSubmitted(true);

            // Di aplikasi nyata: Beri tahu pengguna untuk memeriksa email
        }, 2000); // Simulasi waktu tunggu API
    };

    return (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 md:p-10 transform transition-all duration-300 border border-gray-200">

            <div className="text-center">
                <h2 className="text-4xl font-extrabold text-stone-900 mb-2">
                    Lupa Kata Sandi?
                </h2>
                <p className="text-gray-500 mb-6">
                    Masukkan alamat email Anda yang terdaftar, dan kami akan mengirimkan tautan untuk mengatur ulang kata sandi Anda.
                </p>
            </div>

            {isSubmitted ? (
                /* --- Tampilan Sukses Setelah Submit --- */
                <div className="text-center p-6 bg-green-50 border border-green-300 rounded-lg">
                    <p className="text-xl font-semibold text-green-700 mb-3">
                        ✅ Tautan Terkirim!
                    </p>
                    <p className="text-sm text-gray-700 mb-4">
                        Kami telah mengirimkan instruksi pengaturan ulang kata sandi ke <span className="font-bold">{email}</span>. Mohon periksa kotak masuk atau folder spam Anda.
                    </p>
                    <button
                        onClick={() => navigateTo('/login')}
                        className="w-full py-3 rounded-xl text-white font-bold bg-amber-600 hover:bg-amber-700 transition-colors shadow-md"
                    >
                        Kembali ke Halaman Masuk
                    </button>
                </div>

            ) : (
                /* --- Tampilan Formulir Awal --- */
                <form className="space-y-6" onSubmit={handleSubmit}>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Alamat Email
                        </label>
                        <div className="mt-1">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                            {isLoading ? 'Mengirim...' : 'Kirim Tautan Reset'}
                        </button>
                    </div>

                    {/* Link Kembali */}
                    <div className="text-center pt-2">
                        <a
                            href="/login"
                            onClick={(e) => { e.preventDefault(); navigateTo('/login'); }}
                            className="font-medium text-sm text-stone-600 hover:text-stone-800"
                        >
                            ← Ingat kata sandi saya
                        </a>
                    </div>
                </form>
            )}

        </div>
    );
};

ForgotPasswordPage.getLayout = (page: ReactElement) => {
    return (
        <OauthLayout>
            {page}
        </OauthLayout>
    )
}

export default ForgotPasswordPage;