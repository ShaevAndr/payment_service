import { IsString, IsEnum, IsInt } from 'class-validator';

export enum PayerType {
    LEGAL = 'legal',
    INDIVIDUAL = 'individual',
    FOREIGN = 'foreign',
}

export class PayerDto {
    @IsInt()
    payerId: number;

    @IsEnum(PayerType)
    payerType: PayerType;

    @IsString()
    payerName: string;

    @IsInt()
    payerTaxNumber: number;
}