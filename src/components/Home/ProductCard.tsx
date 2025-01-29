import IProduct from "../../interfaces/Product.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import '../../styles/home.css'
import {PiArrowRight} from "react-icons/pi";
import {Link} from "react-router";

interface ProductCardProps {
    product: IProduct
}

export default function ProductCard({product}: ProductCardProps) {
    return (
        <Link to={'/product/' + product.ProductID}>
            <div key={product.ProductID} className={'product-card'}>
                <div className={'h-[60%] overflow-hidden p-3'}>
                    <img src={product.Image} alt={product.Name}/>
                </div>
                <div className={'flex justify-between flex-col h-[40%]'}>
                    <h3 className={'p-2 font-bold'}>{product.Name.length > 50 ? product.Name.slice(0, 50) + '...' : product.Name}</h3>
                    <div className={'flex justify-between p-4'}>
                        <p className={'p-2'}>{product.Price}zł</p>
                        <Link to={'/product/' + product.ProductID} className={'flex items-center'}>
                            <PiArrowRight size={20} className={'m-2'}/>
                        </Link>
                    </div>
                </div>
            </div>
        </Link>
    )
}