import IProduct from "../../interfaces/Product.ts";
import {Link} from "react-router";


interface SingleProductProps {
    product: IProduct
}

export default function SingleProduct({product}: SingleProductProps) {

    return (
        <Link to={'/product/' + product.ProductID}>
            <div
                className={'h-96 lg:h-44 shadow-lg w-full border-d-secondary p-3 flex flex-col dark:bg-gray-700/30 dark:shadow-gray-900 lg:flex-row'}>
                <div className={'w-full lg:w-[20%] flex justify-center overflow-hidden'}>
                    <img src={product.Image} alt={product.Name} className={'lg:max-h-32'}/>
                </div>
                <div className={'flex flex-col w-full justify-between'}>
                    <h1 className={'font-bold text-xl'}>{product.Name}</h1>
                    <div className={'flex  w-full justify-end p-2'}>
                        <p className={'text-lg'}>{product.Price}zł</p>
                    </div>

                </div>
            </div>
        </Link>
    )
}