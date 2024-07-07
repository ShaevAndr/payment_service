import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { CommonDto, CommonResponseDto } from "./common.dto";
import { Type } from "class-transformer";

export class CreateSessionRequestDto extends CommonDto {
    @IsNumber()
    @IsNotEmpty()
    readonly amount: number

    @IsNotEmpty()
    @IsString()
    readonly reciept: string

    @ValidateNested()
    @IsNotEmpty()
    @Type(() => Payer)
    payer: Payer

    @ValidateNested()
    @IsNotEmpty()
    @Type(() => Recipient)
    recipient: Recipient

    @ValidateNested()
    @IsNotEmpty()
    @Type(() => PaymentDetails)
    details: PaymentDetails
}

class Payer {
    @IsNotEmpty()
    @IsNumber()
    readonly payerId: string

    @IsNotEmpty()
    @IsString()
    readonly payerType: 'legal' | 'individual' | 'foreign'

    @IsNotEmpty()
    @IsString()
    readonly payerName: string

    @IsNotEmpty()
    @IsNumber()
    readonly payerTaxNumber: number
}

class Recipient {
    @IsNotEmpty()
    @IsNumber()
    readonly recipientId: number

    @IsNotEmpty()
    @IsNumber()
    readonly recipientBankBik: number


    @IsNotEmpty()
    @IsString()
    readonly recipientFullName: string

    @IsNotEmpty()
    @IsNumber()
    readonly recipientBankAccount: number

    @IsNotEmpty()
    @IsNumber()
    readonly recipientTaxNumber: number

    @IsEmail()
    readonly email?: string

    readonly phone?: string

}

class PaymentDetails {
    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    readonly description: string[]

    @IsNotEmpty()
    @IsArray()
    @IsNumber({}, { each: true })
    readonly contractsNumbers: number[]
}

export class CreateSessionResponseDto extends CommonResponseDto {
    sessionId?: string
}