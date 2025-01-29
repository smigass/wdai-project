import IProduct from "../../interfaces/Product.ts";
import SingleProduct from "./SingleProduct.tsx";
import {useEffect, useState} from "react";
import {MdArrowBackIosNew, MdArrowForwardIos} from "react-icons/md";

interface ProductListProps {
    products: IProduct[]
}

export default function ProductList({products}: ProductListProps) {

    const [page, setPage] = useState(1)

    const PRODUCTS_PER_PAGE = 10

    const MAX_PAGES = Math.ceil(products.length / PRODUCTS_PER_PAGE)

    const changePage = (pageNo: number) => {
        setPage(pageNo)
        window.scrollTo(0, 0)
    }

    const [productsToDisplay, setProductsToDisplay] = useState<IProduct[]>([])

    useEffect(() => {
        const start = (page - 1) * PRODUCTS_PER_PAGE
        const end = start + PRODUCTS_PER_PAGE
        setProductsToDisplay(products.slice(start, end))
    }, [page]);

    useEffect(() => {
        setPage(1)
        setProductsToDisplay(products.slice(0, PRODUCTS_PER_PAGE))
    }, [products]);

    return (
        <div className={'flex flex-col gap-y-5'}>
            {productsToDisplay.map((product, i) => (
                <SingleProduct product={product} key={i}/>
            ))}
            <div className={'flex justify-center'}>
                <div className={`${page == 1 ? 'hidden' : ' block'} flex items-center`}>
                    <MdArrowBackIosNew onClick={() => changePage(page - 1)}/>
                </div>
                {new Array(MAX_PAGES).fill(0).map((_, i) => (
                    <div key={i} onClick={() => changePage(i + 1)}
                         className={`m-1 cursor-pointer ${page == i + 1 ? 'text-red-500' : 'text-black'}`}>{i + 1}
                    </div>

                ))}
                <div className={`${page == MAX_PAGES ? 'hidden' : ' block'} flex items-center`}>
                    <MdArrowForwardIos onClick={() => changePage(page + 1)}/>
                </div>

            </div>
        </div>
    )

}
