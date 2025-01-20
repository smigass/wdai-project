import IProduct from "../../interfaces/Product.ts";


interface SingleProductProps {
    product: IProduct
}

export default function SingleProduct({product}: SingleProductProps) {
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

    return (
        <div className={'h-96 lg:h-44 shadow-lg w-full border-d-secondary p-3 flex flex-col lg:flex-row'}>
            <div className={'w-full lg:w-[20%] flex justify-center overflow-hidden'}>
                <img src={product.Image} alt={product.Name} className={'lg:max-h-32'}/>
            </div>
            <div className={'flex flex-col w-full justify-between'}>
                <h1 className={'font-bold text-xl'}>{product.Name}</h1>
                <div className={'flex  w-full justify-between'}>
                    <p className={'text-lg'}>{product.Price}zł</p>
                    <button className={'p-1 rounded-lg border-2'} onClick={handleCart}>
                        Add to cart
                    </button>
                </div>

            </div>
        </div>
    )
}