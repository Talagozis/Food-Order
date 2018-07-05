import { IngredientApi } from "../../models/api/Ingredient";

export class IngredientViewModel implements IngredientApi {
	bid: number;
	name: string;
	description: string;
	numberOfIngredients: number;
	numberOfAttributes: number;
}