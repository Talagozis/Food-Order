export class CartViewModel {
    storeBid: number;
    cartItems: CartItemViewModel[];
    cartItemOffers: CartItemOfferViewModel[];
}

export interface CartItemViewModel {
    bid: number;
    quantity: number;
    name: string;
    totalPrice: number;
    discount: number;
    info: string;
    identifier?: number;

    ingredients: {
        bid: number;
        name: string;
        has: boolean;
    }[];

    attributes: {
       bid: number;
       name: string;
       has: boolean;
    }[];
}

export interface CartItemOfferViewModel {
    bid: number;
    quantity: number;
    name: string;
    totalPrice: number;
    discount: number;
    info: string;
    identifier?: number;

    products: CartItemViewModel[];
}