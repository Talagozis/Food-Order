import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import '../../utils/linqtsExtension';

import { ProductApi } from '../../models/api/Product';
import { ProductViewModel } from '../../models/ViewModels/ProductViewModel';
import { Product_IngredientViewModel } from '../../models/ViewModels/Product_IngredientViewModel';
import { Product_AttributeGroupViewModel } from '../../models/ViewModels/Product_AttributeGroupViewModel';
import { Product_AttributeViewModel } from '../../models/ViewModels/Product_AttributeViewModel';
import { CartProvider } from '../../providers/Cart/cart';
import { CartItemViewModel } from '../../models/ViewModels/CartViewModel';

@IonicPage()
@Component({
	selector: 'page-product-modal',
	templateUrl: 'product-modal.html',
})
export class ProductModalPage {
	storeBid: number;
	product: ProductViewModel;
	attributeGroups: Product_AttributeGroupViewModel[] = [];
	ingredients: Product_IngredientViewModel[] = [];
	quantity: number;
	info: string;
	totalPrice: number;

	constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private cartProvider: CartProvider) {
		this.product = new ProductViewModel({ picture: "", price: 0 });
	}

	ionViewDidLoad() {
		this.storeBid = this.navParams.get("storeBid") as number;

		this.quantity = 1;
		this.info = '';

		const productApi: ProductApi = this.navParams.get('product') as ProductApi;

		this.product = new ProductViewModel({
			...productApi,
			Product_AttributeGroups: productApi.Product_AttributeGroups.map(a => new Product_AttributeGroupViewModel({
				...a,
				Product: null,
				Product_Attributes: a.Product_Attributes.map(b => new Product_AttributeViewModel({
					...b,
					Product_AttributeGroup: null
				})),
			})),
			Product_Ingredients: productApi.Product_Ingredients.map(a => new Product_IngredientViewModel({
				...a,
				Product: null,
			})),
		});
		this.totalPrice = this.product.getDefaultPrice();

		// Prepare order and selection
		this.attributeGroups = this.product.Product_AttributeGroups.ToList()
			.Select(a => { a.Product_Attributes = a.Product_Attributes.ToList().OrderByDescending(b => b.isDefault).ThenBy(b => b.price).ToArray(); return a; })
			.ToArray();

		this.ingredients = this.product.Product_Ingredients.ToList().OrderBy(b => !b.isDefault).ThenBy(b => b.price).ToArray();

		for (let i = 0; i < this.attributeGroups.length; i++) {
			if (this.attributeGroups[i].Product_Attributes.length > 0) {
				this.attributeGroups[i].selectedAttributeBid = this.attributeGroups[i].Product_Attributes[0].Ingredient.bid;
			}
		}

	}

	calculateTotalPrice(): number {
		let sum = 0;
		sum += this.product.Product_Ingredients
			// .filter(i => i.isDefault)
			.map(a => a.isDefault ? Math.max(a.price * (a.amount - 1), 0) : a.price * a.amount)
			.reduce((a, b) => a + b, 0);
		sum += this.product.Product_AttributeGroups
			.map(b => b.Product_Attributes
				.filter(a => a.Ingredient.bid === b.selectedAttributeBid))
			.reduce((a, b) => a.concat(b), [])
			.reduce((a, b) => a + b.price, 0);
		sum += this.product.price;

		this.totalPrice = sum * this.quantity;
		return sum;
	}

	async addToCart() {
		const cartItem: CartItemViewModel = {
			bid: this.product.bid,
			name: this.product.name,
			totalPrice: this.calculateTotalPrice(),
			quantity: this.quantity,
			discount: 0,
			info: this.info,
			ingredients: this.product.Product_Ingredients.map(a => ({
				bid: a.Ingredient.bid,
				name: a.Ingredient.name,
				amount: a.amount,
				has: a.isDefault,
			})),
			attributes: this.product.Product_AttributeGroups
				.map(b => b.Product_Attributes.filter(a => a.Ingredient.bid === b.selectedAttributeBid))
				.reduce((a, b) => a.concat(b), [])
				.map(a => ({
					bid: a.Ingredient.bid,
					name: a.Ingredient.name,
					has: true
				})),
		};

		await this.cartProvider.addCartItem(this.storeBid, cartItem);

		await this.viewCtrl.dismiss({ isAdded: true });
	}

	changeQuantity(amount: number) {
		this.quantity += amount;
		this.quantity = Math.max(this.quantity, 1);
		this.calculateTotalPrice();
	}

	async closeProductModal() {
		await this.viewCtrl.dismiss({ isAdded: false });
	}
}
