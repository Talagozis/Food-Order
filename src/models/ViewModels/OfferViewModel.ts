import { OfferApi, OfferLevel } from "../../models/api/Offer";
import { OfferGroupApi } from "../../models/Api/OfferGroup";
import { ActiveHourApi } from "../../models/Api/ActiveHour";
import { OfferSchedulerApi } from "../../models/Api/OfferSchedulerApi";
import { StoreApi } from "../../models/Api/Store";

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
    OfferGroups: OfferGroupApi[];
    ActiveHours: ActiveHourApi[];
    OfferSchedulers: OfferSchedulerApi[];
    Store: StoreApi;


    public constructor(init?: Partial<OfferViewModel>) {
        Object.assign(this, init);
    }

    public getCurrentOfferScheduler(): OfferSchedulerApi {

        if (!this.OfferSchedulers || this.OfferSchedulers.length == 0)
            return null;

        let offerSchduler: OfferSchedulerApi = this.OfferSchedulers.filter(a => a.isActive).sort((a, b) => a.endDateTime > b.endDateTime ? 1 : -1)[0];

        if (!offerSchduler)
            return null;

        return offerSchduler;
    }


}