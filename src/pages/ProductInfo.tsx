import {FaRegStar, FaStar} from "react-icons/fa";
import {FaStarHalfStroke} from "react-icons/fa6";
import {IoMdClose} from "react-icons/io";

export default function ProductInfo() {
    const product = {
        id: 1,
        title: 'Apple MacBook Air 2023 M2 Chip 8 CPU 10 GPU 256GB 8GB 15.3" 2880x1864 Retina',
        price: 4999.99,
        imgsrc: '/images/apple-macbook-air-2023-m2-chip-8-cpu-10-gpu-256gb-8gb-15-3-2880x1864-retina-b-iext144351294.webp',
        category_number: 1,
        description: 'Product description',
        ratings: [
            {rating: 3.5, comment: 'Great product!', user: 'Roman Kolano', id: 1},
            {rating: 5, comment: 'Great product!', user: 'Roman Kolano', id: 5}
        ],
        stock: 10
    }

    const handleRatingRemoval = (e) => {
        const id = e.target.parentElement.id == undefined ? e.target.id : e.target.parentElement.id
        console.log(id)
    }

    return (
        <div className={'main-container flex-col w-full'}>
            <div className={'my-10 flex'}>
                <h1 className={'font-bold text-lg md:text-2xl'}>{product.title}</h1>
            </div>
            <div className={'flex-col gap-y-20 lg:flex-row flex w-full justify-between lg:items-center'}>
                <div className={'border-2 p-4'}>
                    <img src={product.imgsrc} alt={product.title}/>
                </div>
                <div className={' min-w-[40%] flex flex-col gap-y-10'}>
                    <div>
                        <p className={'text-xl font-main font-bold'}>Price: {product.price}zł</p>
                    </div>
                    <div>
                        <p className={'text-xl font-main font-bold'}>Description: {product.description}</p>
                    </div>
                    <div>
                        <p className={'text-xl font-main font-bold'}>In stock: {product.stock}</p>
                    </div>
                    <div className={'flex justify-between'}>
                        <button className={'bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'}>
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
            <div className={'reviews mt-10'}>
                <h2 className={'font-bold text-lg md:text-2xl mb-4'}>Reviews</h2>
                <div className={'flex-col gap-y-5'}>
                    {product.ratings.map((rating, index) => (
                        <div key={index} className={'border-2 p-4 my-4'}>
                            <div className={'flex justify-between'}>
                                <p>{rating.comment}</p>
                                <button id={rating.id.toString()} className={'z-100'} onClick={handleRatingRemoval}>
                                    <IoMdClose className={'z-0'} size={22}/>
                                </button>
                            </div>

                            <p>Rating:</p>
                            <div className={'flex justify-between'}>
                                <div className={'flex'}>
                                    {[...Array(5)].map((_, i) => {
                                        return i + 1 <= rating.rating ? <FaStar key={i} size={20} color={'gold'}/> : Math.abs(rating.rating - i + 1) > 0.5 ? <FaStarHalfStroke key={i} color={'gold'} size={20}/> : <FaRegStar key={i} color={'gold'} size={20}/>
                                    })
                                    }
                                </div>
                                <p>{rating.user}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
            <div className={'createReview mt-10'}>
                <h1 className={'font-bold text-2xl mb-8'}>Leave a comment</h1>
                <textarea className={'border rounded-2xl w-full p-5'}>
                </textarea>
                <button className={'bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4'}>
                    Submit comment
                </button>
            </div>
        </div>
    )
}