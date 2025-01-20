import {FaRegStar, FaStar} from "react-icons/fa";
import {FaStarHalfStroke} from "react-icons/fa6";
import {IoMdClose} from "react-icons/io";
import {useEffect, useState} from "react";
import IProduct from "../interfaces/Product.ts";
import {useNavigate, useParams} from "react-router";
import Rating from "../interfaces/Rating.ts";


export default function ProductInfo() {
    const [product, setProduct] = useState<IProduct>({} as IProduct)
    const [ratings, setRatings] = useState<Rating[]>([])
    const [loadingProduct, setLoading] = useState(true)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        fetch('http://localhost:3000/products/' + params.id)
            .then(response => response.json())
            .then(data => {
                setProduct(data)
                setLoading(false)
            })
        fetch('http://localhost:3000/opinions/' + params.id)
            .then(response => response.json())
            .then(data => {
                setRatings(data)
            })
    }, []);

    function handleCart() {
        const productID = product.ProductID
        fetch('http://localhost:3000/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                productId: productID,
                quantity: 1
            })
        })
            .then(res => {
                if (!res.ok) {
                    console.log(res)
                }
                res.json()
            })
            .then(data => {
                console.log(data)
            })
    }

    const handleRatingRemoval = (e) => {
        const id = e.target.parentElement.id == undefined ? e.target.id : e.target.parentElement.id
        console.log(id)
    }

    function addComment() {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const comment = document.querySelector('textarea').value
        fetch('http://localhost:3000/opinions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                text: comment,
                productID: params.id,
            })
        }).then(r => {
            r.json()
            if (!r.ok){
                navigate('/login')
            }
        })
            .then(data => {
                console.log(data)
            })
    }

    return (
        <>
            {loadingProduct ? <div>Loading...</div> : <div className={'main-container flex-col w-full'}>
                <div className={'my-10 flex'}>
                    <h1 className={'font-bold text-lg md:text-2xl'}>{product.Name}</h1>
                </div>
                <div className={'flex-col gap-y-20 lg:flex-row flex w-full justify-between lg:items-center'}>
                    <div className={'border-2 p-4'}>
                        <img src={product.Image} alt={product.Name}/>
                    </div>
                    <div className={' min-w-[40%] flex flex-col gap-y-10'}>
                        <div>
                            <p className={'text-xl font-main font-bold'}>Price: {product.Price}zł</p>
                        </div>
                        <div>
                            <p className={'text-xl font-main font-bold'}>Description: {product.Description}</p>
                        </div>
                        <div>
                            <p className={'text-xl font-main font-bold'}>In stock: {product.InStock}</p>
                        </div>
                        <div className={'flex justify-between'}>
                            <button id={product.ProductID.toString()} onClick={handleCart} className={'bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'}>
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
                <div className={'reviews mt-10'}>
                    <h2 className={'font-bold text-lg md:text-2xl mb-4'}>Reviews</h2>
                    <div className={'flex-col gap-y-5'}>
                        {ratings.map((rating, index) => (
                            <div key={index} className={'border-2 p-4 my-4'}>
                                <div className={'flex justify-between'}>
                                    <p>{rating.Body}</p>
                                    <button id={rating.OpinionID.toString()} className={'z-100'} onClick={handleRatingRemoval}>
                                        <IoMdClose className={'z-0'} size={22}/>
                                    </button>
                                </div>

                                <p>Rating:</p>
                                <div className={'flex justify-between'}>
                                    <div className={'flex'}>
                                        {[...Array(5)].map((_, i) => {
                                            return i + 1 <= rating.Rating ? <FaStar key={i} size={20} color={'gold'}/> : Math.abs(rating.Rating - i + 1) > 0.5 ? <FaStarHalfStroke key={i} color={'gold'} size={20}/> : <FaRegStar key={i} color={'gold'} size={20}/>
                                        })
                                        }
                                    </div>
                                    <p>{rating.FirstName} {rating.LastName}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
                <div className={'createReview mt-10'}>
                    <h1 className={'font-bold text-2xl mb-8'}>Leave a comment</h1>
                    <textarea className={'border rounded-2xl w-full p-5'}>
                </textarea>
                    <button onClick={addComment} className={'bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4'}>
                        Submit comment
                    </button>
                </div>
            </div>}
        </>
    )
}