import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../context/UserContext.tsx";
import {CartItem} from "./ProductsSummary.tsx";
interface ordersProps {
    totalPrice: number
    cart: CartItem[]
}
interface UserDetails {
    UserID: number
    Email: string
    FirstName: string
    LastName: string
    Address: string
    Phone: string
    Role: string
}

export const OrderForm = ({totalPrice, cart}: ordersProps) => {
    const user = useContext(UserContext);
    const [userDetails, setUserDetails] = useState<UserDetails>();
    const [orderID, setOrderID] = useState<number>(0);
    const fetchUser = async () => {
        const response = await fetch('http://localhost:3000/users/' + user.user?.userId, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        const data = await response.json();
        console.log(data)
        setUserDetails(data);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetch('http://localhost:3000/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                totalPrice: totalPrice,
                orderDate: new Date(),
            })
        }).then(r => r.json())
            .then(data => {
                for (const product of cart) {
                    setOrderDetails(data.orderId, product.ProductID, product.Quantity)
                }
                window.location.reload();
            })
    }


    const setOrderDetails = async (orderID: number, productID: number, quantity:number) => {
        await fetch('http://localhost:3000/orders/details', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                orderId: orderID,
                productId: productID,
                quantity: quantity
            })
        })
    }

    useEffect(() => {
        if (user.user !== null) {
            fetchUser();
        }
    }, [user]);

    return (
        <form onSubmit={handleSubmit} className={'md:pl-6 md:pt-5 w-[100%] flex flex-col gap-y-3'}>
            <label className={'ml-2'} htmlFor={'firstname'}>First name</label>
            <input className={'border p-1 rounded-xl px-3 dark:bg-d-secondary'} type={'text'} name={'firstname'} value={userDetails?.FirstName}/>
            <label className={'ml-2'} htmlFor={'lastname'}>Last name</label>
            <input className={'border p-1 rounded-xl px-3 dark:bg-d-secondary'} type={'text'} name={'lastname'} value={userDetails?.LastName}/>
            <label className={'ml-2'} htmlFor={'email'}>Email</label>
            <input className={'border p-1 rounded-xl px-3 dark:bg-d-secondary'} type={'text'} name={'email'} value={userDetails?.Email}/>
            <label className={'ml-2'} htmlFor={'phone'}>Phone</label>
            <input className={'border p-1 rounded-xl px-3 dark:bg-d-secondary'} type={'text'} name={'phone'} value={userDetails?.Phone}/>
            <label className={'ml-2'} htmlFor={'address'}>Address</label>
            <input className={'border p-1 rounded-xl px-3 dark:bg-d-secondary'} type={'text'} name={'address'} value={userDetails?.Address}/>
            <button className={'btn-primary mt-3 bg-red-400 mx-10 p-2 rounded-2xl'}>Place order</button>
        </form>
    )
}