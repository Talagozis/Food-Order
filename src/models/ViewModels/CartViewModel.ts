export class CartViewModel {
	storeBid: number;
	cartItems: CartItemViewModel[];
	cartItemOffers: CartItemOfferViewModel[];

	public constructor(init?: Partial<CartViewModel>) {
		Object.assign(this, init);
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

	ingredients: CartItemIngredientViewModel[];

	attributes: CartItemAttributeViewModel[];
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

	offerGroups: CartItemOfferGroupViewModel[];
}

export interface CartItemOfferGroupViewModel {
	bid: number;
	product: CartItemViewModel;
}

export interface CartItemAttributeViewModel {
	bid: number;
	name: string;
	has: boolean;
}

export interface CartItemIngredientViewModel {
	bid: number;
	name: string;
	has: boolean;
	amount: number;
}
