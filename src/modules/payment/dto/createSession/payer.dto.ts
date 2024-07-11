import { IsString, IsEnum, IsInt, IsNotEmpty } from 'class-validator';

export enum PayerType {
    LEGAL = 'legal',
    INDIVIDUAL = 'individual',
    FOREIGN = 'foreign',
}

export class PayerDto {
    @IsNotEmpty()
    @IsInt()
    payerId: number;

    @IsNotEmpty()

    @IsEnum(PayerType)
    payerType: PayerType;

    @IsString()
    @IsNotEmpty()
    payerName: string;

    @IsNotEmpty()
    @IsInt()
    payerTaxNumber: number;
}