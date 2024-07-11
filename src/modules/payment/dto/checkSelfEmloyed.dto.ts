import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { CommonDto, CommonResponseDto } from "./common.dto";
import { TaxReference } from "@/proto/payment";

export class CheckSelfEmployedDtoRequest implements TaxReference {
    @IsOptional()
    @IsString()
    @IsIn(['bank131'])
    bank: string;

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