import {useSearchParams} from "react-router";
import {useEffect, useState} from "react";
import Category from "../interfaces/Category.ts";
import ProductList from "../components/Search/ProductList.tsx";

export default function Search() {
    const [params] = useSearchParams()

    const [category, setCategory] = useState('')
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/categories/')
            .then(response => response.json())
            .then(data => {
                if (params.get('category') !== null && params.get('category') !== '-1') {
                    const catID = parseInt(params.get('category') as string)
                    data = data.filter((category: Category) => category.CategoryID == catID)[0]
                    setCategory(data.Name)
                }
            })
        let url = 'http://localhost:3000/products/search?'
        if (params.get('category') !== null) {
            url += 'category=' + params.get('category')
        } else url += 'category=-1'
        if (params.get('search') !== null){
            url += '&query=' + params.get('search')
        } else url += '&query='
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setProducts(data)
            })
    }, [params]);


    return (
        <div className={'main-container flex flex-col w-full'}>
            <div className={'mb-10'}>
                <h1 className={'font-bold text-lg md:text-2xl'}>{params.get('search') !== null ? 'Search results for: '+ params.get('search') : 'Category: ' + category} </h1>
                <p>{params.get('q')}</p>
            </div>
            <ProductList products={products}/>
        </div>
    )
}