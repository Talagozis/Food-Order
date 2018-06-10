import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StoreApi } from 'models/Api/Store';
import { StoreProvider } from '../../providers/store/store';
import { ProductApi } from '../../models/api/Product';
import { List } from 'linqts';

@IonicPage()
@Component({
	selector: 'page-store',
	templateUrl: 'store.html',
})
export class StorePage {
	storeSegment: string = "catalog";
	store: StoreApi;
	categories: any[];

	constructor(public navCtrl: NavController, public navParams: NavParams, public storeProvider: StoreProvider) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad StorePage');
	}

	ngOnInit() {
		this.getStore();
	}

	getStore(): void {
		var storeId = this.navParams.get('storeId');
		this.storeProvider.findOne(storeId).subscribe(
			s => {
				this.store = s;
				var p = new List<ProductApi>(s.Products);
				p = p.Where(a => a.isActive);
				p = p.Where(a => a.Product_Tags.filter(b => b.level === 2 || b.level === 3).length > 0);
				p = p.OrderBy(a => a.orderNumber);
				var categories = p.GroupBy(
					a => a.Product_Tags
						.filter(b => b.level === 2 || b.level === 3)
						.sort(b => b.level === 3 ? 1 : b.level === 2 ? -1 : 0)[0].Tag.name, b => b
					);
				this.categories = Object.keys(categories).map(function(tagName){
					let category = categories[tagName]
						.sort((a, b) => a.orderNumber === null || (b.orderNumber !== null && a.orderNumber > b.orderNumber) ? 1 : -1);
					category.key = tagName;
					return category;
				});
				// console.log(this.categories);
			}
		);
	}
}