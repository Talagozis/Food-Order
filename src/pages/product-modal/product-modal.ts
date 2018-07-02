import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductApi } from 'models/api/Product';
import { Product_AttributeGroupApi } from 'models/api/Product_AttributeGroup';
import { Product_IngredientApi } from 'models/api/Product_Ingredient';
import '../../utils/linqtsExtension';
import { CartItem } from 'models/Api/CartItem';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
	selector: 'page-product-modal',
	templateUrl: 'product-modal.html',
})
export class ProductModalPage {
	product: ProductApi;
	attributeGroups: Product_AttributeGroupApi[];
	ingredients: Product_IngredientApi[];
	quantity: number;
	info: string;

	constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
		this.quantity = 1;
		this.info = '';

		this.product = this.navParams.get('product');
		this.attributeGroups = this.product.Product_AttributeGroups.ToList()
			.Select(a => { a.Product_Attributes = a.Product_Attributes.ToList().OrderBy(b => b.price).ToArray(); return a; })
			.ToArray();
		this.ingredients = this.product.Product_Ingredients.ToList().OrderBy(b => !b.isDefault).ThenBy(b => b.price).ToArray();

		for (let i = 0; i < this.attributeGroups.length; i++) {
			if(this.attributeGroups[i].Product_Attributes.length > 0)
				this.attributeGroups[i].selectedAttributeBid = this.attributeGroups[i].Product_Attributes[0].Ingredient.bid;
		}

	}

	ngOnInit() {

	}

	ionViewDidLoad() {
		// console.log('ionViewDidLoad ProductModalPage');
	}

	addToCart() {
		var cartItem: CartItem = {
			bid: this.product.bid,
			quantity: this.quantity,
			name: this.product.name,
			totalPrice: 0,
			discount: 0,
			info: this.info,
			ingredients: this.product.Product_Ingredients.map(a => ({
				bid: a.Ingredient.bid,
				name: a.Ingredient.name,
				has: a.isDefault
			})),
			attributes: this.product.Product_AttributeGroups
				.map(b => b.Product_Attributes.filter(a => a.Ingredient.bid == b.selectedAttributeBid))
				.reduce((a, b) => a.concat(b))
				.map(a => ({
					bid: a.Ingredient.bid,
					name: a.Ingredient.name,
					has: true
				})),
		};
		console.log(cartItem);

		this.storage.get('cart').then((c: CartItem[]) => {
			if (c === null)
				c = [];

			c.push(cartItem);
			this.storage.set('cart', c);
		});
	}

	closeProductModal() {
		this.navCtrl.pop();
	}
}
