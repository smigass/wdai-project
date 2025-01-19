import IProduct from "../../interfaces/Product.ts";


interface SingleProductProps {
    product: IProduct
}
export default function SingleProduct({product}: SingleProductProps){
    return (
        <div className={'shadow-lg w-full border-d-secondary p-3'}>
            <h1>{product.Name}</h1>
        </div>
    )
}