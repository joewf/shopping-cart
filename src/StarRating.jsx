import { useState } from "react"

const StarRating = ({ initialRating }) => {
    const [rating, setRating] = useState(initialRating || 0);

    return (
        <div className="bg-white pl-1">
            <span className="bg-white text-black text-sm">{rating.rate}</span>
            {[...Array(5)].map((_, index) => (
                <span
                    className="bg-white"
                    key={index}
                    style={{
                        color: index + 1 <= rating.rate ? 'gold' : 'gray',
                        fontSize: '16px',
                    }}
                >
                    &#9733;
                </span>
            ))}
            <span className="bg-white text-black text-sm ml-4">{rating.count} ratings</span>
        </div>
    )
}

export default StarRating;