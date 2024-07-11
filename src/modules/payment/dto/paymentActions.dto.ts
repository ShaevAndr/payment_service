import { IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CommonDto, CommonResponseDto } from "./common.dto";
import { Transaction } from "@/proto/payment";

export class PaymentActionsRequestDto implements Transaction {
    @IsOptional()
    @IsString()
    @IsIn(['bank131'])
    readonly bank: string;

    @IsString()
    @IsNotEmpty()
    readonly transactionId: string
}

export class PaymentActionsResponseDto extends CommonResponseDto {
}

