"use-client";

import StarRating from "./StarRating"

const Breadcrumb = ({ rating, reviewCount, productName, productCat }: { rating: number, reviewCount: number, productName: string, productCat: "accessories" | "coffee" }) => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex justify-between items-center">
            <div className="text-sm text-gray-500">
                <a href={`/product/${productCat === "accessories" ? "accessories" : "coffee"}`} className="hover:text-amber-700">{productCat === "accessories" ? "Aksesoris" : "Coffee"}</a> / {productName}
            </div>
            <div className="flex items-center space-x-2">
                <StarRating rating={rating} />
                <span className="text-sm font-semibold text-stone-700">
                    {rating.toFixed(1)} ({reviewCount} ulasan)
                </span>
            </div>
        </div>

    )
}

export default Breadcrumb