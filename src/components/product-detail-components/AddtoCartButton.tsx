"use-client";

import { MouseEvent } from "react"

const AddToCartButton = ({ handleAddToCart }: { handleAddToCart: (e: MouseEvent<HTMLButtonElement>) => void }) => {
    return (
        <button
            onClick={handleAddToCart}
            className="flex-1 bg-amber-600 text-white text-lg font-bold py-3 rounded-xl hover:bg-amber-700 transition-colors shadow-xl"
        >
            <span className="mr-2">🛒</span> Tambah ke Keranjang
        </button>
    )
}

export default AddToCartButton