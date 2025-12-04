"use-client";
import React from 'react';

const Header2: React.FC = () => {

    return (
        <header className="bg-white shadow-lg sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">

                {/* Logo / Brand Name */}
                <a href="/">
                    <h1 className="text-3xl font-extrabold text-amber-700">
                        DLG <span className="text-gray-600 font-medium text-lg">Coffee</span>
                    </h1>
                </a>
            </div>
        </header>
    );
};

export default Header2;