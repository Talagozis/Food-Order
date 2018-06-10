import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductApi } from 'models/api/Product';
import { Product_AttributeGroupApi } from 'models/api/Product_AttributeGroup';
import { Product_IngredientApi } from 'models/api/Product_Ingredient';
import { List } from 'linqts';
import { Product_AttributeApi } from '../../models/api/Product_Attribute';

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
    this.attributeGroups = new List<Product_AttributeGroupApi>(this.product.Product_AttributeGroups)
      .Select(
        a => { a.Product_Attributes = new List<Product_AttributeApi>(a.Product_Attributes).OrderBy(b => b.price).ToArray(); return a; }
      )
      .ToArray();
    this.ingredients = new List<Product_IngredientApi>(this.product.Product_Ingredients).OrderBy(b => !b.isDefault).ThenBy(b => b.price).ToArray();
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductModalPage');
  }

  closeProductModal() {
    this.navCtrl.pop();
  }
}
