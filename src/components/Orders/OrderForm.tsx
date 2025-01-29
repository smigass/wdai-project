import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../context/UserContext.tsx";

interface UserDetails {
    UserID: number
    Email: string
    FirstName: string
    LastName: string
    Address: string
    Phone: string
    Role: string
}

export const OrderForm = () => {
    const user = useContext(UserContext);
    const [userDetails, setUserDetails] = useState<UserDetails>();

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
        alert('Order placed successfully');
    }

    useEffect(() => {
        if (user.user !== null) {
            fetchUser();
        }
    }, []);

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