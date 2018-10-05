import { Cart } from "models/Entities/Cart";

export interface Checkout extends Cart{
    date: Date;
    deliveryType: OrderDeliveryType;
    orderDetails: OrderDetails;
    sessionDetails: SessionDetails;
}

export interface OrderDetails {
    customerForename: string;
    customerSurname: string;
    customerAddressLine: string;
    customerFloorNumber: string;
    customerDoorName?: string;
    customerPhoneNumber: string;
    customerPhoneNumberConfirm: string;
    info?: string;
}

export interface SessionDetails
{
    applicationType: ApplicationType;
    userAgent: string;
}

export enum OrderDeliveryType
{
    Delivery = 1,
    Takeaway = 2,
}

export enum ApplicationType
{
    Web = 1,
    Pwa = 2,
    Android = 3,
    Ios = 4,
}