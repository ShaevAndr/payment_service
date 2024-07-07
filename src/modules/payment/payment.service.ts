import { Injectable } from "@nestjs/common";
import { BanksFactory } from "../banks/banks.factory";
import { BalanceResponseDto, GetBalanceDto } from "./dto/getBalance.dto";

@Injectable()
export class PaymentService {
    constructor(
        private readonly banksFactory: BanksFactory
    ) { }

    public async getBallance(data: GetBalanceDto): Promise<BalanceResponseDto> {
        const bank = this.banksFactory.getBank(data.bankName)
        return await bank.getBalance()

    }
}