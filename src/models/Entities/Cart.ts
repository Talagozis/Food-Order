import { StoreApi } from "../../models/api/Store";
import { AspNetUserApi } from "../../models/Api/AspNetUser";

export interface Cart {
    Store: StoreApi;
    AspNetUser: AspNetUserApi;
    productsDetails: ProductDetails[];
    offersDetails: OfferDetails[];
    sessionDetals: SessionDetails[];
}


export interface OfferDetails {
    bid: number;
    amount: number;
    info: string;
    productsDetails: ProductDetails[];
}

export interface ProductDetails {
    bid: number;
    amount: number;
    info: string;
    ingredientsDetails: IngredientDetails[];
    attributesDetails: AttributeDetails[];
}
export interface IngredientDetails {
    bid: number;
    has: boolean;
}
export interface AttributeDetails {
    bid: number;
    has: boolean;
}

export interface SessionDetails {
}
