"use-client";

import type { Review } from "@/types/productTypes"
import StarRating from "./StarRating"

const ReviewCard = ({ review }: { review: Review }) => {
    return (
        <div key={review.id} className="p-6 bg-white rounded-xl shadow-md border-l-4 border-amber-500">
            <div className="flex justify-between items-start mb-2">
                <div className="font-bold text-stone-800 text-lg">
                    {review.author}
                </div>
                <StarRating rating={review.rating} />
            </div>
            <p className="text-sm text-gray-500 mb-3">
                Direview pada {review.date}
            </p>
            <p className="text-gray-700 leading-relaxed italic">
                "{review.comment}"
            </p>
        </div>
    )
}

export default ReviewCard