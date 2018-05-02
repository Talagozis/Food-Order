import { Product_TagApi } from "./Product_tag";
import { OfferGroupApi } from "./OfferGroup";
import { Product_IngredientApi } from "./Product_Ingredient";
import { Product_AttributeGroupApi } from "./Product_AttributeGroup";

export interface ProductApi {
    bid: number;

    name: string;
    title: string;
    description: string;
    shortDescription: string;
    price: number;
    picture: string;
    newUntilDate: Date | string | null;
    orderNumber: number | null;
    isActive: boolean;
    isArchived: boolean;

    Product_Tags: Product_TagApi[];

    OfferGroups: OfferGroupApi[];

    Product_AttributeGroups: Product_AttributeGroupApi[];

    Product_Ingredients: Product_IngredientApi[];
}