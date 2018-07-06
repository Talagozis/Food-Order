import { AspNetUserApi } from "../../models/Api/AspNetUser";

export interface UserApi {
    bid: number;
    surname: string;
    forename: string;
    fullName: string;
    aspNetUser: AspNetUserApi;
}