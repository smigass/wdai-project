import {FaRegStar, FaStar} from "react-icons/fa";
import {FaStarHalfStroke} from "react-icons/fa6";

interface StarsProps {
    rating: number;
    setRating: (rating: number) => void;
}

export default function Stars({rating, setRating}: StarsProps) {
    return (
        <div className={'flex gap-x-3'}>
            {[...Array(5)].map((_, i) => {
                return i + 1 <= rating ?
                    <FaStar key={i} onClick={() => setRating(i + 1)} size={20} color={'gold'}/> : rating - i == 0.5 ?
                        <FaStarHalfStroke onClick={() => setRating(i + 1)} key={i} color={'gold'} size={20}/> :
                        <FaRegStar key={i} onClick={() => setRating(i + 1)} color={'gold'} size={20}/>
            })}
        </div>
    )
}