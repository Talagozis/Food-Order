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

	open: boolean = false;

	constructor() {
	}

	ngOnInit() {
		console.log(this.offerGroup);

		if(this.offerGroup.Products.length == 1)
			this.onProductChange(this.offerGroup.Products[0].bid);

	}

	onProductChange(value: number) {
		this.selectedProduct = this.offerGroup.Products.find(a => a.bid == value);
		console.log(this.selectedProduct);
	}

	toggleSection() {
		this.open = !this.open;
	}


}
