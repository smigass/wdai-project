import IProduct from "./Product.ts";

export default interface ProductsInfo {
    bestSellers: IProduct[];
    newest: IProduct[];
    featured: IProduct[];
}