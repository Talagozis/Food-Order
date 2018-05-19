import { OfferGroupApi } from "./OfferGroup";
import { ActiveHourApi } from "./ActiveHour";

export interface OfferApi {
    bid: number;
    name: string;
    description: string;
    shortDescription: string;
    level: OfferLevel | null;
    discount: number;
    newUntilDate: Date | string | null;
    orderNumber: number | null;
    isActive: boolean;
    isArchived: boolean;
    info: string;

    OfferGroups: OfferGroupApi[];

    ActiveHours: ActiveHourApi[];
}

export enum OfferLevel {
    None = 0,
    Deal = 1,
    SuperDeal = 2,
    LiveDeal = 3,
}