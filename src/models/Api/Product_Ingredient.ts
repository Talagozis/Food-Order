import { ProductApi } from "./Product";
import { IngredientApi } from "./Ingredient";

export interface Product_IngredientApi {
    price: number;
    isDefault: boolean;

    Product: ProductApi;

    Ingredient: IngredientApi;
}