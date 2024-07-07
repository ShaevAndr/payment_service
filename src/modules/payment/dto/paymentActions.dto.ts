import { IsNotEmpty, IsString } from "class-validator";
import { CommonDto, CommonResponseDto } from "./common.dto";

export class PaymentActionsRequestDto extends CommonDto {
    @IsString()
    @IsNotEmpty()
    transactionId: string
}

export class PaymentActionsResponseDto extends CommonResponseDto {
}

