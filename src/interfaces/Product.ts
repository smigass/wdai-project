export default interface IProduct {
    id: number
    title: string
    price: number
    imgsrc: string
    category_number: number
    description: string
    ratings: [{rating: number, comment: string}]
    stock: number

}