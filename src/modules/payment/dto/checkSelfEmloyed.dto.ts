import { IsNotEmpty, IsNumber } from "class-validator";
import { CommonDto, CommonResponseDto } from "./common.dto";

export class CheckSelfEmployedDtoRequest extends CommonDto {
    @IsNotEmpty()
    @IsNumber()
    readonly taxReference: number

}

export class CheckSelfEmployedDtoResponse extends CommonResponseDto {
    readonly details?: Details

}

class Details {
    readonly isBind: boolean
    readonly isSelfEmployed: boolean
}