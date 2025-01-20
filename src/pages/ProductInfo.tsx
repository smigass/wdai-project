import { FaRegStar, FaStar } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import IProduct from "../interfaces/Product.ts";
import { useNavigate, useParams } from "react-router";
import Rating from "../interfaces/Rating.ts";

export default function ProductInfo() {
    const [product, setProduct] = useState<IProduct | null>(null);
    const [ratings, setRatings] = useState<Rating[]>([]);
    const [ratingValue, setRatingValue] = useState(0);
    const [hoverValue, setHoverValue] = useState<number | null>(null);
    const [comment, setComment] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const params = useParams();
    const navigate = useNavigate();

    const fetchProductData = async () => {
        try {
            const productResponse = await fetch(`http://localhost:3000/products/${params.id}`);
            const productData = await productResponse.json();
            setProduct(productData);

            const ratingsResponse = await fetch(`http://localhost:3000/opinions/${params.id}`);
            const ratingsData = await ratingsResponse.json();
            setRatings(ratingsData);
        } catch (error) {
            console.error("Error fetching product or ratings:", error);
        }
    };

    useEffect(() => {
        fetchProductData();
    }, [params.id]);

    const addComment = async () => {
        setError(null);
        setSuccess(null);
    
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }
    
        if (!ratingValue || !comment) {
            setError("Please provide a rating and a comment.");
            return;
        }
    
        try {
            const response = await fetch("http://localhost:3000/opinions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    productId: params.id,
                    rating: ratingValue,
                    body: comment,
                }),
            });
    
            if (response.ok) {
                const newRating = await response.json(); // Pobierz dane nowej opinii
                setRatings((prev) => [...prev, newRating]); // Dodaj do listy opinii
                setComment("");
                setRatingValue(0);
                setSuccess("Your review has been added!");
            } else if (response.status === 401) {
                navigate("/login");
            } else {
                const errorText = await response.text();
                setError(errorText || "Failed to add review. Please try again.");
            }
        } catch (err) {
            console.error("Error adding comment:", err);
            setError("An unexpected error occurred. Please try again.");
        }
    };
    

    const handleRatingRemoval = async (opinionId: number) => {
        setError(null);
        setSuccess(null);

        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/opinions/${opinionId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                setRatings((prev) => prev.filter((rating) => rating.OpinionID !== opinionId));
                setSuccess("Review deleted successfully!");
            } else {
                const errorText = await response.text();
                setError(errorText || "Failed to delete review. Please try again.");
            }
        } catch (err) {
            console.error("Error deleting comment:", err);
            setError("An unexpected error occurred. Please try again.");
        }
    };

    const handleRatingClick = (value: number) => {
        setRatingValue(value);
    };

    const handleRatingHover = (value: number | null) => {
        setHoverValue(value);
    };

    if (!product) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Loading product...</p>
            </div>
        );
    }

    return (
        <div className="main-container flex-col w-full">
            <div className="my-10 flex">
                <h1 className="font-bold text-lg md:text-2xl">{product.Name}</h1>
            </div>
            <div className="flex-col gap-y-20 lg:flex-row flex w-full justify-between lg:items-center">
                <div className="border-2 p-4">
                    <img src={product.Image} alt={product.Name} />
                </div>
                <div className="min-w-[40%] flex flex-col gap-y-10">
                    <div>
                        <p className="text-xl font-main font-bold">Price: {product.Price}zł</p>
                    </div>
                    <div>
                        <p className="text-xl font-main font-bold">Description: {product.Description}</p>
                    </div>
                    <div>
                        <p className="text-xl font-main font-bold">In stock: {product.InStock}</p>
                    </div>
                </div>
            </div>
            <div className="reviews mt-10">
                <h2 className="font-bold text-lg md:text-2xl mb-4">Reviews</h2>
                <div className="flex-col gap-y-5">
                    {ratings.map((rating) => (
                        <div key={rating.OpinionID} className="border-2 p-4 my-4">
                            <div className="flex justify-between">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar
                                            key={i}
                                            size={20}
                                            color={i + 1 <= rating.Rating ? "gold" : "lightgray"}
                                        />
                                    ))}
                                </div>
                                <p>
                                    {rating.FirstName} {rating.LastName}
                                </p>
                            </div>
                            <div className="flex justify-between">
                                <p>{rating.Body}</p>
                                <button
                                    onClick={() => handleRatingRemoval(rating.OpinionID)}
                                    className="z-100"
                                >
                                    <IoMdClose size={22} />
                                </button>
                            </div>
                            {/* <p>Rating:</p> */}
                            
                        </div>
                    ))}
                </div>
            </div>
            <div className="createReview mt-10">
                <h1 className="font-bold text-2xl mb-8">Leave a comment</h1>
                <div className="mb-4">
                    <label className="block mb-2">Rating:</label>
                    <div className="flex">
                        {[...Array(5)].map((_, i) => (
                            <FaStar
                                key={i}
                                size={30}
                                color={(hoverValue || ratingValue) > i ? "gold" : "lightgray"}
                                onClick={() => handleRatingClick(i + 1)}
                                onMouseEnter={() => handleRatingHover(i + 1)}
                                onMouseLeave={() => handleRatingHover(null)}
                                className="cursor-pointer"
                            />
                        ))}
                    </div>
                </div>
                <textarea
                    placeholder="Write your review here..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="border rounded-2xl w-full p-5"
                ></textarea>
                <button
                    onClick={addComment}
                    className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4"
                >
                    Submit comment
                </button>
                {error && <p className="text-red-500 mt-4">{error}</p>}
                {success && <p className="text-green-500 mt-4">{success}</p>}
            </div>
        </div>
    );
}
