const Footer = () => {
    return (
        <footer className="bg-stone-800 text-white mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
                <p className="text-xl font-bold mb-2">Daiten Ground Lab (DLG)</p>
                <p className="text-sm opacity-70">&copy; {new Date().getFullYear()}. Hak Cipta Dilindungi.</p>
                <p className="text-sm opacity-70 mt-1">Sip your day, the DLG way.</p>
            </div>
        </footer>
    )
}

export default Footer