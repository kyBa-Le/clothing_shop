import { ProductColor, ProductSize } from "./ProductType"

export type OrderType = {
    id: number,
    name: string,
    product_id: number,
    user_id: number,
    size: ProductSize,
    color: ProductColor,
    status: string,
    date: string,
    quantity: number,
    total: number,
    address: string
}