import { ProductViewModel } from "./ProductViewModel";

export class CategoryViewModel {
	key: string;
	open: boolean;
	product: ProductViewModel[];
	orderNumber?: number;

	public constructor(init?: Partial<CategoryViewModel>) {
		Object.assign(this, init);
	}
}
