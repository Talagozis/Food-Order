import { IngredientApi } from "./Ingredient";
import { Product_AttributeGroupApi } from "./Product_AttributeGroup";

export interface Product_AttributeApi {
    price: number;

    Product_AttributeGroup: Product_AttributeGroupApi;

    Ingredient: IngredientApi;
}