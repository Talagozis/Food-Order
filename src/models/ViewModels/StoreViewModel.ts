import { StoreApi } from "../api/Store";
import { OpenHourApi } from "../../models/api/OpenHour";
import { StoreAddressApi } from "../../models/api/StoreAddress";
import { StoreContactApi } from "../../models/api/StoreContact";
import { ProductApi } from "../../models/api/Product";
import { OfferApi } from "../../models/api/Offer";
import { Product_TagApi, TagLevel } from "../../models/api/Product_tag";
import { Store_AreaApi } from "../../models/api/Store_Area";
import { StoreViewApi } from "../../models/api/StoreView";
import { UserApi } from "models/Api/User";

export class StoreViewModel implements StoreApi {
    bid: number;
    name: string;
    slug: string;
    description: string;
    shortDescription: string;
    logo: string;
    cover: string;
    minOrderCost: number;
    newUntilDate: Date;
    orderEmail: string;
    linkWebsite: string;
    linkFacebook: string;
    linkFoursquare: string;
    managerName: string;
    managerPhoneNumber: string;
    managerEmail: string;
    canOrderOnline: boolean;
    hasDelivery: boolean;
    hasTakeaway: boolean;
    canPayByCash: boolean;
    canPayByCreditCard: boolean;
    isActive: boolean;
    isClosed: boolean;
    isArchived: boolean;
    sendOrderByEmail: boolean;
    sendOrderByPush: boolean;
    isOpen: boolean;
    isNew: boolean;
    View: StoreViewApi;
    OpenHours: OpenHourApi[];
    Addresses: StoreAddressApi[];
    Contacts: StoreContactApi[];
    Products: ProductApi[];
    Offers: OfferApi[];
    Store_Areas: Store_AreaApi[];
    Product_Tags: Product_TagApi[];
    AspNetUsers: UserApi[];

    isHubConnected: boolean;

    public constructor(init?: Partial<StoreViewModel>) {
        Object.assign(this, init);
    }

    public getCuisines(): string {
        return this.Product_Tags.filter(a => a.level === TagLevel.Cuisine).map(a => a.Tag.name).join(", ");
    }

    public getTodayOpenHour(): OpenHourApi {

        if (!this.OpenHours)
            return null;

        let openHour: OpenHourApi = this.OpenHours.find(a => a.dayOfWeek == (new Date()).getDay())

        if (!openHour)
            return null;

        return openHour;
    }


}