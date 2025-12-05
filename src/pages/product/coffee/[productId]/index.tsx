"use-client";

import RootLayout from '@/components/Layout/RootLayout';
import AddToCartButton from '@/components/product-detail-components/AddtoCartButton';
import Breadcrumb from '@/components/product-detail-components/Breadcrumb';
import QuantityInput from '@/components/product-detail-components/QuantityInput';
import ReviewCard from '@/components/product-detail-components/ReviewCard';
import { NextPageWithLayout } from '@/pages/_app';
import React, { ReactElement, useState } from 'react';
// Asumsikan Header.tsx sudah tersedia

// --- (1) Interface Detail Produk (Sama) ---
interface DetailedProduct {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    description: string;
    rating: number; // Tambahkan rata-rata rating
    reviewCount: number; // Tambahkan jumlah ulasan

    notes: string[];
    origin: string;
    weight: string;
    roastLevel: 'Light' | 'Medium' | 'Dark';
    availableGrinds: string[];

}

// --- (2) Data Testimoni Tiruan ---
interface Review {
    id: number;
    author: string;
    date: string;
    rating: number;
    comment: string;
}

const mockReviews: Review[] = [
    {
        id: 1,
        author: "Santi Dewi",
        date: "24 Nov 2025",
        rating: 5,
        comment: "Aroma winey-nya benar-benar keluar! Biji kopi ini sangat unik dan menjadi favorit baru saya. Sangat direkomendasikan untuk penyeduh V60."
    },
    {
        id: 2,
        author: "Bagus Setiawan",
        date: "18 Nov 2025",
        rating: 4,
        comment: "Kualitas biji konsisten. Rasa manisnya pas, tapi saya berharap sedikit lebih banyak *body*. Pengiriman sangat cepat."
    },
    {
        id: 3,
        author: "Rina P.",
        date: "01 Nov 2025",
        rating: 5,
        comment: "Saya request gilingan espresso, hasilnya sempurna! Crema tebal dan *aftertaste*-nya bersih. Mantap DLG!"
    }
];

// --- (3) Data Produk Tiruan yang Detail (Diperbarui) ---
const mockProductDetail: DetailedProduct = {
    id: 101,
    name: 'Arabika Gayo Winey',
    price: 150000,
    imageUrl: 'https://via.placeholder.com/600x600?text=Arabika+Gayo+Winey+DLG',
    description: 'Biji kopi Arabika premium dari dataran tinggi Gayo, Aceh. Diproses dengan metode *Winey* yang unik, menghasilkan profil rasa yang kompleks, eksotis, dan sangat aromatik.',
    notes: ['Grape', 'Brown Sugar', 'Floral', 'Winey'],
    origin: 'Dataran Tinggi Gayo, Aceh',
    weight: '250 gram',
    roastLevel: 'Medium',
    availableGrinds: ['Whole Bean (Biji Utuh)', 'Extra Fine (Espresso)', 'Medium (Filter/V60)', 'Coarse (French Press)'],
    rating: 4.6, // Rata-rata Rating
    reviewCount: mockReviews.length, // Jumlah ulasan
};

// --- Komponen Bintang Rating Pembantu ---
const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);

    return (
        <div className="flex text-amber-500 text-xl">
            {Array(fullStars).fill(0).map((_, i) => <span key={`full-${i}`}>★</span>)}
            {hasHalfStar && <span key="half">½</span>}
            {Array(emptyStars).fill(0).map((_, i) => <span key={`empty-${i}`} className="text-gray-300">★</span>)}
        </div>
    );
};


const CoffeeDetailPage: NextPageWithLayout = () => {
    const product = mockProductDetail;
    const [selectedGrind, setSelectedGrind] = useState(product.availableGrinds[0]);
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        if (quantity < 1) return;
        console.log(`Menambahkan ${quantity}x ${product.name} (${selectedGrind}) ke keranjang.`);
        alert(`Berhasil menambahkan ${quantity} item ke keranjang!`);
    };

    return (
        <>
            {/* Breadcrumb & Ringkasan Rating */}
            <Breadcrumb productCat='accessories' productName={product.name} rating={product.rating} reviewCount={product.reviewCount} />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* --- SECTION 1: DETAIL PRODUK UTAMA --- */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white p-8 rounded-xl shadow-2xl mb-12">
                    {/* ... (Kolom Gambar, Tasting Notes, dan Kolom Detail Pembelian di sini, sama seperti sebelumnya) ... */}

                    {/* --- Kolom Kiri: Gambar Produk (Konten Sama) --- */}
                    <div>
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-auto rounded-xl shadow-lg border border-gray-100"
                        />

                        {/* Detail Tambahan: Tasting Notes */}
                        <div className="mt-8 p-4 bg-stone-50 rounded-lg">
                            <h3 className="text-lg font-bold text-stone-700 mb-2 border-b pb-1">Tasting Notes 📝</h3>
                            <div className="flex flex-wrap gap-2">
                                {product.notes.map((note, index) => (
                                    <span key={index} className="bg-amber-100 text-amber-800 text-sm font-medium px-3 py-1 rounded-full">
                                        {note}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* --- Kolom Kanan: Detail & Form Pembelian (Konten Sama) --- */}
                    <div className="flex flex-col justify-between">
                        <div>
                            {/* Nama & Harga */}
                            <p className="text-sm uppercase tracking-widest text-amber-700 font-semibold mb-1">
                                {product.origin}
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

                            {/* Info Teknis */}
                            <div className="grid grid-cols-2 gap-4 text-sm mb-8">
                                <p><strong>Berat:</strong> {product.weight}</p>
                                <p><strong>Level Roasting:</strong> <span className={`font-semibold ${product.roastLevel === 'Dark' ? 'text-stone-800' : 'text-amber-700'}`}>{product.roastLevel}</span></p>
                            </div>

                            {/* Opsi Gilingan */}
                            <div className="mb-8">
                                <label className="block text-lg font-semibold text-stone-700 mb-3">
                                    Pilih Gilingan:
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    {product.availableGrinds.map((grind) => (
                                        <button
                                            key={grind}
                                            onClick={() => setSelectedGrind(grind)}
                                            className={`py-3 px-4 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${selectedGrind === grind
                                                ? 'border-amber-600 bg-amber-50 text-amber-800 shadow-md'
                                                : 'border-gray-300 bg-white text-stone-700 hover:border-amber-300'
                                                }`}
                                        >
                                            {grind}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Kuantitas & Tombol Beli */}
                        <div className="flex items-center space-x-4 border-t pt-6">
                            {/* Kuantitas Input */}
                            <QuantityInput quantity={quantity} setQuantity={setQuantity} />

                            {/* Tombol Add to Cart */}
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


CoffeeDetailPage.getLayout = (page: ReactElement) => {
    return (
        <RootLayout activeHeader='coffee'>
            {page}
        </RootLayout>
    )
}

export default CoffeeDetailPage;