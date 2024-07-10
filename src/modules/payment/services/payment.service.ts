import { Controller, Injectable, Logger } from "@nestjs/common";
import { BalanceRequest, BalanceResponse, ConfirmOrCancelResponse, PaymentSessionRequest, PaymentSessionResponse, RequestOrders, RequestSessions, ResponseOrders, ResponseSessions, TokenRequest, TokenResponse, Transaction, paymentController, paymentControllerMethods } from '@/proto/payment'
import { CreateSessionRequest, CreateSessionResponse } from '@/proto/payment.proto';
import { HelloServiceController, HelloServiceControllerMethods } from './proto/hello.pb';

import { BanksFactory } from "@modules/banks/banks.factory";
import { BalanceResponseDto, GetBalanceDto } from "./dto/getBalance.dto";
import { CheckSelfEmployedDtoRequest, CheckSelfEmployedDtoResponse, PaymentActionsRequestDto, PaymentActionsResponseDto } from "./dto";
import { PaymentRepository } from "./repositories/orders.repository";
import { Observable } from "rxjs";

@Controller()
@paymentControllerMethods()
export class PaymentService implements paymentController {
    logger = new Logger(PaymentService.name)
    constructor(
        private readonly banksFactory: BanksFactory,
        private readonly paymentRepository: PaymentRepository
    ) { }
    async getBalance(request: BalanceRequest): Promise<BalanceResponse> {
        this.logger.log('получение баланса')
        const bank = this.banksFactory.getBank(request.bank)
        return await bank.getBalance()
    }
    async confirmPayout(request: Transaction): Promise<ConfirmOrCancelResponse> {
        this.logger.log('Подтверждение платежа')
        const bank = this.banksFactory.getBank(request.bank)
        const sessionId = this.paymentRepository.getSessionId(request.transactionId)
        const bankResponse = await bank.cancelPayment(sessionId)
        return bankResponse
    }
    async cancelPayout(request: Transaction): Promise<ConfirmOrCancelResponse> {
        this.logger.log('Отмена платежа')
        const bank = this.banksFactory.getBank(request.bank)
        const sessionId = this.paymentRepository.getSessionId(request.transactionId)
        const bankResponse = await bank.cancelPayment(sessionId)
        return bankResponse
    }
    createPaymentSession(request: PaymentSessionRequest): PaymentSessionResponse | Promise<PaymentSessionResponse> | Observable<PaymentSessionResponse> {
        throw new Error("Method not implemented.");
    }
    getTokenizedCardData(request: TokenRequest): TokenResponse | Promise<TokenResponse> | Observable<TokenResponse> {
        throw new Error("Method not implemented.");
    }
    getOrders(request: RequestOrders): ResponseOrders | Promise<ResponseOrders> | Observable<ResponseOrders> {
        throw new Error("Method not implemented.");
    }
    getSessions(request: RequestSessions): ResponseSessions | Promise<ResponseSessions> | Observable<ResponseSessions> {
        throw new Error("Method not implemented.");
    }
    public async checkSelfEmployed(payload: CheckSelfEmployedDtoRequest): Promise<CheckSelfEmployedDtoResponse> {
        this.logger.log('Проверка статуса самозанятого')
        const bank = this.banksFactory.getBank(payload.bankName)
        return await bank.checkSelfEmployed(payload.taxReference)
    }
}