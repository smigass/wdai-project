export default interface IProduct {
    ProductID: number
    Name: string
    Price: number
    Image: string
    CategoryID: number
    Description: string
    ratings: [{rating: number, comment: string}]
    InStock: number
}