"use-client";

import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);

    return (
        <div className="flex text-amber-500 text-xl">
            {Array(fullStars).fill(0).map((_, i) => <FontAwesomeIcon icon={faStar} key={`full-${i}`}/>)}
            {hasHalfStar && <span key="half">½</span>}
            {Array(emptyStars).fill(0).map((_, i) => <span key={`empty-${i}`} className="text-gray-300">★</span>)}
        </div>
    );
};

export default StarRating