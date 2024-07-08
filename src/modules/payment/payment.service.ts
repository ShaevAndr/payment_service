import { Injectable, Logger } from "@nestjs/common";
import { BanksFactory } from "../banks/banks.factory";
import { BalanceResponseDto, GetBalanceDto } from "./dto/getBalance.dto";
import { CheckSelfEmployedDtoRequest, CheckSelfEmployedDtoResponse, PaymentActionsRequestDto, PaymentActionsResponseDto } from "./dto";
import { PaymentRepository } from "./payment.repository";

@Injectable()
export class PaymentService {
    logger = new Logger(PaymentService.name)
    constructor(
        private readonly banksFactory: BanksFactory,
        private readonly paymentRepository: PaymentRepository
    ) { }

    public async getBallance(data: GetBalanceDto): Promise<BalanceResponseDto> {
        this.logger.log('получение баланса')
        const bank = this.banksFactory.getBank(data.bankName)
        return await bank.getBalance()
    }

    public async checkSelfEmployed(payload: CheckSelfEmployedDtoRequest): Promise<CheckSelfEmployedDtoResponse> {
        this.logger.log('Проверка статуса самозанятого')
        const bank = this.banksFactory.getBank(payload.bankName)
        return await bank.checkSelfEmployed(payload.taxReference)
    }

    public async confirmPayment(payload: PaymentActionsRequestDto): Promise<PaymentActionsResponseDto> {
        this.logger.log('Подтверждение платежа')
        const bank = this.banksFactory.getBank(payload.bankName)
        const sessionId = this.paymentRepository.getSessionId(payload.transactionId)
        const bankResponse = await bank.cancelPayment(sessionId)

    }

    public async cancelPayment(payload: PaymentActionsRequestDto): Promise<PaymentActionsResponseDto> {
        this.logger.log('Отмена оплаты')
        const bank = this.banksFactory.getBank(payload.bankName)
        const sessionId = this.paymentRepository.getSessionId(payload.transactionId)
        const bankResponse = await bank.cancelPayment(sessionId)
    }
}