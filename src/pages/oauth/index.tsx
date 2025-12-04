"use-client";

import React, { ReactElement, useState } from 'react';
import { NextPageWithLayout } from '../_app';
import OauthLayout from '@/components/Layout/OauthLayout';

// --- Komponen Form Login (Tiruan) ---
const LoginForm: React.FC<{ onSwitch: () => void; isLoading: boolean; onLogin: (data: any) => void }> = ({ onSwitch, isLoading, onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin({ email, password });
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <h3 className="text-3xl font-extrabold text-stone-900 mb-4">Selamat Datang Kembali!</h3>
            <p className="text-sm text-gray-500">Silakan masukkan detail akun Anda untuk melanjutkan.</p>

            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 transition duration-150"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Kata Sandi</label>
                <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 transition duration-150"
                />
                <div className="text-right mt-2">
                    <a href="#" className="text-xs text-amber-600 hover:text-amber-700">Lupa Kata Sandi?</a>
                </div>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-xl text-white font-bold text-lg transition-colors duration-200 ${isLoading ? 'bg-amber-400 cursor-not-allowed' : 'bg-amber-600 hover:bg-amber-700 shadow-lg'
                    }`}
            >
                {isLoading ? 'Memuat...' : 'Masuk'}
            </button>

            <p className="text-center text-sm text-gray-600 mt-4">
                Belum punya akun?{' '}
                <button type="button" onClick={onSwitch} className="font-semibold text-amber-600 hover:text-amber-700">
                    Daftar di sini
                </button>
            </p>
        </form>
    );
};

// --- Komponen Form Registrasi (Tiruan) ---
const RegisterForm: React.FC<{ onSwitch: () => void; isLoading: boolean; onRegister: (data: any) => void }> = ({ onSwitch, isLoading, onRegister }) => {
    const [formData, setFormData] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Error: Kata Sandi tidak cocok.');
            return;
        }
        onRegister(formData);
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <h3 className="text-3xl font-extrabold text-stone-900 mb-4">Buat Akun Baru</h3>
            <p className="text-sm text-gray-500">Bergabunglah dengan komunitas pecinta kopi kami!</p>

            <div>
                <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                <input
                    type="text"
                    name="fullName"
                    required
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 transition duration-150"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    name="email"
                    required
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 transition duration-150"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Kata Sandi</label>
                    <input
                        type="password"
                        name="password"
                        required
                        onChange={handleChange}
                        disabled={isLoading}
                        className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 transition duration-150"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Konfirmasi Sandi</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        required
                        onChange={handleChange}
                        disabled={isLoading}
                        className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 transition duration-150"
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-xl text-white font-bold text-lg transition-colors duration-200 mt-6 ${isLoading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 shadow-lg'
                    }`}
            >
                {isLoading ? 'Mendaftarkan...' : 'Daftar Sekarang'}
            </button>

            <p className="text-center text-sm text-gray-600 pt-2">
                Sudah punya akun?{' '}
                <button type="button" onClick={onSwitch} className="font-semibold text-amber-600 hover:text-amber-700">
                    Masuk
                </button>
            </p>
        </form>
    );
};

// --- Komponen Utama Pengelola Switch ---
const AuthSwitchPage: NextPageWithLayout = () => {
    const [isRegisterMode, setIsRegisterMode] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const handleSwitchMode = () => {
        setIsRegisterMode(prev => !prev);
    };

    const handleAuthProcess = (data: any, type: 'login' | 'register') => {
        setIsLoading(true);
        console.log(`Memproses ${type}:`, data);

        setTimeout(() => {
            setIsLoading(false);
            if (type === 'register') {
                alert('Pendaftaran Berhasil! Silakan masuk.');
                handleSwitchMode(); // Otomatis pindah ke mode Login
            } else {
                alert(`Selamat datang kembali, ${data.email}!`);
                // Di aplikasi nyata: Redirect ke homepage
            }
        }, 2000);
    };

    return (
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 transform transition-all duration-700">

            {/* Kolom 1: Formulir Utama (Login atau Register) */}
            <div className="p-8 md:p-12 order-2 lg:order-1 flex items-center justify-center">
                <div className="w-full max-w-sm">
                    {isRegisterMode ? (
                        <RegisterForm
                            onSwitch={handleSwitchMode}
                            isLoading={isLoading}
                            onRegister={(data) => handleAuthProcess(data, 'register')}
                        />
                    ) : (
                        <LoginForm
                            onSwitch={handleSwitchMode}
                            isLoading={isLoading}
                            onLogin={(data) => handleAuthProcess(data, 'login')}
                        />
                    )}
                </div>
            </div>

            {/* Kolom 2: Branding dan Visual Kekinian */}
            <div className={`p-12 order-1 lg:order-2 text-white flex flex-col justify-center items-center transition-all duration-700 ${isRegisterMode ? 'bg-amber-600' : 'bg-stone-800'}`}>

                <div className="text-center">
                    <h2 className="text-5xl font-extrabold mb-4 transition-opacity duration-500">
                        {isRegisterMode ? 'Selamat Datang!' : 'Siap Seduh?'}
                    </h2>
                    <p className="mb-6 text-opacity-90 text-sm">
                        {isRegisterMode
                            ? 'Ciptakan akun untuk mendapatkan akses penuh ke menu spesial dan riwayat pesanan.'
                            : 'Masukkan detail Anda atau daftar sekarang untuk melanjutkan petualangan kopi Anda.'
                        }
                    </p>

                    {/* Tombol Switch (Visual) */}
                    <button
                        onClick={handleSwitchMode}
                        className="bg-white text-stone-800 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200"
                        disabled={isLoading}
                    >
                        {isRegisterMode ? 'Sudah Punya Akun? Masuk' : 'Daftar Akun Baru'}
                    </button>
                </div>
            </div>

        </div>
    );
};


AuthSwitchPage.getLayout = (page: ReactElement) => {
    return (
        <OauthLayout>
            {page}
        </OauthLayout>
    )
}

export default AuthSwitchPage;