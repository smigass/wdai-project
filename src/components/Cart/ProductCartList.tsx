import {useEffect, useState} from "react";

interface ProductCartListProps {
    hooker: () => void
}

interface CartProduct {
    Name: string,
    Price: number,
    Quantity: number,
    ProductID: number,
    TotalPrice: number,
}

export default function ProductCartList({hooker}: ProductCartListProps) {
    const [cart, setCart] = useState<CartProduct[]>([])
    const [totalPrice, setTotalPrice] = useState<number>(0)

    useEffect(() => {
        fetch('http://localhost:3000/cart', {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(r => r.json())
            .then(data => {
                setCart(data)
                setTotalPrice(data.reduce((acc, product) => acc + product.TotalPrice, 0))
            })
    }, []);

    useEffect(() => {
        setTotalPrice(cart.reduce((acc, product) => acc + product.TotalPrice, 0))

    }, [cart]);


    function handleCartRemoval(e) {
        const productID = e.target.id
        if (!productID) return
        fetch(`http://localhost:3000/cart/${productID}` , {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then(r => {
            if (r.ok) {
                setCart(cart.filter(product => product.ProductID != productID))
            }
            hooker()
        })


    }

    return (
       <div className={'flex w-full flex-col'}>
           {cart.length < 1 ? <div>Your cart is empty</div> : (
               <div className={'flex w-full flex-col gap-y-3 mt-10'}>
                   {cart.map((product, index) => (
                        <div className={'w-full border-1'} key={index}>
                            <div className={'p-3 rounded-xl border grid grid-cols-1 items-center lg:grid-cols-5 w-full justify-between'}>
                                <div className={'font-bold'}>
                                    {product.Name.length > 30 ? product.Name.slice(0, 30) + '...' : product.Name}
                                </div>
                                <div className={' lg:text-end'}>
                                    {product.Price}zł
                                </div>
                                <div className={' lg:text-end'}>
                                    {product.Quantity}
                                </div>
                                <div className={' lg:text-end'}>
                                    {product.TotalPrice.toFixed(2)}zł
                                </div>
                                <div className={'flex justify-end'}>
                                    <button id={product.ProductID.toString()} className={'w-[40%] self-end flex p-2 ml-4 bg-red-400 items-center justify-center'} onClick={handleCartRemoval}>
                                        Remove
                                    </button>
                                </div>

                            </div>
                        </div>
                   ))}
               </div>
           )}
           <p className={'mt-10 text-xl font-bold'}>Total price: {totalPrice.toFixed(2)}</p>
       </div>
    )
}