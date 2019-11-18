import { ProductApi } from "../../models/api/Product";
import { OfferGroupApi } from "../../models/api/OfferGroup";
import { Product_TagApi } from "../../models/Api/Product_Tag2";

import { Product_IngredientViewModel } from "../../models/ViewModels/Product_IngredientViewModel";
import { Product_AttributeGroupViewModel } from "../../models/ViewModels/Product_AttributeGroupViewModel";
import { Product_AttributeViewModel } from "./Product_AttributeViewModel";

export class ProductViewModel implements ProductApi {
	bid: number;
	name: string;
	title: string;
	description: string;
	shortDescription: string;
	price: number;
	picture: string;
	newUntilDate: string | Date;
	orderNumber: number;
	isActive: boolean;
	isArchived: boolean;
	Product_Tags: Product_TagApi[];
	OfferGroups: OfferGroupApi[];
	Product_AttributeGroups: Product_AttributeGroupViewModel[];
	Product_Ingredients: Product_IngredientViewModel[];

	public getDefaultPrice(): number {
		let sum = this.price;
		sum += this.Product_Ingredients.filter(a => a.isDefault).reduce((a, b) => a + b.price * b.amount, 0);
		sum += this.Product_AttributeGroups
			.reduce((a, b) => a.concat(b.Product_Attributes), [] as Product_AttributeViewModel[])
			.filter(a => a.isDefault).reduce((a, b) => a + b.price, 0);
		return sum;
	}

	public constructor(init?: Partial<ProductViewModel>) {
		Object.assign(this, init);
	}
}
