import IProduct from "../../interfaces/Product.ts";

interface OrderItemProps {
    item: IProduct
    quantity: number
}

export const OrderItem = ({ item, quantity }: OrderItemProps) => {
    return (
        <div className={'flex justify-between gap-x-8 p-2'}>
            <div className={'w-20'}>
                <img src={item.Image} alt={item.Name}/>
            </div>
            <div className={'w-full flex items-center gap-x-2 justify-between'}>
                <p className={'w-[50%]'}>{item.Name.length > 25 ? item.Name.substring(0,25) + '...' : item.Name}</p>
                <p className={'w-[20%]'}>x{quantity}</p>
                <p className={'w-[30%]'}>Total: {quantity * item.Price}</p>
            </div>
        </div>
    )
}