import React from 'react';

// Interface Produk (Asumsi sama)
interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-gray-200">
      {/* Gambar Kopi */}
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-56 object-cover"
      />

      {/* Detail Produk */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-stone-800 mb-1 truncate">
          {product.name}
        </h3>
        {/* Mengganti deskripsi dengan tag kecil */}
        <p className="text-sm text-gray-500 mb-3 italic">
            {product.description}
        </p>

        <p className="text-2xl font-extrabold text-amber-700 mb-4">
          Rp{product.price.toLocaleString('id-ID')}
        </p>
        
        {/* Tombol Aksi - Menggunakan warna khas kopi (Amber/Cokelat) */}
        <button
          className="w-full bg-amber-600 text-white py-2.5 rounded-lg font-semibold hover:bg-amber-700 transition-colors duration-200 transform hover:scale-105"
          onClick={() => console.log(`Menambahkan ${product.name} ke keranjang DLG`)}
        >
          Pesan Sekarang
        </button>
      </div>
    </div>
  );
};

export default ProductCard;