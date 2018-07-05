import { Product_AttributeGroupApi } from "../../models/api/Product_AttributeGroup";
import { ProductViewModel } from "../../models/ViewModels/ProductViewModel";
import { Product_AttributeViewModel } from "../../models/ViewModels/Product_AttributeViewModel";

export class Product_AttributeGroupViewModel implements Product_AttributeGroupApi {
	bid: number;
	description: string;
	Product: ProductViewModel;
	Product_Attributes: Product_AttributeViewModel[];
	selectedAttributeBid?: number;

    public constructor(init?: Partial<Product_AttributeGroupViewModel>) {
        Object.assign(this, init);
    }

	public showPrice(): boolean	{
		return this.Product_Attributes.map(a => a.price).reduce((a, b) => a + b) > 0;
	}

}
