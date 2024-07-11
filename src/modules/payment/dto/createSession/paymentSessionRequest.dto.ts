import { IsString, IsInt, ValidateNested, IsEnum, IsArray, ArrayNotEmpty, IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { PayerDto } from './payer.dto';
import { PaymentDetailsDto } from './paymentDetails.dto';
import { Service } from './service.dto';
import { PaymentSessionRequest } from '@/proto/payment';

export enum PaymentType {
    CARD_TOKENS = 'card_tokens',
    BANK_ACCOUNT = 'bank_account',
}

export class PaymentSessionRequestDto implements PaymentSessionRequest {
    @IsNotEmpty()
    @IsInt()
    amount: number;

    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => PayerDto)
    payer: PayerDto;

    @IsNotEmpty()
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

    @IsOptional()
    @IsString()
    bank: string;
}
