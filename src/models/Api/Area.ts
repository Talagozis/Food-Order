import { RegionApi } from "./Region";

export interface AreaApi {
    bid: number;

    zipCode: string;

    Region: RegionApi;
}