import { StoreViewApi } from "./StoreView";
import { OpenHourApi } from "./OpenHour";
import { StoreAddressApi } from "./StoreAddress";
import { StoreContactApi } from "./StoreContact";
import { ProductApi } from "./Product";
import { OfferApi } from "./Offer";
import { Store_AreaApi } from "./Store_Area";
import { Product_TagApi } from "./Product_tag";
import { UserApi } from "./User";

export interface StoreApi {
        name: string;
        slug: string;
        description: string;
        shortDescription: string;
        logo: string;
        cover: string;
        minOrderCost: number | null;
        newUntilDate: Date | null;
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

        bid: number;

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
}