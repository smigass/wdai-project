interface CartListProductProps {
    product: CartProduct
    remove: (e: React.MouseEvent) => void
}

interface CartProduct {
    Name: string,
    Price: number,
    Quantity: number,
    ProductID: number,
    TotalPrice: number,
}

const CartListProduct = ({ product, remove }: CartListProductProps) => {
    return (
        <div className={'w-full border-1'}>
            <div
                className={'p-3 rounded-xl border grid grid-cols-1 items-center lg:grid-cols-5 w-full justify-between'}>
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
                    <button id={product.ProductID.toString()}
                        className={'w-[40%] self-end flex p-2 ml-4 bg-red-400 items-center justify-center'}
                        onClick={remove}>
                        Remove
                    </button>
                </div>

            </div>
        </div>
    )
}

export default CartListProduct