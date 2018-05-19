import { TagLevel } from "./Product_tag";

export interface TagApi {
    bid: number;

    name: string;
    slug: string;
    description: string;
    picture: string;
    cover: string;
    color: string;

    maxLevel: TagLevel;
    productCount: number;
    storeCount: number;
}