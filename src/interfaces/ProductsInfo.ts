import IProduct from "./Product.ts";

export default interface ProductsInfo {
    [key: string]: IProduct[];
    bestsellers: IProduct[];
    newest: IProduct[];
    featured: IProduct[];
}