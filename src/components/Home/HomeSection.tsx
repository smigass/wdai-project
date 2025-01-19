import IProduct from "../../interfaces/Product.ts";
import ProductCard from "./ProductCard.tsx";

interface HomeSectionProps {
    title: string
    products: IProduct[]
}

export default function HomeSection({title, products}: HomeSectionProps) {
    console.log(products)
    return (
        <div className={'container my-10 p-2 border-b-2'}>
            <h2 className={'text-2xl font-bold font-main'}>{title}</h2>
            <div className={'product-card-container'}>
                {products.map((product, i) => {
                    return <ProductCard key={i} product={product}/>
                })}
            </div>
        </div>
    )

}