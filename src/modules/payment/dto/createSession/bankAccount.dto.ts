import { IsNotEmpty, IsString } from 'class-validator';

export class BankAccountDto {
    @IsNotEmpty()
    @IsString()
    bik: string;

    @IsNotEmpty()
    @IsString()
    bankAccount: string;

    @IsNotEmpty()
    @IsString()
    fullName: string;

    @IsNotEmpty()
    @IsString()
    description: string;
}