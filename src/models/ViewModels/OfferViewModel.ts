import { OfferApi, OfferLevel } from "../../models/api/Offer";
import { ActiveHourApi } from "../../models/Api/ActiveHour";
import { OfferSchedulerApi } from "../../models/Api/OfferSchedulerApi";
import { StoreApi } from "../../models/Api/Store";
import { OfferGroupViewModel } from "./OfferGroupViewModel";

export class OfferViewModel implements OfferApi {
    bid: number;
    name: string;
    description: string;
    shortDescription: string;
    level: OfferLevel;
    totalPrice: number;
    discount: number;
    finalPrice: number;
    picture: string;
    newUntilDate: string | Date;
    orderNumber: number;
    isActive: boolean;
    isArchived: boolean;
    info: string;
    OfferGroups: OfferGroupViewModel[];
    ActiveHours: ActiveHourApi[];
    OfferSchedulers: OfferSchedulerApi[];
    Store: StoreApi;


    public constructor(init?: Partial<OfferViewModel>) {
        Object.assign(this, init);
    }

    public getCurrentOfferScheduler(): OfferSchedulerApi {

        if (!this.OfferSchedulers || this.OfferSchedulers.length == 0)
            return null;

        let offerSchduler: OfferSchedulerApi = this.OfferSchedulers.filter(a => a.isActive).sort((a, b) => a.endDateTime < b.endDateTime ? 1 : -1)[0];

        if (!offerSchduler)
            return null;

        return offerSchduler;
    }


}