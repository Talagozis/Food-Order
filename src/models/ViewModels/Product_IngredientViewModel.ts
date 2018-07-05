import { Product_IngredientApi } from "../../models/api/Product_Ingredient";
import { ProductViewModel } from "../../models/ViewModels/ProductViewModel";
import { IngredientViewModel } from "../../models/ViewModels/IngredientViewModel";

export class Product_IngredientViewModel implements Product_IngredientApi {
	price: number;
	isDefault: boolean;
	Product: ProductViewModel;
	Ingredient: IngredientViewModel;

	public constructor(init?: Partial<Product_IngredientViewModel>) {
        Object.assign(this, init);
	}
	
}