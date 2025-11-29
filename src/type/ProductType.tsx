export type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
    category_id: number;
}

export enum ProductSize {
    S = "S", M = "M", L = "L", XL = "XL"
}

export enum ProductColor {
    BLACK = "black", GRAY = "gray", BROWN = "brown"
}