import {useEffect, useState} from "react";
import {getProducts} from "../../backend/Database/Products.ts";
import ProductsInfo from "../interfaces/ProductsInfo.ts";
import HomeSection from "../components/Home/HomeSection.tsx";

function Home() {
    const [products, setProducts] = useState<ProductsInfo>();

    const fetchProducts = async () => {
        const response = await getProducts()
        setProducts(response)
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <div className={'container-flex'}>
            {products == null ? <></> : Object.keys(products).map((key,i) => {
                return (
                    <HomeSection key={i} title={String(key).charAt(0).toUpperCase() + key.slice(1).toLowerCase()} products={products[key]}/>
                )
            })}
        </div>
    )
}

export default Home
