"use-client";

import RootLayout from '@/components/Layout/RootLayout';
import ProductCard from '@/components/ProductCard';
import ProductPagination from '@/components/ProductPagination';
import { NextPageWithLayout } from '@/pages/_app';
import React, { useState, useMemo, ReactElement } from 'react';
// Asumsikan ProductCard, Header, dan Pagination sudah tersedia

// --- (1) Interface Produk Aksesoris ---
interface Accessory {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    description: string;
    type: 'BrewingTool' | 'Grinder' | 'Storage' | 'Scale'; // Tipe aksesoris
}

// --- (2) Data Produk Aksesoris Lengkap ---
const fullAccessoryMenu: Accessory[] = [
    {
        id: 301,
        name: 'Grinder Manual Keramik',
        price: 350000,
        imageUrl: 'https://via.placeholder.com/400x400?text=Grinder+Manual',
        description: 'Bilah keramik, portable, ideal untuk pemula.',
        type: 'Grinder',
    },
    {
        id: 302,
        name: 'V60 Pour Over Kit (Size 02)',
        price: 220000,
        imageUrl: 'https://via.placeholder.com/400x400?text=V60+Kit',
        description: 'Termasuk dripper, server, dan kertas filter.',
        type: 'BrewingTool',
    },
    {
        id: 303,
        name: 'Timbangan Digital DLG',
        price: 450000,
        imageUrl: 'https://via.placeholder.com/400x400?text=Timbangan+Kopi',
        description: 'Presisi 0.1g, built-in timer, anti air.',
        type: 'Scale',
    },
    {
        id: 304,
        name: 'Air Tight Canister 500g',
        price: 180000,
        imageUrl: 'https://via.placeholder.com/400x400?text=Coffee+Canister',
        description: 'Menjaga kesegaran kopi, dilengkapi one-way valve.',
        type: 'Storage',
    },
    {
        id: 305,
        name: 'French Press 600ml',
        price: 150000,
        imageUrl: 'https://via.placeholder.com/400x400?text=French+Press',
        description: 'Ideal untuk kopi berbody penuh dan seduhan cepat.',
        type: 'BrewingTool',
    },
    {
        id: 306,
        name: 'Grinder Listrik Otomatis',
        price: 1800000,
        imageUrl: 'https://via.placeholder.com/400x400?text=Electric+Grinder',
        description: 'Burr baja, 40+ setelan gilingan.',
        type: 'Grinder',
    },
    {
        id: 307,
        name: 'Server Kopi Kaca 800ml',
        price: 90000,
        imageUrl: 'https://via.placeholder.com/400x400?text=Coffee+Server',
        description: 'Kaca borosilikat tahan panas.',
        type: 'Storage',
    },
];

// Konstanta untuk Pagination
const PRODUCTS_PER_PAGE = 4; // Bisa diatur lebih besar jika aksesorisnya banyak

const AccessoriesMenuPage: NextPageWithLayout = () => {
    // State
    const [selectedType, setSelectedType] = useState<string>('Semua');
    const [sortBy, setSortBy] = useState<string>('terbaru');
    const [currentPage, setCurrentPage] = useState<number>(1);

    // Opsi Filter
    const filterOptions = ['Semua', 'BrewingTool', 'Grinder', 'Storage', 'Scale'];

    // --- LOGIKA FILTER DAN SORTING ---
    const filteredAndSortedProducts = useMemo(() => {
        let products = fullAccessoryMenu;

        // 1. Filter berdasarkan Tipe Aksesoris
        if (selectedType !== 'Semua') {
            products = fullAccessoryMenu.filter(p => p.type === selectedType);
        }

        // 2. Sort
        if (sortBy === 'harga_tertinggi') {
            products = [...products].sort((a, b) => b.price - a.price);
        } else if (sortBy === 'harga_terendah') {
            products = [...products].sort((a, b) => a.price - b.price);
        }

        // Reset halaman ke 1 setiap kali filter/sort berubah
        setCurrentPage(1);
        return products;
    }, [selectedType, sortBy]);


    // --- LOGIKA PAGINATION ---
    const totalPages = Math.ceil(filteredAndSortedProducts.length / PRODUCTS_PER_PAGE);

    const productsToDisplay = useMemo(() => {
        const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
        const endIndex = startIndex + PRODUCTS_PER_PAGE;
        return filteredAndSortedProducts.slice(startIndex, endIndex);
    }, [filteredAndSortedProducts, currentPage]);

    // Handler Pindah Halaman
    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };


    return (
        <>
            {/* Banner Halaman Aksesoris */}
            <div className="bg-amber-700 text-white text-center py-16 mb-8">
                <h2 className="text-5xl font-extrabold mb-2">Aksesoris Kopi Terbaik</h2>
                <p className="text-xl opacity-80">Lengkapi *brew station* Anda dengan peralatan presisi DLG.</p>
            </div>

            {/* Konten Utama Aksesoris */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Filter dan Sorting Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-lg shadow-md mb-8">
                    {/* Filter Tipe Aksesoris */}
                    <div className="flex flex-wrap gap-2 md:gap-4 mb-4 md:mb-0">
                        {filterOptions.map(type => (
                            <button
                                key={type}
                                onClick={() => setSelectedType(type)}
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${selectedType === type
                                    ? 'bg-stone-800 text-white shadow-md'
                                    : 'bg-gray-100 text-stone-600 hover:bg-stone-200'
                                    }`}
                            >
                                {type === 'BrewingTool' ? 'Alat Seduh' : type === 'Grinder' ? 'Penggiling' : type === 'Storage' ? 'Penyimpanan' : type === 'Scale' ? 'Timbangan' : 'Semua Tipe'}
                            </button>
                        ))}
                    </div>

                    {/* Sorting Dropdown */}
                    <div className="flex items-center space-x-2">
                        <label htmlFor="sort" className="text-stone-700 font-medium text-sm">Urutkan:</label>
                        <select
                            id="sort"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="p-2 border border-gray-300 rounded-lg text-stone-700 text-sm focus:ring-amber-500 focus:border-amber-500"
                        >
                            <option value="terbaru">Terbaru</option>
                            <option value="harga_tertinggi">Harga Tertinggi</option>
                            <option value="harga_terendah">Harga Terendah</option>
                        </select>
                    </div>
                </div>

                {/* Grid Produk Aksesoris */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 min-h-[500px]">
                    {productsToDisplay.map((accessory) => (
                        // Menggunakan ProductCard, karena strukturnya cukup mirip
                        <ProductCard key={accessory.id} product={accessory} />
                    ))}
                </div>

                {productsToDisplay.length === 0 && (
                    <div className="text-center py-10 text-gray-500">
                        <p className="text-xl">Maaf, tidak ada aksesoris dalam kategori **{selectedType}** saat ini.</p>
                    </div>
                )}

                {/* Komponen Pagination */}
                <ProductPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />

            </main>
        </>
    );
};

AccessoriesMenuPage.getLayout = (page: ReactElement) => {
    return (
        <RootLayout activeHeader='accessories'>
            {page}
        </RootLayout>
    )
}


export default AccessoriesMenuPage;