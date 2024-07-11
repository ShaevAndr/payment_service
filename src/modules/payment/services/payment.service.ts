import { Controller, Injectable, Logger } from "@nestjs/common";
import { BalanceResponse, ConfirmOrCancelResponse, PaymentSessionResponse, RequestSessions, TokenRequest, TokenResponse, paymentController, paymentControllerMethods } from '@/proto/payment'

import { BanksFactory } from "@modules/banks/banks.factory";
import { CheckSelfEmployedDtoRequest, CheckSelfEmployedDtoResponse, PaymentActionsRequestDto } from "../dto";
import { OrdersRepository } from "../repositories/orders.repository";
import { Banks } from "@/modules/banks/lib";
import { SessionRepository } from "../repositories/session.repository";
import { GetBalanceDto, PaymentSessionRequestDto } from "../dto";
import { createOrders, createSession } from "../lib/createEntity.utils";

@Controller()
@paymentControllerMethods()
export class PaymentService implements paymentController {
    logger = new Logger(PaymentService.name)
    constructor(
        private readonly banksFactory: BanksFactory,
        private readonly paymentRepository: OrdersRepository,
        private readonly sessionRepository: SessionRepository
    ) { }
    async getBalance(request: GetBalanceDto): Promise<BalanceResponse> {
        this.logger.log('получение баланса')
        const bank = this.banksFactory.getBank(request.bank as Banks)
        return await bank.getBalance()
    }
    async confirmPayout(request: PaymentActionsRequestDto): Promise<ConfirmOrCancelResponse> {
        this.logger.log('Подтверждение платежа')
        const bank = this.banksFactory.getBank(request.bank as Banks)
        const session = await this.sessionRepository.getSessionById(request.transactionId)
        if (session.status === 'error') {
            return session
        }
        const bankResponse = await bank.confirmPayout(session.session.session_id)
        return bankResponse
    }
    async cancelPayout(request: PaymentActionsRequestDto): Promise<ConfirmOrCancelResponse> {
        this.logger.log('отмена платежа')
        const bank = this.banksFactory.getBank(request.bank as Banks)
        const session = await this.sessionRepository.getSessionById(request.transactionId)
        if (session.status === 'error') {
            return session
        }
        const bankResponse = await bank.cancelPayout(session.session.session_id)
        return bankResponse
    }
    async createPaymentSession(request: PaymentSessionRequestDto): Promise<PaymentSessionResponse> {
        this.logger.log('Создание платёжной сессии')
        const bank = this.banksFactory.getBank(request.bank as Banks)
        const bankResponse = await bank.createSession(request)

        if (bankResponse.status === 'error') {
            return bankResponse
        }
        const session = createSession(bankResponse)
        const sessionRepositoryResponse = await this.sessionRepository.createSession(session)

        if (sessionRepositoryResponse.status === 'error') {
            return sessionRepositoryResponse
        }

        const orders = createOrders(bankResponse, sessionRepositoryResponse.sessionId)
        const ordersRepositoryResponse = await this.paymentRepository.createOrder(orders)

        return ordersRepositoryResponse.status === 'error' ? ordersRepositoryResponse : { status: 'ok', sessionId: sessionRepositoryResponse.sessionId }
    }

    async getTokenizedCardData(request: TokenRequest): Promise<TokenResponse> {
        this.logger.log('Получение токена для токенизации карты')
        const bank = this.banksFactory.getBank(request.bank as Banks)
        return await bank.getTokenizeWidget()
    }

    async getSessions(request: RequestSessions): Promise<any> {
        this.logger.log('Получение информации о сессиях')
        return await this.sessionRepository.getBySessionId(request.id)
    }

    public async checkSelfEmployed(payload: CheckSelfEmployedDtoRequest): Promise<CheckSelfEmployedDtoResponse> {
        this.logger.log('Проверка статуса самозанятого')
        const bank = this.banksFactory.getBank(payload.bank as Banks)
        return await bank.checkSelfEmployed(payload.taxReference)
    }
}