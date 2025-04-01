import {useState} from "react";

interface order{
    OrderID: number,
    UserID: 1,
    TotalPrice: number,
    OrderDate: string,
}

const OrdersPage = () => {

    const [orders, setOrders] = useState<order[]>([]);

    fetch('http://localhost:3000/orders/user', {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }).then(res => {
        res.json().then(data => {
            setOrders(data);
        })
    })

    return(
        <div className={'w-full'}>
            <h1 className={'text-2xl font-bold mb-10'}>Your orders</h1>
            <div className={'w-full flex gap-y-4 flex-col'}>
                {orders.map((order, index) => (
                    <div key={index} className={'w-full border p-3 rounded-xl'}>
                        <h2>Order ID: {order.OrderID}</h2>
                        <p>Total price: {order.TotalPrice}zł</p>
                        <p>Order date: {order.OrderDate}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default OrdersPage;