import {useEffect, useState} from "react";
import ProductsInfo from "../interfaces/ProductsInfo.ts";
import HomeSection from "../components/Home/HomeSection.tsx";
import IProduct from "../interfaces/Product.ts";

function Home() {
    const [products, setProducts] = useState<ProductsInfo>();


    useEffect(() => {
        let bestsellers: IProduct[] = []
        fetch('http://localhost:3000/products/bestsellers')
            .then(response => response.json())
            .then(data => {
                bestsellers = data
                fetch('http://localhost:3000/products')
                    .then(response => response.json())
                    .then(data => {
                        const newest: IProduct[] = []
                        const featured: IProduct[] = []
                        while (newest.length < 5) {
                            const random = Math.floor(Math.random() * data.length)
                            if (!newest.includes(data[random])) {
                                newest.push(data[random])
                            }
                        }
                        while (featured.length < 5) {
                            const random = Math.floor(Math.random() * data.length)
                            if (!featured.includes(data[random])) {
                                featured.push(data[random])
                            }
                        }
                        setProducts({
                            bestsellers: bestsellers,
                            newest: newest,
                            featured: featured
                        })
                    })
            })
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
