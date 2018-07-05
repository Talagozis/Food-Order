import { Product_AttributeApi } from "../../models/api/Product_Attribute";
import { Product_AttributeGroupViewModel } from "../../models/ViewModels/Product_AttributeGroupViewModel";
import { IngredientViewModel } from "../../models/ViewModels/IngredientViewModel";

export class Product_AttributeViewModel implements Product_AttributeApi {
	price: number;
	Product_AttributeGroup: Product_AttributeGroupViewModel;
	Ingredient: IngredientViewModel;

	public constructor(init?: Partial<Product_AttributeViewModel>) {
        Object.assign(this, init);
	}
	
}