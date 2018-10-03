import { Component, Input, Output, EventEmitter } from '@angular/core';

import { OfferGroupViewModel } from '../../models/ViewModels/OfferGroupViewModel';
import { ProductViewModel } from '../../models/ViewModels/ProductViewModel';


@Component({
	selector: 'offer-group',
	templateUrl: 'offer-group.html',
})
export class OfferGroupComponent {

	@Input()
	offerGroup: OfferGroupViewModel;

	@Output() onCalculateTotalPrice: EventEmitter<any> = new EventEmitter();
	// @Input()
	// onCalculateTotalPrice: () => number;

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

	handleCalculateTotalPrice() {
		if(this.onCalculateTotalPrice)
			this.onCalculateTotalPrice.emit();
	}

}
