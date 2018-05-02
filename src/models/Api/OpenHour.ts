export interface OpenHourApi {
    bid: number;

    dayOfWeek: number;
    startTime: Date | string;
    endTime: Date | string;
}