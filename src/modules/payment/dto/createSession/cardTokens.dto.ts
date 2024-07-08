import { IsNotEmpty, IsString } from 'class-validator';

export class CardTokensDto {
    @IsNotEmpty()
    @IsString()
    numberHash: string;

    @IsNotEmpty()
    @IsString()
    expirationDateHash: string;

    @IsNotEmpty()
    @IsString()
    cardholderNameHash: string;

    @IsNotEmpty()
    @IsString()
    securityCodeHash: string;

    @IsNotEmpty()
    @IsString()
    widgetToken: string;
}