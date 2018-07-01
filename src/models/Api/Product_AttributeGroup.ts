import { ProductApi } from "./Product";
import { Product_AttributeApi } from "./Product_Attribute";

export interface Product_AttributeGroupApi {
    bid: number;
    description: string;

    Product: ProductApi;

    Product_Attributes: Product_AttributeApi[];
    selectedAttributeBid?: number;
}