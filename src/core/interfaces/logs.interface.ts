export interface ILogs {
    description: string,
    method: string,
    url: string,
    requestBody: any,
    responseStatus: number,
    responseBody: any,
    duration: number,
}
