import { OfferApi } from "./Offer";

export interface OfferSchedulerApi {
	bid: number;
	startDateTime: Date;
	endDateTime: Date;
	maxAmount: number;
	usedAmount: number;
	usedAmountVirtual: number;
	description: string
	info: string;
	isActive: boolean;
	isArchived: boolean;

	Offer: OfferApi;
}