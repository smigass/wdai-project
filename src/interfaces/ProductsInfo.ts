import IProduct from "./Product.ts";

export default interface ProductsInfo {
    [key: string]: IProduct[];
    bestSellers: IProduct[];
    newest: IProduct[];
    featured: IProduct[];
}