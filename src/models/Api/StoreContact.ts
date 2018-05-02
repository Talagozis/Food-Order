export interface StoreContactApi {
    bid: number;

    value: string;

    contactTypeName: string;
    contactTypePicture: string;

    ContactType: ContactTypeApi;
}

export interface ContactTypeApi {
    bid: number;

    name: string;
    picture: string;
}