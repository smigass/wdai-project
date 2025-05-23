import {useEffect, useState} from "react";
import * as React from "react";
import {useNavigate} from "react-router-dom";
import CartListProduct from "./CartListProduct";

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
        }).then(r => {
            r.json().then(data => {
                console.log(data)
                setCart(data)
                setTotalPrice(data.reduce((acc: number, product: CartProduct) => acc + product.TotalPrice, 0))
            })
            })
    }, []);

    useEffect(() => {
        setTotalPrice(cart.reduce((acc, product) => acc + product.TotalPrice, 0))

    }, [cart]);


    function handleCartRemoval(e: React.MouseEvent) {
        const productID = e.currentTarget.id
        if (!productID) return
        fetch(`http://localhost:3000/cart/${productID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then(r => {
            if (r.ok) {
                setCart(cart.filter(product => product.ProductID.toString() != productID))
            }
            hooker()
        })


    }

    return (
        <div className={'flex w-full flex-col'}>
            {cart.length < 1 ? <div>Your cart is empty</div> : (
                <div className={'flex w-full flex-col gap-y-3 mt-10'}>
                    {cart.map((product, i) => (
                        <CartListProduct product={product} remove={handleCartRemoval} key={i}/>
                    ))}
                </div>
            )}
            <p className={'mt-10 text-xl font-bold'}>Total price: {totalPrice.toFixed(2)}zł</p>
        </div>
    )
}