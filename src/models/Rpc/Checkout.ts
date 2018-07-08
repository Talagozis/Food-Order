import { Checkout, OrderDetails } from "../../models/Entities/Checkout";
import { CartViewModel, CartItemViewModel, CartItemOfferViewModel } from "../../models/ViewModels/CartViewModel";
import { StoreDetails, AspNetUserDetails, ProductDetails, OfferDetails } from "../../models/Entities/Cart";

export class CheckoutRpc implements Checkout {
    date: Date;
    orderDetails: OrderDetails;
    Store: StoreDetails;
    AspNetUser: AspNetUserDetails;
    productsDetails: ProductDetails[];
    offersDetails: OfferDetails[];
    sessionDetals: SessionDetails

    public constructor(cart: CartViewModel) {
        this.date = new Date();
        this.Store = {
            bid: cart.storeBid
        };

        this.productsDetails = cart.cartItems.map((cartItem: CartItemViewModel) => ({
            ...cartItem,
            amount: cartItem.quantity,
            attributesDetails: cartItem.attributes,
            ingredientsDetails: cartItem.ingredients,
        }) as ProductDetails);
        
        this.offersDetails = cart.cartItemOffers.map((cartItemOffer: CartItemOfferViewModel) => ({
            ...cartItemOffer,
            amount: cartItemOffer.quantity,
            productsDetails: cartItemOffer.products.map((cartItem: CartItemViewModel) => ({
                ...cartItem,
                amount: cartItem.quantity,
                attributesDetails: cartItem.attributes,
                ingredientsDetails: cartItem.ingredients,
            }) as ProductDetails)
        }) as OfferDetails);

    }

}

export interface SessionDetails {
}
