export interface CartItem {
    bid: number;
    quantity: number;
    name: string;
    totalPrice: number;
    discount: number;
    info: string;

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