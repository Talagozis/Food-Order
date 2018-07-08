import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { CartViewModel, CartItemViewModel, CartItemOfferViewModel } from '../../models/ViewModels/CartViewModel';




@Injectable()
export class CartProvider {

	constructor(private storage: Storage) { }

	private get(): Promise<CartViewModel[]> {
		return this.storage.get("carts").then((carts: CartViewModel[]) => {

			if (!carts) {
				console.debug("Carts from storage was undefined or null. It is created now.");
				carts = new Array<CartViewModel>();
			}

			return carts;
		});

	}

	public getByStoreBid(storeBid: number): Promise<CartViewModel> {
		return this.get().then((carts: CartViewModel[]) => {

			var cart = carts.find(a =>a.storeBid === storeBid);
			if (!cart) {
				console.log("No cart for this store. It is created now.");
				cart = {
					storeBid: storeBid,
					cartItems: new Array<CartItemViewModel>(),
					cartItemOffers: new Array<CartItemOfferViewModel>(),
				}
			}

			return cart;
		});
	}

	public addCartItem(storeBid: number, cartItem: CartItemViewModel): void {
		this.getByStoreBid(storeBid).then((cart: CartViewModel) => {
			cart.cartItems.push(cartItem);
		});
	}

	public clearCartItem(storeBid: number): void {
		this.getByStoreBid(storeBid).then((cart: CartViewModel) => {
			cart.cartItems = new Array<CartItemViewModel>();
		});
	}

	public addOfferDetails(storeBid: number, cartItemOffer: CartItemOfferViewModel): void {
		this.getByStoreBid(storeBid).then((cart: CartViewModel) => {
			cart.cartItemOffers.push(cartItemOffer);
		});
	}

	public clearOffersDetails(storeBid: number): void {
		this.getByStoreBid(storeBid).then((cart: CartViewModel) => {
			cart.cartItemOffers = new Array<CartItemOfferViewModel>();
		});
	}

}
