import { UserApi } from "../../models/Api/User";

export interface AspNetUserApi {
        bid: number;
        userName: string;
        email: string;
        mobileNumber: string;

        User: UserApi;
    }