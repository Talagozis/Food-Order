import { Cart } from "models/Entities/Cart";

export interface Checkout extends Cart{
    date: Date;
    orderDetails: OrderDetails;
}

export interface OrderDetails {
    customerForename: string;
    customerSurname: string;
    customerAddressLine: string;
    customerFloorNumber: string;
    customerDoorName?: string;
    customerPhoneNumber: string;
    customerPhoneNumberConfirm: string;
    isTakeAway?: boolean;
    info?: string;
}
