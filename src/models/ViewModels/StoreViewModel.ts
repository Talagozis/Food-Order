import { StoreApi } from "../api/Store";

export class StoreViewModel implements StoreApi {
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
    bid: number;
    isOpen: boolean;
    isNew: boolean;
    View;
    OpenHours;
    Addresses;
    Contacts;
    Products;
    Offers;
    Store_Areas;
    Product_Tags;
    
    public getCuisines() {
        return 'test';
    }
}