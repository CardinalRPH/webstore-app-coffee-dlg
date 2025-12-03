"use-client";

// Pagination.tsx
import React from 'react';

interface ProductPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const ProductPagination: React.FC<ProductPaginationProps> = ({ 
    currentPage, 
    totalPages, 
    onPageChange 
}) => {
    
    // Jika hanya ada 1 halaman atau kurang, tidak perlu menampilkan pagination
    if (totalPages <= 1) {
        return null;
    }

    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex justify-center space-x-2 mt-10">
            
            {/* Tombol Sebelumnya */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    currentPage === 1
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
                    onClick={() => onPageChange(page)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                        currentPage === page
                            ? 'bg-stone-800 text-white shadow-lg'
                            : 'bg-white text-stone-700 hover:bg-amber-50 border border-gray-300'
                    }`}
                >
                    {page}
                </button>
            ))}

            {/* Tombol Selanjutnya */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    currentPage === totalPages
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-amber-600 text-white hover:bg-amber-700 shadow-md'
                }`}
            >
                Selanjutnya →
            </button>
        </div>
    );
};

export default ProductPagination;