'use client';
import { useState, useMemo, ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';
import ProductLayout from '@/components/Layout/ProductLayout';
import ProductCard from '@/components/ProductCard';
// Interface Product (Sama seperti sebelumnya)
interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    description: string;
    category: 'Arabika' | 'Robusta' | 'Blend' | 'Limited';
}

// --- Data Produk Kopi Lengkap (Sama) ---
const fullCoffeeMenu: Product[] = [
    {
        id: 101,
        name: 'Arabika Gayo Winey (250g)',
        price: 150000,
        imageUrl: 'https://via.placeholder.com/400x400?text=Gayo+Winey',
        description: 'Aroma buah, rasa manis seperti anggur.',
        category: 'Arabika',
    },
    {
        id: 102,
        name: 'Robusta Dampit Peaberry (250g)',
        price: 95000,
        imageUrl: 'https://via.placeholder.com/400x400?text=Dampit+Peaberry',
        description: 'Body tebal, dark chocolate, sangat kuat.',
        category: 'Robusta',
    },
    {
        id: 103,
        name: 'Espresso Blend House',
        price: 135000,
        imageUrl: 'https://via.placeholder.com/400x400?text=Espresso+Blend',
        description: 'Campuran pas untuk espresso dan susu.',
        category: 'Blend',
    },
    {
        id: 104,
        name: 'Liberika Jambi (250g)',
        price: 110000,
        imageUrl: 'https://via.placeholder.com/400x400?text=Liberika+Jambi',
        description: 'Unik, smoky, dan sedikit rasa kacang.',
        category: 'Limited',
    },
    {
        id: 201,
        name: 'Flores Bajawa (Limited Edition)',
        price: 185000,
        imageUrl: 'https://via.placeholder.com/400x400?text=Flores+Bajawa',
        description: 'Rasa rempah, hazelnut, dan citrus yang cerah.',
        category: 'Limited',
    },
    {
        id: 202,
        name: 'Arabika Kintamani Bali (250g)',
        price: 140000,
        imageUrl: 'https://via.placeholder.com/400x400?text=Kintamani+Bali',
        description: 'Asam manis jeruk, body sedang, bersih.',
        category: 'Arabika',
    },
    {
        id: 203,
        name: 'Robusta Temanggung Fullwash (250g)',
        price: 105000,
        imageUrl: 'https://via.placeholder.com/400x400?text=Robusta+Temanggung',
        description: 'Rasa cokelat, nutty, aroma kacang yang kuat.',
        category: 'Robusta',
    },
    {
        id: 204,
        name: 'Single Origin Toraja Sapan',
        price: 165000,
        imageUrl: 'https://via.placeholder.com/400x400?text=Toraja+Sapan',
        description: 'Body penuh, rempah, dan aroma herbal.',
        category: 'Arabika',
    },
    {
        id: 205,
        name: 'Blend Mantap Pagi',
        price: 115000,
        imageUrl: 'https://via.placeholder.com/400x400?text=Mantap+Pagi',
        description: 'Blend Robusta-Arabika untuk dosis kafein pagi.',
        category: 'Blend',
    },
];

// Konstanta untuk Pagination
const PRODUCTS_PER_PAGE = 4;

const CoffeeMenuPage: NextPageWithLayout = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
    const [sortBy, setSortBy] = useState<string>('terbaru');
    const [currentPage, setCurrentPage] = useState<number>(1); // State baru untuk halaman aktif

    // --- LOGIKA FILTER DAN SORTING (Menggunakan useMemo agar efisien) ---
    const filteredAndSortedProducts = useMemo(() => {
        let products = fullCoffeeMenu;

        // 1. Filter
        if (selectedCategory !== 'Semua') {
            products = fullCoffeeMenu.filter(p => p.category === selectedCategory);
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
    }, [selectedCategory, sortBy]);


    // --- LOGIKA PAGINATION ---
    const totalPages = Math.ceil(filteredAndSortedProducts.length / PRODUCTS_PER_PAGE);

    const productsToDisplay = useMemo(() => {
        const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
        const endIndex = startIndex + PRODUCTS_PER_PAGE;
        return filteredAndSortedProducts.slice(startIndex, endIndex);
    }, [filteredAndSortedProducts, currentPage]);

    // Array untuk tombol pagination (1, 2, 3, ...)
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    // Handler Pindah Halaman
    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
            // Opsional: Scroll ke atas saat pindah halaman
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };


    return (
        <>
            {/* Banner Halaman Menu */}
            <div className="bg-stone-700 text-white text-center py-16 mb-8">
                <h2 className="text-5xl font-extrabold mb-2">Koleksi Biji Kopi DLG</h2>
                <p className="text-xl opacity-80">Menampilkan {filteredAndSortedProducts.length} produk kopi terbaik.</p>
            </div>

            {/* Konten Utama Menu */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Filter dan Sorting Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-lg shadow-md mb-8">
                    {/* ... Konten Filter dan Sort (Tidak Berubah) ... */}
                    {/* Filter Kategori */}
                    <div className="flex flex-wrap gap-2 md:gap-4 mb-4 md:mb-0">
                        {['Semua', 'Arabika', 'Robusta', 'Blend', 'Limited'].map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${selectedCategory === cat
                                    ? 'bg-amber-600 text-white shadow-md'
                                    : 'bg-gray-100 text-stone-600 hover:bg-amber-50'
                                    }`}
                            >
                                {cat}
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

                {/* Grid Produk yang sudah dipaginasi */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 min-h-[500px]">
                    {productsToDisplay.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {productsToDisplay.length === 0 && (
                    <div className="text-center py-10 text-gray-500">
                        <p className="text-xl">Maaf, tidak ada kopi dalam kategori **{selectedCategory}** saat ini.</p>
                    </div>
                )}

                {/* --- KOMPONEN PAGINATION --- */}
                {totalPages > 1 && (
                    <div className="flex justify-center space-x-2 mt-10">
                        {/* Tombol Sebelumnya */}
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${currentPage === 1
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-amber-600 text-white hover:bg-amber-700 shadow-md'
                                }`}
                        >
                            ← Sebelumnya
                        </button>

                        {/* Nomor Halaman */}
                        {pageNumbers.map(page => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${currentPage === page
                                    ? 'bg-stone-800 text-white shadow-lg'
                                    : 'bg-white text-stone-700 hover:bg-amber-50 border border-gray-300'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}

                        {/* Tombol Selanjutnya */}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${currentPage === totalPages
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-amber-600 text-white hover:bg-amber-700 shadow-md'
                                }`}
                        >
                            Selanjutnya →
                        </button>
                    </div>
                )}

            </main>
        </>
    );
};


CoffeeMenuPage.getLayout = (page: ReactElement) => {
    return (
        <ProductLayout>
            {page}
        </ProductLayout>
    )
}

export default CoffeeMenuPage;