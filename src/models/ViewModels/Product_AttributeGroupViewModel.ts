import { Product_AttributeGroupApi } from "../../models/api/Product_AttributeGroup";
import { ProductViewModel } from "../../models/ViewModels/ProductViewModel";
import { Product_AttributeViewModel } from "../../models/ViewModels/Product_AttributeViewModel";

export class Product_AttributeGroupViewModel implements Product_AttributeGroupApi {
	bid: number;
	description: string;
	Product: ProductViewModel;
	Product_Attributes: Product_AttributeViewModel[];
	selectedAttributeBid?: number;

}
