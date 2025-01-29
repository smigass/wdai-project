import IProduct from "../../interfaces/Product.ts";
import {useEffect, useState} from "react";
import {OrderItem} from "./OrderItem.tsx";

interface ProductsSummaryProps {
    products: CartItem[]
}

export interface CartItem {
    Name: string
    Price: number
    Quantity: number
    ProductID: number
    TotalPrice: number
}

export const ProductsSummary = ({ products }: ProductsSummaryProps) => {
    const [productsInfo, setProductsInfo] = useState<IProduct[]>([]);

    const getProductInfo = async (productID: number) => {
        const response = await fetch(`http://localhost:3000/products/${productID}`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return await response.json();
    }

    const fetchProductsInfo = async () => {
        const productsInfo = [];
        for (const product of products) {
            const productInfo = await getProductInfo(product.ProductID);
            productsInfo.push(productInfo);
        }
        setProductsInfo(productsInfo);
    }

    useEffect(() => {
        fetchProductsInfo();
    }, [products]);



    return (
        <div className={'border rounded-2xl p-4'}>
            <h2 className={'text-lg font-main font-bold p-2'}>Order summary</h2>
            <div className={'flex flex-col'}>
                {productsInfo.map((product, index) => (
                    <OrderItem item={product} quantity={
                        products.filter(a => a.ProductID == product.ProductID)[0].Quantity
                    } key={index}/>
                ))}
            </div>
        </div>
    )
}
