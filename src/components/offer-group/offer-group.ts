import { Component, Input } from '@angular/core';

import { OfferGroupViewModel } from '../../models/ViewModels/OfferGroupViewModel';
import { ProductViewModel } from '../../models/ViewModels/ProductViewModel';


@Component({
	selector: 'offer-group',
	templateUrl: 'offer-group.html',
})
export class OfferGroupComponent {

	@Input()
	offerGroup: OfferGroupViewModel;
	selectedProduct: ProductViewModel;

	constructor() {
	}

	ionViewDidLoad() {
		console.log(this.offerGroup);
	}

	onProductChange(value: number) {
		this.selectedProduct = this.offerGroup.Products.find(a => a.bid == value);
		console.log(this.selectedProduct);
	}




}
