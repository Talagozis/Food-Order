export class Cart {
    Store: StoreDetails;
    AspNetUser: AspNetUserDetails;
    productsDetails: ProductDetails[];
    offersDetails: OfferDetails[];
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

export interface StoreDetails {
    bid: number;
}

export interface AspNetUserDetails {
    bid: number;
}