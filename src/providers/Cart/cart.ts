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

		cartItem.identifier = this.generateIdentifier();

		cart.cartItems.push(cartItem);

		await this.addOrUpdateCart(carts, cart);
	}

	public async clearCartItem(storeBid: number): Promise<void> {

		let carts: CartViewModel[] = await this.storage.get(this.CARTS_KEYWORD);
		let cart: CartViewModel = await this.validateCart(carts, storeBid);

		cart.cartItems = new Array<CartItemViewModel>();

		await this.addOrUpdateCart(carts, cart);
	}

	public async removeCartItem(storeBid: number, cartItem: CartItemViewModel): Promise<CartViewModel> {

		let carts: CartViewModel[] = await this.storage.get(this.CARTS_KEYWORD);
		let cart: CartViewModel = await this.validateCart(carts, storeBid);

		cart.cartItems = cart.cartItems.filter((a: CartItemViewModel) => a.identifier !== cartItem.identifier);

		return await this.addOrUpdateCart(carts, cart);
	}


	public async addCartItemOffer(storeBid: number, cartItemOffer: CartItemOfferViewModel): Promise<void> {

		let carts: CartViewModel[] = await this.storage.get(this.CARTS_KEYWORD);
		let cart: CartViewModel = await this.validateCart(carts, storeBid);

		cartItemOffer.identifier = this.generateIdentifier();

		cart.cartItemOffers.push(cartItemOffer);

		await this.addOrUpdateCart(carts, cart);
	}

	public async clearCartItemOffer(storeBid: number): Promise<void> {

		let carts: CartViewModel[] = await this.storage.get(this.CARTS_KEYWORD);
		let cart: CartViewModel = await this.validateCart(carts, storeBid);

		cart.cartItemOffers = new Array<CartItemOfferViewModel>();

		await this.addOrUpdateCart(carts, cart);
	}

	public async removeCartItemOffer(storeBid: number, cartItemOffer: CartItemOfferViewModel): Promise<CartViewModel> {

		let carts: CartViewModel[] = await this.storage.get(this.CARTS_KEYWORD);
		let cart: CartViewModel = await this.validateCart(carts, storeBid);

		cart.cartItemOffers = cart.cartItemOffers.filter((a: CartItemOfferViewModel) => a.identifier !== cartItemOffer.identifier);

		return await this.addOrUpdateCart(carts, cart);
	}


	public async clearCarts(): Promise<void> {

		let carts: CartViewModel[] = new Array<CartViewModel>();

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
			console.debug("No cart for this store. It is created now.");

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


	private async addOrUpdateCart(carts: CartViewModel[], cart: CartViewModel): Promise<CartViewModel> {
		carts = carts.filter((a: CartViewModel) => a.storeBid !== cart.storeBid);
		carts.push(cart);

		await this.storage.set(this.CARTS_KEYWORD, carts);

		return cart;
	}


	private generateIdentifier(): number {
		return Math.floor((Math.random() * 1000) + 1);
	}
}
