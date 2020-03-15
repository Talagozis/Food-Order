import { Cart } from "./Cart";

export interface Checkout extends Cart {
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

export interface SessionDetails {
	applicationType: ApplicationType;
	applicationDomain: ApplicationDomain;
	userAgent: string;
}

export interface PaymentDetails {
	paymentType: OrderPaymentType;
	vivaWalletPaymentToken: string;
}

export enum OrderDeliveryType {
	Delivery = 1,
	Takeaway = 2,
}

export enum ApplicationDomain {
	SerresDelivery = 1,
	MammasPizza = 2,
}

export enum ApplicationType {
	Web = 1,
	Pwa = 2,
	Android = 3,
	Ios = 4,
}

export enum OrderPaymentType {
	Cash = 1,
	CardOnDelivery = 2,
	VivaWallet = 3
}

export enum BuildPlatform {
	Pwa = 1,
	Android = 2,
	IOs = 3,
}

