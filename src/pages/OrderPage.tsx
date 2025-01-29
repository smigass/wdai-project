import {useEffect, useState} from "react";
import {ProductsSummary, CartItem} from "../components/Orders/ProductsSummary.tsx";
import {OrderForm} from "../components/Orders/OrderForm.tsx";

export default function OrderPage(){

    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        fetchCart()
    }, []);


    const fetchCart = async () => {
        const response = await fetch('http://localhost:3000/cart', {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        const data = await response.json();
        setCart(data);
    }


    return(
        <div className={'main-container flex flex-col w-full'}>
            <h1 className={'text-2xl font-main font-bold mb-10'}>Place an order</h1>
            <div className={'w-full flex-col  flex md:flex-row justify-between'}>
                <div className={'lg:w-[50%]'}>
                    <ProductsSummary products={cart}/>
                </div>
                <div className={'lg:w-[50%] flex flex-col items-end'}>
                    <h2 className={'md:ml-6 self-start text-lg font-main font-bold'}>Order details</h2>
                    <OrderForm/>
                </div>
            </div>
        </div>
    )
}