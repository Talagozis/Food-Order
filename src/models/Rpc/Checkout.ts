import { StoreApi } from "../../models/api/Store";
import { AspNetUserApi } from "../../models/Api/AspNetUser";

export interface CheckoutRpc {
    Store: StoreApi;
    AspNetUser: AspNetUserApi;
    date: Date;
    orderDetails: OrderDetails;
    productsDetails: ProductDetails[];
    offersDetails: OfferDetails[];
    sessionDetals: SessionDetails[];
}

export interface OrderDetails {
    customerForename: string;
    customerSurname: string;
    customerFullname: string;
    customerAddressLine: string;
    customerFloorNumber: string;
    customerDoorName: string;
    customerPhoneNumber: string;
    customerPhoneNumberConfirm: string;
    isTakeAway: boolean;
    info: string;
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
