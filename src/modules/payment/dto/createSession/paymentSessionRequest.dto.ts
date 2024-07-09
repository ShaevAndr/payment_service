import { IsString, IsInt, ValidateNested, IsEnum, IsArray, ArrayNotEmpty, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { PayerDto } from './payer.dto';
import { PaymentDetailsDto } from './paymentDetails.dto';
import { Service } from './service.dto';

export enum PaymentType {
    CARD_TOKENS = 'card_tokens',
    BANK_ACCOUNT = 'bank_account',
}

export class PaymentSessionRequestDto {
    @IsInt()
    amount: number;

    @ValidateNested({ each: true })
    @Type(() => PayerDto)
    payer: PayerDto;

    @IsEnum(PaymentType)
    paymentType: PaymentType;

    @ValidateNested()
    @Type(() => PaymentDetailsDto)
    details: PaymentDetailsDto;

    @IsNotEmpty()
    @IsString()
    recipientFullName: string;

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => Service)
    services: Service[];

    @IsString()
    bank: string;
}
