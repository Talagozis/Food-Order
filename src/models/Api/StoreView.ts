export interface StoreViewApi {
    catalog: StoreViewCatalog;
}

export enum StoreViewCatalog {
    Undefined = 0,
    Template1 = 1,
    Template2 = 2,
    Template3 = 3,
}