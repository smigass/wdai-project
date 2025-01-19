import {getProducts} from "../Database/Products.ts";
import {useEffect, useState} from "react";
import IProduct from "../interfaces/Product.ts";

export default function Products() {
    const [products, setProducts] = useState<IProduct[]>([])
    useEffect(() => {
        getProducts().then((response) => {
            setProducts([...response.newest, ...response.popular, ...response.best_sellers])
        })
    }, []);
    return (
        <div>
            <h1 className={'font-bold text-3xl'}>All products</h1>
            <div className={'flex'}>
                {products.map((product, i) => {
                    return (
                        <div key={i} className={'product-card'}>
                            <img src={product.image} alt={product.name}/>
                            <h2>{product.name}</h2>
                            <p>{product.price}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}