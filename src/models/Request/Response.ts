export interface Response {
    status: ResponseStatus;
    message: string;
}

export enum ResponseStatus {
    Success = 0,
    Failure = 1,
    Exception = 2,
}