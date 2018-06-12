import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductApi } from 'models/api/Product';
import { Product_AttributeGroupApi } from 'models/api/Product_AttributeGroup';
import { Product_IngredientApi } from 'models/api/Product_Ingredient';
// import { List } from 'linqts';
import '../../utils/linqtsExtension';

@IonicPage()
@Component({
	selector: 'page-product-modal',
	templateUrl: 'product-modal.html',
})
export class ProductModalPage {
	product: ProductApi;
	attributeGroups: Product_AttributeGroupApi[];
	ingredients: Product_IngredientApi[];

	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}

	ngOnInit() {
		this.product = this.navParams.get('product');
		this.attributeGroups = this.product.Product_AttributeGroups.ToList()
			.Select(
			a => { a.Product_Attributes = a.Product_Attributes.ToList().OrderBy(b => b.price).ToArray(); return a; }
			)
			.ToArray();
		this.ingredients = this.product.Product_Ingredients.ToList().OrderBy(b => !b.isDefault).ThenBy(b => b.price).ToArray();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ProductModalPage');
	}

  closeProductModal() {
    this.navCtrl.pop();
  }
}
