"use-client";

import ProductCard from '@/components/ProductCard';
import { NextPageWithLayout } from '../_app';
import { ReactElement } from 'react';
import RootLayout from '@/components/Layout/RootLayout';
// Asumsikan Header dan ProductCard sudah tersedia

// Interface Product (digunakan untuk kedua jenis produk)
interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    description: string;
    category?: string; // Opsional
    type?: string;     // Opsional
}

// --- Data Tiruan (Digunakan dari halaman sebelumnya) ---

// 1. Data Kopi Rekomendasi (Best Sellers) - Ambil 4 produk terlaris
const recommendedCoffee: Product[] = [
    {
        id: 101,
        name: 'Arabika Gayo Winey (250g)',
        price: 150000,
        imageUrl: 'https://via.placeholder.com/400x400?text=Gayo+Winey',
        description: 'Aroma buah, rasa manis seperti anggur.',
    },
    {
        id: 103,
        name: 'Espresso Blend House',
        price: 135000,
        imageUrl: 'https://via.placeholder.com/400x400?text=Espresso+Blend',
        description: 'Campuran pas untuk espresso dan susu.',
    },
    {
        id: 102,
        name: 'Robusta Dampit Peaberry (250g)',
        price: 95000,
        imageUrl: 'https://via.placeholder.com/400x400?text=Robusta+Peaberry',
        description: 'Body tebal, dark chocolate, sangat kuat.',
    },
    {
        id: 202,
        name: 'Arabika Kintamani Bali',
        price: 140000,
        imageUrl: 'https://via.placeholder.com/400x400?text=Kintamani+Bali',
        description: 'Asam manis jeruk, body sedang, bersih.',
    },
];

// 2. Data Aksesoris Pilihan - Ambil 4 produk penting
const featuredAccessories: Product[] = [
    {
        id: 301,
        name: 'Grinder Manual Keramik',
        price: 350000,
        imageUrl: 'https://via.placeholder.com/400x400?text=Grinder+Manual',
        description: 'Bilah keramik, portable, ideal untuk pemula.',
    },
    {
        id: 303,
        name: 'Timbangan Digital DLG',
        price: 450000,
        imageUrl: 'https://via.placeholder.com/400x400?text=Timbangan+Kopi',
        description: 'Presisi 0.1g, built-in timer, anti air.',
    },
    {
        id: 305,
        name: 'French Press 600ml',
        price: 150000,
        description: 'Ideal untuk kopi berbody penuh dan seduhan cepat.',
        imageUrl: 'https://via.placeholder.com/400x400?text=French+Press',
    },
    {
        id: 304,
        name: 'Air Tight Canister',
        price: 180000,
        imageUrl: 'https://via.placeholder.com/400x400?text=Coffee+Canister',
        description: 'Menjaga kesegaran kopi, dilengkapi one-way valve.',
    },
];


const ProductPage: NextPageWithLayout = () => {
    return (
        <>
            {/* Banner Utama */}
            <div className="bg-stone-800 text-white text-center py-20 mb-10">
                <h2 className="text-5xl font-extrabold mb-3">Selamat Datang di Toko DLG</h2>
                <p className="text-xl opacity-80">Kopi terbaik dan perlengkapan seduh terlengkap, semua ada di sini.</p>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* --- SECTION KOPI: REKOMENDASI --- */}
                <section className="mb-16">
                    <h2 className="text-4xl font-extrabold text-stone-800 mb-8 text-center relative">
                        <span className="text-amber-700">Biji Kopi</span> Rekomendasi Kami ☕
                        <span className="block w-20 h-1 bg-amber-600 mx-auto mt-2"></span>
                    </h2>

                    {/* Grid Kopi */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {recommendedCoffee.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <a
                            href="/menu"
                            className="inline-block bg-amber-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-amber-700 transition-colors shadow-lg"
                        >
                            Lihat Semua Biji Kopi →
                        </a>
                    </div>
                </section>

                {/* --- SECTION AKSESORIS: PILIHAN --- */}
                <section className="py-12 bg-white rounded-xl shadow-2xl">
                    <h2 className="text-4xl font-extrabold text-stone-800 mb-8 text-center relative">
                        <span className="text-amber-700">Aksesoris</span> Pilihan Lab Kami 🛠️
                        <span className="block w-20 h-1 bg-stone-500 mx-auto mt-2"></span>
                    </h2>

                    {/* Grid Aksesoris */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-8">
                        {featuredAccessories.map((accessory) => (
                            <ProductCard key={accessory.id} product={accessory} />
                        ))}
                    </div>

                    <div className="text-center mt-10">
                        <a
                            href="/accessories"
                            className="inline-block text-lg text-stone-700 font-semibold hover:text-amber-700 transition-colors border-b-2 border-stone-700 pb-1"
                        >
                            Lihat Semua Aksesoris →
                        </a>
                    </div>
                </section>

            </main>
        </>
    );
};

ProductPage.getLayout = (page: ReactElement) => {
    return (
        <RootLayout activeHeader='home'>
            {page}
        </RootLayout>
    )
}


export default ProductPage;