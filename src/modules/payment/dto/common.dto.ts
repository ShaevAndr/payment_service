import { Banks } from "@/modules/banks/lib";
import { IsString } from "class-validator";

export class CommonDto {

    @IsString()
    bankName: Banks

}

export class CommonResponseDto {
    status: 'error' | 'ok'
    error?: Error
}

export class Error {
    code: string
    description: string
}

export enum StatusType {
    ERROR = 0,
    OK = 1,
    UNRECOGNIZED = -1,
}