import { OfferGroupApi } from "./OfferGroup";
import { ActiveHourApi } from "./ActiveHour";
import { OfferSchedulerApi } from "./OfferSchedulerApi";
import { StoreApi } from "./Store";

export interface OfferApi {
    bid: number;
    name: string;
    description: string;
    shortDescription: string;
    level: OfferLevel | null;
    totalPrice: number;
    discount: number;
    finalPrice: number;
    picture: string;
    newUntilDate: Date | string | null;
    orderNumber: number | null;
    isActive: boolean;
    isArchived: boolean;
    info: string;

    OfferGroups: OfferGroupApi[];

    ActiveHours: ActiveHourApi[];

    OfferSchedulers: OfferSchedulerApi[];

    Store: StoreApi;
}

export enum OfferLevel {
    None = 0,
    Deal = 1,
    SuperDeal = 2,
    LiveDeal = 3,
}