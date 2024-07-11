import { BalanceRequest, BalanceResponse, Error } from "@/proto/payment";
import { CommonDto, CommonResponseDto } from "./common.dto";
import { IsIn, IsOptional, IsString } from "class-validator";

export class GetBalanceDto implements BalanceRequest {
    @IsOptional()
    @IsString()
    @IsIn(['bank131'])
    bank: string;
}

export class BalanceResponseDto implements BalanceResponse {
    status: string;
    error?: Error;
    wallets: Wallet[]
}

class Wallet {
    amount: number
    currency: 'rub' | 'euro'
}