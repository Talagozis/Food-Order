import { ProductViewModel } from "../../models/ViewModels/ProductViewModel";

export class CartViewModel {
    storeBid: number;
    cartItems: CartItemViewModel[];
    cartItemOffers: CartItemOfferViewModel[];

    public constructor(init?: Partial<CartViewModel>) {
        Object.assign(this, init);
    }

    getCartItemOffersProducts(): ProductViewModel[] {
        return this.cartItemOffers.reduce((a, b) => a.concat(b.products), []) as ProductViewModel[];
    }
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
    finalPrice: number;
    discount: number;
    info: string;
    identifier?: number;

    products: CartItemViewModel[];
}