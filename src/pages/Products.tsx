import {useEffect, useState} from "react";
import IProduct from "../interfaces/Product.ts";
import ProductList from "../components/Search/ProductList.tsx";

export default function Products() {
    const [products, setProducts] = useState<IProduct[]>([])
    useEffect(() => {
        fetch('http://localhost:3000/products')
            .then(response => response.json())
            .then(data => {
                setProducts(data)
            })
    }, []);
    return (
        <div className={'main-container flex flex-col w-full'}>
            <div className={'mb-10'}>
                <h1 className={'font-bold text-lg md:text-2xl'}>All products!</h1>
            <ProductList products={products}/>
            </div>
        </div>
    )
}