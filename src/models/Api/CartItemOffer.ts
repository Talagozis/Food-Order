export interface CartItemOffer {
    bid: number;
    quantity: number;
    name: string;
    totalPrice: number;
    discount: number;
    info: string;

    products: {
        bid: number;
        name: string;
        has: boolean;
        ingredients: {
            bid: number;
            name: string;
            has: boolean;
        }[];
        attributeGroups: {
            bid: number;
            attributes: {
                bid: number;
                name: string;
                has: boolean;
            }[];
        }[];
    }[];
}