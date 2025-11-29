import { ProductColor, ProductSize } from "./ProductType"

export type CartItemType = {
    id: number,
    user_id: number,
    product_id: number,
    color: ProductColor,
    size: ProductSize,
    quantity: number
}