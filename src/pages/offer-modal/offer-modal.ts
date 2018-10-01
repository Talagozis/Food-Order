import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { OfferGroupComponent } from "../../components/offer-group/offer-group";

import { OfferViewModel } from '../../models/ViewModels/OfferViewModel';
import { OfferGroupViewModel } from '../../models/ViewModels/OfferGroupViewModel';
import { CartProvider } from '../../providers/Cart/cart';

import '../../utils/linqtsExtension';


@IonicPage()
@Component({
	selector: 'page-offer-modal',
	templateUrl: 'offer-modal.html',
})
export class OfferModalPage {
	storeBid: number;
	offer: OfferViewModel;
	offerGroups: OfferGroupViewModel[];
	// attributeGroups: Product_AttributeGroupViewModel[];
	// ingredients: Product_IngredientViewModel[];
	quantity: number;
	info: string;
	finalPrice: number;

	constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private cartProvider: CartProvider) {
		this.offer = new OfferViewModel({ finalPrice: 0 });
	}

	ionViewDidLoad() {
		this.storeBid = this.navParams.get("storeBid") as number;

		this.quantity = 1;
		this.info = '';

		this.offer = this.navParams.get('offer') as OfferViewModel;

		this.finalPrice = this.offer.finalPrice;

		this.offerGroups = this.offer.OfferGroups.ToList()
			.Select(a => {
				a.Products = a.Products.ToList().OrderBy(b => b.orderNumber).ToArray();
				return a;
			}).ToArray();

		// this.attributeGroups = this.product.Product_AttributeGroups.ToList()
		// 	.Select(a => { a.Product_Attributes = a.Product_Attributes.ToList().OrderBy(b => b.price).ToArray(); return a; })
		// 	.ToArray();

		// this.ingredients = this.product.Product_Ingredients.ToList().OrderBy(b => !b.isDefault).ThenBy(b => b.price).ToArray();

		// for (let i = 0; i < this.attributeGroups.length; i++) {
		// 	if (this.attributeGroups[i].Product_Attributes.length > 0)
		// 		this.attributeGroups[i].selectedAttributeBid = this.attributeGroups[i].Product_Attributes[0].Ingredient.bid;
		// }

	}

	calculateTotalPrice(): number {
		let sum = 0;
		// sum += this.product.Product_Ingredients
		// 	.filter(i => i.isDefault)
		// 	.map(a => a.price)
		// 	.reduce((a,b) => a+b, 0);
		// sum += this.product.Product_AttributeGroups
		// 	.map(b => b.Product_Attributes
		// 	.filter(a => a.Ingredient.bid == b.selectedAttributeBid))
		// 	.reduce((a, b) => a.concat(b), [])
		// 	.map(a => a.price)
		// 	.reduce((a,b) => a+b, 0);
		// sum += this.product.price;
		// this.finalPrice = sum * this.quantity;
		return sum;
	}

	addToCart() {
		// var cartItem: CartItemViewModel = {
		// 	bid: this.product.bid,
		// 	name: this.product.name,
		// 	totalPrice: this.calculateTotalPrice(),
		// 	quantity: this.quantity,
		// 	discount: 0,
		// 	info: this.info,
		// 	ingredients: this.product.Product_Ingredients.map(a => ({
		// 		bid: a.Ingredient.bid,
		// 		name: a.Ingredient.name,
		// 		has: a.isDefault
		// 	})),
		// 	attributes: this.product.Product_AttributeGroups
		// 		.map(b => b.Product_Attributes.filter(a => a.Ingredient.bid == b.selectedAttributeBid))
		// 		.reduce((a, b) => a.concat(b), [])
		// 		.map(a => ({
		// 			bid: a.Ingredient.bid,
		// 			name: a.Ingredient.name,
		// 			has: true
		// 		})),
		// };

		// this.cartProvider.addCartItem(this.storeBid, cartItem);

		this.viewCtrl.dismiss({ isAdded: true });
	}

	changeQuantity(amount: number) {
		this.quantity += amount;
		this.quantity = Math.max(this.quantity, 1);
		this.calculateTotalPrice();
	}

	closeOfferModal() {
		this.viewCtrl.dismiss({ isAdded: false });
	}

}
