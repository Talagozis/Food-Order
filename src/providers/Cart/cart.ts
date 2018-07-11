import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { CartViewModel, CartItemViewModel, CartItemOfferViewModel } from '../../models/ViewModels/CartViewModel';




@Injectable()
export class CartProvider {

	private CARTS_KEYWORD: string = "carts";


	constructor(private storage: Storage) { }


	public async get(): Promise<CartViewModel[]> {

		let carts: CartViewModel[] = await this.storage.get(this.CARTS_KEYWORD);

		carts = await this.validateCarts(carts);

		return carts;
	}

	public async getByStoreBid(storeBid: number): Promise<CartViewModel> {

		let carts: CartViewModel[] = await this.storage.get(this.CARTS_KEYWORD);

		let cart: CartViewModel = await this.validateCart(carts, storeBid);

		return cart;
	}


	public async addCartItem(storeBid: number, cartItem: CartItemViewModel): Promise<void> {

		let carts: CartViewModel[] = await this.storage.get(this.CARTS_KEYWORD);

		let cart: CartViewModel = await this.validateCart(carts, storeBid);

		cartItem.identifier = Math.floor((Math.random() * 1000) + 1);
		cart.cartItems.push(cartItem);
		carts = carts.filter((a: CartViewModel) => a.storeBid !== storeBid);
		carts.push(cart);

		await this.storage.set(this.CARTS_KEYWORD, carts);
	}

	public async clearCartItem(storeBid: number): Promise<void> {

		let carts: CartViewModel[] = await this.storage.get(this.CARTS_KEYWORD);

		let cart: CartViewModel = await this.validateCart(carts, storeBid);

		cart.cartItems = new Array<CartItemViewModel>();
		carts.push(cart);

		await this.storage.set(this.CARTS_KEYWORD, carts);
	}

	public async removeCartItem(storeBid: number, cartItem: CartItemViewModel): Promise<CartViewModel> {

		let carts: CartViewModel[] = await this.storage.get(this.CARTS_KEYWORD);

		let cart: CartViewModel = await this.validateCart(carts, storeBid);

		cart.cartItems = cart.cartItems.filter((a: CartItemViewModel) => a.identifier !== cartItem.identifier);
		carts = carts.filter((a: CartViewModel) => a.storeBid !== storeBid);
		carts.push(cart);

		await this.storage.set(this.CARTS_KEYWORD, carts);
		return cart;
	}


	public async addOfferDetails(storeBid: number, cartItemOffer: CartItemOfferViewModel): Promise<void> {

		let carts: CartViewModel[] = await this.storage.get(this.CARTS_KEYWORD);

		let cart: CartViewModel = await this.validateCart(carts, storeBid);

		cart.cartItemOffers.push(cartItemOffer);
		carts.push(cart);

		await this.storage.set(this.CARTS_KEYWORD, carts);
	}

	public async clearOffersDetails(storeBid: number): Promise<void> {

		let carts: CartViewModel[] = await this.storage.get(this.CARTS_KEYWORD);

		let cart: CartViewModel = await this.validateCart(carts, storeBid);

		cart.cartItemOffers = new Array<CartItemOfferViewModel>();
		carts.push(cart);

		await this.storage.set(this.CARTS_KEYWORD, carts);
	}


	private async validateCarts(carts: CartViewModel[]): Promise<CartViewModel[]> {

		if (!carts) {
			console.debug("Carts from storage was undefined or null. It is created now.");
			carts = new Array<CartViewModel>();
			await this.storage.set(this.CARTS_KEYWORD, carts);
		}

		return carts;
	}

	private async validateCart(carts: CartViewModel[], storeBid: number): Promise<CartViewModel> {

		carts = await this.validateCarts(carts);

		var cart = carts.find(a => a.storeBid === storeBid);

		if (!cart) {
			console.log("No cart for this store. It is created now.");

			cart = {
				storeBid: storeBid,
				cartItems: new Array<CartItemViewModel>(),
				cartItemOffers: new Array<CartItemOfferViewModel>(),
			};
			carts.push(cart);
			await this.storage.set(this.CARTS_KEYWORD, carts);
		}

		return cart;
	}


}
