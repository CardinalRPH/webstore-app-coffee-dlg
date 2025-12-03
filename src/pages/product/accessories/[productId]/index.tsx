"use-client";

import RootLayout from '@/components/Layout/RootLayout';
import AddToCartButton from '@/components/product-detail-components/AddtoCartButton';
import Breadcrumb from '@/components/product-detail-components/Breadcrumb';
import QuantityInput from '@/components/product-detail-components/QuantityInput';
import ReviewCard from '@/components/product-detail-components/ReviewCard';
import { NextPageWithLayout } from '@/pages/_app';
import type { Review } from '@/types/productTypes';
import React, { ReactElement, useState } from 'react';
// Asumsikan Header.tsx sudah tersedia

// --- (1) Interface Detail Aksesoris ---
interface DetailedAccessory {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    description: string;
    material: string; // Bahan utama
    features: string[]; // Fitur utama
    specs: { [key: string]: string }; // Spesifikasi teknis (kapasitas, berat, dll.)
    rating: number;
    reviewCount: number;
}

// --- (2) Data Aksesoris Tiruan yang Detail ---
const mockAccessoryDetail: DetailedAccessory = {
    id: 301,
    name: 'Grinder Manual Keramik',
    price: 350000,
    imageUrl: 'https://via.placeholder.com/600x600?text=Grinder+Manual+DLG',
    description: 'Grinder manual entry-level yang sempurna untuk kebutuhan seduh harian Anda. Dilengkapi dengan burr keramik yang tidak menghasilkan panas berlebih, menjaga integritas rasa kopi Anda. Tingkat gilingan dapat diatur secara presisi untuk berbagai metode seduh.',
    material: 'Burr Keramik, Body Stainless Steel & Plastik ABS',
    features: ['Pengaturan Gilingan Presisi', 'Burr Keramik Anti-Panas', 'Handle Ergonomis', 'Mudah Dibersihkan'],
    specs: {
        'Kapasitas Biji': '30 gram',
        'Tinggi': '18 cm',
        'Berat': '350 gram',
        'Tipe Burr': 'Conical Keramik'
    },
    rating: 4.8,
    reviewCount: 45,
};

// --- (3) Data Ulasan Tiruan untuk Aksesoris ---

const mockReviews: Review[] = [
    {
        id: 1,
        author: "Teguh P.",
        date: "12 Des 2025",
        rating: 5,
        comment: "Grinder yang bagus untuk harganya! Grind size-nya konsisten, dan mudah dibawa saat *traveling*. Burr keramiknya benar-benar terasa perbedaannya."
    },
    {
        id: 2,
        author: "Lina Sari",
        date: "05 Des 2025",
        rating: 4,
        comment: "Handle-nya nyaman dipegang. Sedikit usaha saat menggiling untuk espresso, tapi hasilnya sangat baik untuk V60."
    }
];

// Komponen Bintang Rating Pembantu (Gunakan yang dari halaman sebelumnya)



const AccessoryDetailPage: NextPageWithLayout = () => {
    const product = mockAccessoryDetail;
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        if (quantity < 1) return;
        console.log(`Menambahkan ${quantity}x ${product.name} ke keranjang.`);
        alert(`Berhasil menambahkan ${quantity} item ke keranjang!`);
    };

    return (
        <>
            {/* Breadcrumb & Ringkasan Rating */}
            <Breadcrumb productCat='accessories' productName={product.name} rating={product.rating} reviewCount={product.reviewCount} />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* --- SECTION 1: DETAIL PRODUK UTAMA --- */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white p-8 rounded-xl shadow-2xl mb-12">

                    {/* --- Kolom Kiri: Gambar & Fitur --- */}
                    <div>
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-auto rounded-xl shadow-lg border border-gray-100"
                        />

                        {/* Detail Tambahan: Fitur Utama */}
                        <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-200">
                            <h3 className="text-lg font-bold text-amber-800 mb-2 border-b border-amber-200 pb-1">Fitur Utama ✨</h3>
                            <ul className="list-disc list-inside space-y-1 text-stone-700">
                                {product.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* --- Kolom Kanan: Detail & Pembelian --- */}
                    <div className="flex flex-col justify-between">
                        <div>
                            {/* Nama & Harga */}
                            <p className="text-sm uppercase tracking-widest text-stone-700 font-semibold mb-1">
                                {product.material}
                            </p>
                            <h1 className="text-4xl font-extrabold text-stone-900 mb-3">
                                {product.name}
                            </h1>
                            <p className="text-4xl font-black text-red-600 mb-6">
                                Rp{product.price.toLocaleString('id-ID')}
                            </p>

                            {/* Deskripsi */}
                            <p className="text-gray-600 leading-relaxed mb-6 border-b pb-4">
                                {product.description}
                            </p>

                            {/* Spesifikasi Teknis */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-stone-700 mb-3">Spesifikasi Teknis</h3>
                                <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                                    {Object.entries(product.specs).map(([key, value]) => (
                                        <React.Fragment key={key}>
                                            <dt className="font-medium text-gray-500">{key}:</dt>
                                            <dd className="font-semibold text-stone-800">{value}</dd>
                                        </React.Fragment>
                                    ))}
                                </dl>
                            </div>
                        </div>

                        {/* Kuantitas & Tombol Beli */}
                        <div className="flex items-center space-x-4 border-t pt-6">

                            {/* Kuantitas Input (Sama) */}
                            <QuantityInput quantity={quantity} setQuantity={setQuantity} />

                            {/* Tombol Add to Cart (Sama) */}
                            <AddToCartButton handleAddToCart={handleAddToCart} />
                        </div>
                    </div>
                </div>

                {/* --- SECTION 2: ULASAN PELANGGAN (TESTIMONI) --- */}
                <section className="mt-16 py-8">
                    <h2 className="text-3xl font-bold text-stone-800 mb-8 border-b pb-3">
                        {product.reviewCount} Ulasan Pelanggan ({product.rating.toFixed(1)}/5)
                    </h2>

                    <div className="space-y-8">
                        {mockReviews.map((review) => (
                            <ReviewCard review={review} />
                        ))}
                    </div>

                    <div className="text-center mt-10">
                        <button className="text-amber-700 font-semibold border-b border-amber-700 hover:text-amber-800 transition-colors">
                            Lihat Semua Ulasan ({product.reviewCount})
                        </button>
                    </div>
                </section>

            </main>
        </>
    );
};

AccessoryDetailPage.getLayout = (page: ReactElement) => {
    return (
        <RootLayout activeHeader='accessories'>
            {page}
        </RootLayout>
    )
}

export default AccessoryDetailPage;