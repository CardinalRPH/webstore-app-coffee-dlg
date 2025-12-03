"use-client";

import { Dispatch } from "react";

const QuantityInput = ({ setQuantity, quantity, size = "large" }: { setQuantity: Dispatch<number>, quantity: number, size?: "large" | "medium" }) => {
    return (
        <div className="flex items-center border border-gray-300 rounded-lg">
            <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className={`${size === "large" ? "px-4 py-2": "px-3 py-1"} text-xl font-bold text-gray-700 hover:bg-gray-100 rounded-l-lg`}
            >-
            </button>
            <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className={`${size === "large" ? "w-16 text-xl": "w-12 text-lg"} text-center  font-semibold border-x border-gray-300 py-2`}
                min="1"
            />
            <button
                onClick={() => setQuantity(quantity + 1)}
                className={`${size === "large" ? "px-4 py-2": "px-3 py-1"} text-xl font-bold text-gray-700 hover:bg-gray-100 rounded-r-lg`}
            >+
            </button>
        </div>
    )
}

export default QuantityInput