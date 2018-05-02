export interface StoreAddressApi {
    bid: number;
    line: string;
    zip: string;
    city: string;
    region: string;
    country: string;
    lat: number | null;
    lon: number | null;
}