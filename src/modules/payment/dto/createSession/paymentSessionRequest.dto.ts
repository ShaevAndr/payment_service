import { IsString, IsInt, ValidateNested, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { PayerDto } from './payer.dto';
import { PaymentDetailsDto } from './paymentDetails.dto';
import { RecieptDto } from './reciept.dto';

export enum PaymentType {
    CARD_TOKENS = 'card_tokens',
    BANK_ACCOUNT = 'bank_account',
}

export class PaymentSessionRequestDto {
    @IsInt()
    amount: number;

    @ValidateNested()
    @Type(() => PayerDto)
    payer: PayerDto;

    @IsEnum(PaymentType)
    paymentType: PaymentType;

    @ValidateNested()
    @Type(() => PaymentDetailsDto)
    details: PaymentDetailsDto;

    @ValidateNested()
    @Type(() => RecieptDto)
    reciept: RecieptDto;

    @IsString()
    bank: string;
}
