import { OfferGroupApi } from "../Api/OfferGroup";
import { OfferViewModel } from "./OfferViewModel";
import { ProductViewModel } from "./ProductViewModel";

export class OfferGroupViewModel implements OfferGroupApi {
    bid: number;
    description: string;
    Offer: OfferViewModel;
    Products: ProductViewModel[];

    selectedProduct?: ProductViewModel;

    public constructor(init?: Partial<OfferGroupViewModel>) {
        Object.assign(this, init);
    }

    
    // public showPrice(): boolean	{
    // 	return this.Product_Attributes.map(a => a.price).reduce((a, b) => a + b) > 0;
    // }

}
