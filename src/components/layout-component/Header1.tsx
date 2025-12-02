import React from 'react';

interface HeaderProps {
    activePage: 'home' | 'menu' | 'accessories'; // Untuk menandai menu aktif
}

const Header1: React.FC<HeaderProps> = ({ activePage }) => {

    // Fungsi pembantu untuk menentukan kelas aktif pada navigasi
    const getNavLinkClass = (page: string) => {
        return activePage === page
            ? 'text-amber-700 font-bold ml-6 border-b-2 border-amber-700 pb-1'
            : 'text-stone-600 hover:text-amber-700 font-semibold ml-6';
    };

    return (
        <header className="bg-white shadow-lg sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">

                {/* Logo / Brand Name */}
                <a href="/">
                    <h1 className="text-3xl font-extrabold text-amber-700">
                        DLG <span className="text-gray-600 font-medium text-lg">Coffee</span>
                    </h1>
                </a>

                {/* Navigasi Utama */}
                <nav className="flex items-center space-x-2">
                    {/* Link Halaman */}
                    <a href="/" className={getNavLinkClass('home')}>
                        Beranda
                    </a>
                    <a href="/menu" className={getNavLinkClass('menu')}>
                        Biji Kopi
                    </a>
                    <a href="/accessories" className={getNavLinkClass('accessories')}>
                        Aksesoris
                    </a>

                    {/* Pembatas Visual */}
                    <span className="text-gray-300 mx-4 hidden sm:inline">|</span>

                    {/* Tombol Login/Register */}
                    <a
                        href="/login"
                        className="text-stone-600 hover:text-amber-700 font-semibold ml-4 hidden md:inline"
                    >
                        Login
                    </a>
                    <a
                        href="/register"
                        className="bg-amber-600 text-white px-3 py-1.5 rounded-full font-semibold hover:bg-amber-700 transition-colors shadow-md text-sm"
                    >
                        Register
                    </a>

                    {/* Tombol Keranjang */}
                    <button className="bg-stone-200 text-amber-700 px-3 py-1.5 rounded-full ml-4 hover:bg-stone-300 transition-colors shadow-inner text-sm font-bold">
                        🛒 (0)
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Header1;