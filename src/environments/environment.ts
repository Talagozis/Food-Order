import { IENV } from "./IENV";
import { ApplicationDomain, BuildPlatform } from "../models/Entities/Checkout";

export const ENV: IENV  = {
	mode: 'Empty',
	IMAGE_URL: "",
	API_HEADER_NAME: "",
	API_HEADER_VALUE: "",
	API_URL: "",
	RPC_HEADER_NAME: "",
	RPC_HEADER_VALUE: "",
	RPC_URL: "",
	GOOGLE_ANALYTICS_TRACKING_ID: "",

	BUILD_PLATFORM: BuildPlatform.Pwa,
	APPLICATION_DOMAIN: ApplicationDomain.SerresDelivery,
};
