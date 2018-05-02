import { ProductApi } from "./Product";
import { TagApi } from "./Tag";

export interface Product_TagApi {
    level: TagLevel;

    Product: ProductApi;
    Tag: TagApi;
}

export enum TagLevel {
    None = 0,
    Tag = 1,
    Category = 2,
    Cuisine = 3,
}