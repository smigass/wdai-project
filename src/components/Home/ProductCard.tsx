import IProduct from "../../interfaces/Product.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import '../../styles/home.css'
import {PiArrowRight} from "react-icons/pi";
interface ProductCardProps {
    product: IProduct
}

export default function ProductCard({product}: ProductCardProps){
    return (
        <div key={product.id} className={'product-card'}>
            <div className={'h-[60%] overflow-hidden p-3'}>
                <img src={'/public/images/' +  product.imgsrc} alt={product.title}/>
            </div>
            <div className={'flex justify-between flex-col h-[40%]'}>
                <h3 className={'p-2 font-bold'}>{product.title.length > 50 ? product.title.slice(0,50) + '...' : product.title}</h3>
                <div className={'flex justify-between p-4'}>
                    <p className={'p-2'}>{product.price}zł</p>
                    <PiArrowRight size={20} className={'m-2'}/>
                </div>
            </div>
        </div>
    )
}