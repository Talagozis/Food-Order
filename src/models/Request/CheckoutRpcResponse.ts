import { RpcResponse } from "../../models/Request/ResponseRpc";

export interface CheckoutRpcResponse extends RpcResponse {
    checkoutStatus: CheckoutResponseStatus;
}

export enum CheckoutResponseStatus {
    Success = 0,
    Exception = 1,

    ReCaptchaFailed = 3,

    EmailNotSend = 4,

    StoreFailed = 10,
    StoreException = 11,
    StoreIsNotActive = 12,
    StoreIsArchived = 13,
    StoreCanNotOrderOnline = 14,
    StoreIsNotOpen = 15,
    StoreIsNotHubConnected = 16,

    CustomerFailed = 20,
    CustomerException = 21,
    CustomerSurnameIsEmpty = 22,
    CustomerForenameIsEmpty = 23,
    CustomerAddressLineIsEmpty = 24,
    CustomerPhoneNumberIsEmpty = 25,
    CustomerPhoneNumberConfirmationFailed = 26,
    CustomerFloorNumberIsEmpty = 27,

    ProductsFailed = 30,
    ProductsException = 31,
    ProductsNotSelected = 32,
    ProductsAttributesFailed = 33,
    ProductsIngredientsFailed = 34,
    ProductsPriceLessThanMinimumCost = 35,

    OffersFailed = 40,
    OffersException = 41,
}