import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Cart } from '../../models/Entities/Cart';
import { CartItem } from 'models/Api/CartItem';


@Injectable()
export class CartProvider {

	constructor(private storage: Storage) { }


	public get(): Promise<Cart[]> {

		return this.storage.get("carts").then((carts: Cart[]) => {
			return carts;

		});

	}

	// public getByStoreBid(bid: number): Cart {
	// 	return this.api.getOne('product', bid)
	// }

	public AddCartItem(cartImte: CartItem): void {

	}

}
