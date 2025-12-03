// import { trpc } from '../utils/trpc';
// export default function IndexPage() {
//   const hello = trpc.hello.useQuery({ text: 'client' });
//   if (!hello.data) {
//     return <div>Loading...</div>;
//   }
//   return (
//     <div>
//       <p>{hello.data.greeting}</p>
//     </div>
//   );
// }

import Footer from '@/components/layout-component/Footer';
import Header from '@/components/layout-component/Header1';
import ProductCard from '@/components/ProductCard';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faPlus, faStar } from '@fortawesome/free-solid-svg-icons';

// Asumsikan ProductCard.tsx sudah tersedia

// Interface Product
interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

// --- Data Produk ---

// Data Produk Terbaru (New Arrivals) - Hanya satu yang disorot di section khusus
const newArrivalProduct: Product = {
  id: 201,
  name: 'Single Origin: Flores Bajawa (Limited)',
  price: 185000,
  imageUrl: 'https://via.placeholder.com/400x400?text=Flores+Bajawa',
  description: 'Rasa rempah, hazelnut, dan citrus yang cerah.',
};

// Data Produk Rekomendasi (Best Sellers/Most Popular) - 4 produk
const recommendedProducts: Product[] = [
  {
    id: 101,
    name: 'Arabika Gayo Winey (250g)',
    price: 150000,
    imageUrl: 'https://via.placeholder.com/400x400?text=Arabika+Gayo',
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
    id: 305,
    name: 'Vietnam Drip Set (Aksesoris)',
    price: 65000,
    imageUrl: 'https://via.placeholder.com/400x400?text=Vietnam+Drip',
    description: 'Aksesoris, Sempurna untuk kopi Robustra.',
  },
  {
    id: 102,
    name: 'Robusta Dampit Peaberry (250g)',
    price: 95000,
    imageUrl: 'https://via.placeholder.com/400x400?text=Robusta+Peaberry',
    description: 'Body tebal, dark chocolate, sangat kuat.',
  },
];

// Data Testimoni
const testimonials = [
  {
    quote: "Espresso Blend-nya luar biasa! Crema tebal dan rasanya balance. Pagi saya jadi sempurna.",
    author: "Ahmad S., Barista",
    rating: 5,
  },
  {
    quote: "Pengiriman cepat dan packaging-nya rapi banget. Kopi Gayo Winey-nya beneran wangi buah.",
    author: "Putri K., Pelanggan Setia",
    rating: 5,
  },
  {
    quote: "Baru coba Flores Bajawa, profilnya unik dan cerah! Layanan chat DLG juga sangat membantu.",
    author: "Rizky P., Penikmat Kopi",
    rating: 4,
  },
];


const HomePage: React.FC = () => {
  // Data Keunggulan (Sama seperti sebelumnya, tapi kita bisa definisikan ulang di sini jika perlu)
  const features = [
    {
      icon: '✨',
      title: 'Freshly Roasted',
      description: 'Biji kopi kami di-roasting dalam batch kecil, menjamin kesegaran maksimal.'
    },
    {
      icon: '🌱',
      title: 'Sourcing Etis',
      description: 'Kami bekerja sama langsung dengan petani lokal, memastikan kualitas premium dan harga yang adil.'
    },
    {
      icon: '🔬',
      title: 'Ground Lab Quality',
      description: 'Setiap biji melewati kontrol kualitas ketat DLG untuk hasil yang konsisten.'
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header/Navbar */}
      <Header activePage='home' />

      {/* 1. HERO SECTION (Gaya Modern Split) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white shadow-xl rounded-2xl my-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Teks Promosi */}
          <div className="md:order-1 order-2">
            <p className="text-xl uppercase tracking-widest text-amber-600 font-semibold mb-3">
              Meet Our Signature
            </p>
            <h2 className="text-6xl lg:text-7xl font-black text-stone-800 mb-6 leading-tight">
              Start Your Day, The <span className="text-amber-700">DLG</span> Way.
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Temukan biji kopi terbaik yang di-roasting dengan presisi laboratorium. Cita rasa yang kompleks, dijamin segar setiap hari.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-amber-600 text-white px-8 py-3 rounded-full text-lg font-bold hover:bg-amber-700 transition-colors shadow-lg"
              >
                Lihat Menu
              </a>
              <a
                href="#"
                className="text-amber-700 border border-amber-700 px-8 py-3 rounded-full text-lg font-bold hover:bg-amber-50 transition-colors"
              >
                Lokasi Kami
              </a>
            </div>
          </div>
          {/* Gambar Besar Kopi */}
          <div className="md:order-2 order-1 relative">
            <img
              src="https://via.placeholder.com/600x600?text=Kopi+Mug+DLG"
              alt="Kopi andalan Daiten Ground Lab"
              className="w-full h-auto rounded-3xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* 2. SECTION: PRODUK TERBARU */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-4xl font-extrabold text-stone-800 mb-10 text-center relative">
          <FontAwesomeIcon icon={faPlus}/> Produk Terbaru dari Lab Kami
          <span className="block w-20 h-1 bg-amber-600 mx-auto mt-2"></span>
        </h2>

        <div className="bg-white rounded-xl shadow-lg border-2 border-amber-100 overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-0 transform hover:scale-[1.01] transition-transform duration-300">
          {/* Gambar Produk Baru */}
          <div className="relative">
            <img
              src={newArrivalProduct.imageUrl}
              alt={newArrivalProduct.name}
              className="w-full h-80 object-cover"
            />
            <div className="absolute top-4 left-4 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md">LIMITED STOCK</div>
          </div>

          {/* Detail Produk Baru */}
          <div className="p-8 flex flex-col justify-center">
            <h3 className="text-3xl font-bold text-stone-800 mb-2">
              {newArrivalProduct.name}
            </h3>
            <p className="text-amber-700 text-xl font-semibold mb-4">
              Rp{newArrivalProduct.price.toLocaleString('id-ID')}
            </p>
            <p className="text-gray-600 mb-6">
              {newArrivalProduct.description} Ini adalah biji kopi *single origin* yang baru kami dapatkan. Cepat coba sebelum kehabisan!
            </p>
            <a
              href="#"
              className="w-auto self-start bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors transform hover:scale-105"
            >
              Pesan Sekarang →
            </a>
          </div>
        </div>
      </section>

      {/* 3. SECTION: PRODUK REKOMENDASI */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-4xl font-extrabold text-stone-800 mb-10 text-center relative">
          <FontAwesomeIcon icon={faStar}/> Produk Rekomendasi (Paling Laris)
          <span className="block w-20 h-1 bg-amber-600 mx-auto mt-2"></span>
        </h2>

        {/* Grid Produk Rekomendasi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {recommendedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-block text-lg text-amber-700 font-semibold hover:text-amber-800 transition-colors border-b-2 border-amber-700 pb-1"
          >
            Lihat Semua Koleksi Kopi →
          </a>
        </div>
      </section>

      {/* (Section Keunggulan sebelumnya dihapus agar fokus pada produk dan testimoni, 
           tapi Anda bisa memasukkannya kembali jika diperlukan) */}

      {/* 4. SECTION: TESTIMONI: APA KATA MEREKA */}
      <section className="bg-white py-16 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-stone-800 mb-10 text-center">
            <FontAwesomeIcon icon={faComment}/> Testimoni: Apa Kata Mereka?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <blockquote key={index} className="bg-stone-50 p-6 rounded-xl border-l-4 border-amber-600 shadow-lg flex flex-col justify-between h-full">
                <div>
                  {/* Rating Bintang */}
                  <div className="flex mb-3 text-amber-500">
                    {Array(testimonial.rating).fill(0).map((_, i) => (
                      <FontAwesomeIcon icon={faStar} key={i} />
                    ))}
                  </div>

                  <p className="text-lg italic text-gray-700 mb-4">
                    "{testimonial.quote}"
                  </p>
                </div>
                <footer className="text-right font-semibold text-amber-700 border-t pt-2 border-amber-100">
                  — {testimonial.author}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;