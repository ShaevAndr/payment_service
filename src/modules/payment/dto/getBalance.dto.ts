import { CommonDto, CommonResponseDto } from "./common.dto";

export class GetBalanceDto extends CommonDto { }

export class BalanceResponseDto extends CommonResponseDto {
    wallets?: Wallet[]
}

class Wallet {
    amount: number
    currency: 'rub' | 'euro'
}