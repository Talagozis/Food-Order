import { Checkout, OrderDetails, OrderDeliveryType, SessionDetails, PaymentDetails } from "../../models/Entities/Checkout";
import { CartViewModel, CartItemViewModel, CartItemOfferViewModel, CartItemAttributeViewModel, CartItemIngredientViewModel, CartItemOfferGroupViewModel } from "../../models/ViewModels/CartViewModel";
import { StoreDetails, AspNetUserDetails, ProductDetails, OfferDetails, AttributeDetails, IngredientDetails } from "../../models/Entities/Cart";

export class CheckoutRpc implements Checkout {
	deliveryType: OrderDeliveryType;

	Store: StoreDetails;
	AspNetUser: AspNetUserDetails;

	productsDetails: ProductDetails[];
	offersDetails: OfferDetails[];

	orderDetails: OrderDetails;
	sessionDetails: SessionDetails;
	paymentDetails: PaymentDetails;

	public constructor(cart: CartViewModel) {
		this.Store = {
			bid: cart.storeBid
		} as StoreDetails;

		this.productsDetails = cart.cartItems.map((cartItem: CartItemViewModel) => ({
			bid: cartItem.bid,
			info: cartItem.info,
			amount: cartItem.quantity,
			attributesDetails: cartItem.attributes.map((cartItemAttribute: CartItemAttributeViewModel) => ({
				bid: cartItemAttribute.bid,
				has: cartItemAttribute.has
			}) as AttributeDetails),
			ingredientsDetails: cartItem.ingredients.map((cartItemIngredient: CartItemIngredientViewModel) => ({
				bid: cartItemIngredient.bid,
				has: cartItemIngredient.has,
				amount: cartItemIngredient.amount,
			}) as IngredientDetails),
		}) as ProductDetails);

		this.offersDetails = cart.cartItemOffers.map((cartItemOffer: CartItemOfferViewModel) => ({
			bid: cartItemOffer.bid,
			info: cartItemOffer.info,
			amount: cartItemOffer.quantity,
			productsDetails: cartItemOffer.offerGroups.map((cartItemOfferGroup: CartItemOfferGroupViewModel) => ({
				bid: cartItemOfferGroup.product.bid,
				info: cartItemOfferGroup.product.info,
				amount: cartItemOfferGroup.product.quantity,
				attributesDetails: cartItemOfferGroup.product.attributes.map((cartItemAttribute: CartItemAttributeViewModel) => ({
					bid: cartItemAttribute.bid,
					has: cartItemAttribute.has
				}) as AttributeDetails),
				ingredientsDetails: cartItemOfferGroup.product.ingredients.map((cartItemIngredient: CartItemIngredientViewModel) => ({
					bid: cartItemIngredient.bid,
					has: cartItemIngredient.has,
					amount: cartItemIngredient.amount,
				}) as IngredientDetails),
			}) as ProductDetails)
		}) as OfferDetails);

	}

}
