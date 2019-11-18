import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';

import { CartItemViewModel, CartItemOfferViewModel } from '../../models/ViewModels/CartViewModel';
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

	constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private cartProvider: CartProvider, private alertCtrl: AlertController) {
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

	handleCalculateTotalPrice(): number {
		const selectedProductTotalPrice = this.offerGroups.map(a => a.selectedTotalPrice).reduce((a, b) => a + b, 0);
		const sum = selectedProductTotalPrice - this.offer.discount;
		this.finalPrice = sum * this.quantity;

		return sum;
	}

	addToCart() {
		if (this.offerGroups.filter(a => !a.selectedProduct).length > 0) {
			this.presentAlert('Επιλέξτε τουλάχιστον ένα προϊόν.');
			return;
		}
		const cartItemOffer: CartItemOfferViewModel = {
			bid: this.offer.bid,
			name: this.offer.name,
			totalPrice: this.offer.totalPrice,
			finalPrice: this.handleCalculateTotalPrice(),
			quantity: this.quantity,
			discount: this.offer.discount,
			info: this.info,
			products: this.offer.OfferGroups.map(a => ({
				bid: a.selectedProduct.bid,
				name: a.selectedProduct.name,
				totalPrice: a.selectedTotalPrice,
				quantity: 1,
				discount: 0,
				info: this.info,
				ingredients: a.selectedProduct.Product_Ingredients.map(c => ({
					bid: c.Ingredient.bid,
					name: c.Ingredient.name,
					has: c.isDefault
				})),
				attributes: a.selectedProduct.Product_AttributeGroups
					.map(b => b.Product_Attributes.filter(c => c.Ingredient.bid === b.selectedAttributeBid))
					.reduce((c, d) => c.concat(d), [])
					.map(e => ({
						bid: e.Ingredient.bid,
						name: e.Ingredient.name,
						has: true
					})),
			}) as CartItemViewModel),

		};

		this.cartProvider.addCartItemOffer(this.storeBid, cartItemOffer);

		this.viewCtrl.dismiss({ isAdded: true });
	}

	changeQuantity(amount: number) {
		this.quantity += amount;
		this.quantity = Math.max(this.quantity, 1);
		this.handleCalculateTotalPrice();
	}

	closeOfferModal() {
		this.viewCtrl.dismiss({ isAdded: false });
	}

	presentAlert(message: string) {
		const alert = this.alertCtrl.create({
			title: 'Η προσθήκη στο καλάθι απέτυχε.',
			subTitle: message,
			buttons: ['OK'],
		});
		alert.present();
	}
}
