import { ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { CardTokensDto } from './cardTokens.dto';
import { BankAccountDto } from './bankAccount.dto';

export class PaymentDetailsDto {
    @ValidateNested()
    @Type(() => CardTokensDto)
    @IsOptional()
    cardTokens?: CardTokensDto;

    @ValidateNested()
    @Type(() => BankAccountDto)
    @IsOptional()
    bankAccount?: BankAccountDto;
}