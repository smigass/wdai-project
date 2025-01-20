import {useContext, useEffect, useState} from "react";
import {UserContext} from "../context/UserContext.tsx";
import {useNavigate} from "react-router-dom";
import ProductCartList from "../components/Cart/ProductCartList.tsx";


export default function Cart() {

    const user = useContext(UserContext);
    const navigate = useNavigate();

    const [isEmpty, setIsEmpty] = useState(true);

    const [hooker, setHooker] = useState(0);

    useEffect(() => {
        if (!user.user) {
            navigate('/login');
            return
        }
    }, []);

    useEffect(() => {
        fetch('http://localhost:3000/cart', {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(r => r.json())
            .then(data => {
                if (data.length > 0) {
                    setIsEmpty(false)
                }
                else {
                    setIsEmpty(true)
                }
            })
    }, [hooker]);

    const handleHooker = () => {
        setHooker(hooker + 1)
    }


    return (
        <div className={'main-container w-full flex flex-col'}>
            <div>
                <h1 className={'text-2xl font-bold'}>Your cart</h1>
            </div>
            <ProductCartList hooker={handleHooker}/>
            {isEmpty ? <></> : (
                <div className={'w-full flex items-center flex-col'}>
                    <button className={'mt-10 p-3 w-[50%] bg-red-400 rounded-2xl'}>Order</button>

                </div>
            )}
        </div>
    )
}