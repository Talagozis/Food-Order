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

	open: boolean = false;

	constructor() {
	}

	ngOnInit() {
		console.log(this.offerGroup);

		this.offerGroup.Products.forEach(p => {
			p.Product_Ingredients = p.Product_Ingredients.sort((a,b) => a.isDefault > b.isDefault ? -1 : 1);
			p.Product_AttributeGroups.forEach(ag => {
				ag.Product_Attributes = ag.Product_Attributes.sort((a,b) => a.price < b.price ? -1 : 1);
			});
		});


		this.offerGroup.selectedTotalPrice = this.calculateTotalPrice();
		if(this.offerGroup.Products.length == 1)
			this.onProductChange(this.offerGroup.Products[0].bid);

	}

	onProductChange(value: number) {
		this.offerGroup.selectedProduct = this.offerGroup.Products.find(a => a.bid == value);
		console.log(this.offerGroup.selectedProduct);
	}

	toggleSection() {
		this.open = !this.open;
	}

	handleCalculateTotalPrice() {
		this.offerGroup.selectedTotalPrice = this.calculateTotalPrice();
		if(this.onCalculateTotalPrice)
			this.onCalculateTotalPrice.emit();
	}

	calculateTotalPrice(): number {
		let sum = 0;
		if (this.offerGroup.selectedProduct) {
			sum += this.offerGroup.selectedProduct.Product_Ingredients
				.filter(i => i.isDefault)
				.map(a => a.price)
				.reduce((a,b) => a+b, 0);
			sum += this.offerGroup.selectedProduct.Product_AttributeGroups
				.map(b => b.Product_Attributes
				.filter(a => a.Ingredient.bid == b.selectedAttributeBid))
				.reduce((a, b) => a.concat(b), [])
				.map(a => a.price)
				.reduce((a,b) => a+b, 0);
			sum += this.offerGroup.selectedProduct.price;
		} else {
			sum += Math.min.apply(null, this.offerGroup.Products.map(a => a.price)) || 0;
		}
		
		return sum;
	}

}
