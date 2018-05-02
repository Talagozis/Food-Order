import { OfferApi } from "./Offer";
import { ProductApi } from "./Product";

    export interface OfferGroupApi {
        bid: number;
        description: string;

        Offer: OfferApi;

        Products: ProductApi[];
    }