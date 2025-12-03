"use-client";

import { CartItem } from "@/types/orderTypes"
import { formatCurrency } from "@/utils"
import QuantityInput from "../product-detail-components/QuantityInput"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const CartCardList = ({ item, handleQuantityChange, handleRemoveItem }: { item: CartItem, handleQuantityChange: (id: number, currQuantity: number) => void, handleRemoveItem:(id:number)=>void }) => {
    return (
        <div key={item.id} className="flex items-center bg-white p-4 rounded-xl shadow-md border">
            <img
                src={item.imageUrl}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg mr-4"
            />

            <div className="flex-1">
                <h2 className="text-lg font-bold text-stone-800">{item.name}</h2>
                {item.variant && (
                    <p className="text-sm text-gray-500 italic">Varian: {item.variant}</p>
                )}
                <p className="text-xl font-semibold text-red-600 mt-1">{formatCurrency(item.price)}</p>
            </div>

            {/* Kontrol Kuantitas */}
            <QuantityInput quantity={item.quantity} setQuantity={(curQ)=> handleQuantityChange(item.id, curQ) } size="medium" />

            {/* Subtotal Item */}
            <div className="w-24 text-right hidden sm:block">
                <p className="font-bold text-lg text-stone-900">{formatCurrency(item.price * item.quantity)}</p>
            </div>

            {/* Tombol Hapus */}
            <button
                onClick={() => handleRemoveItem(item.id)}
                className="ml-4 text-red-500 hover:text-red-700 transition-colors"
                title="Hapus Item"
            >
                <FontAwesomeIcon icon={faX}/>
            </button>
        </div>
    )
}

export default CartCardList