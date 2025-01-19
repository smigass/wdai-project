import IProduct from "../../interfaces/Product.ts";
import SingleProduct from "./SingleProduct.tsx";

interface ProductListProps {
    products: IProduct[]
}

export default function ProductList({products}: ProductListProps) {
    return (
        <div className={'flex flex-col gap-y-5'}>
            {products.map((product, i) => (
                <SingleProduct product={product} key={i}/>
            ))}
        </div>
    )

}
