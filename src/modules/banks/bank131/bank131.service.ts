import { Bank } from "@/core/interfaces/bank.interface";
import { BalanceRequest, BalanceResponse, CheckSelfEmployedRequest, CheckSelfEmployedResponse, CreateSessionRequest, CreateSessionResponse, EmployedStatusRequest, EmployedStatusResponse, PaymentCancelRequest, PaymentCancelResponse, PaymentConfirmRequest, PaymentConfirmResponse, PaymentMethod, PaymentRequest, PaymentResponseSuccess } from "../interfaces";
import { ConfigService } from "@nestjs/config";
import { RequestWidgetToken, ResponseWidgetToken } from "../interfaces/widgetToken";
import { BALANCE, CHECK_SELF_EMPLOYED, CONFIRM_PAYMENT, CREATE_SESSION, CREATE_SESSION_WITH_FISCALIZATION, PAYMENT_METHOD, STATUS_SELF_EMPLOYED, SYSTEM_TYPE, WIDGET_TOKEN } from "../lib";
import ky from 'ky'
import { transformBalanceResponse, statusSelfEmployedTransformer, transformPaymentActionsResponse } from "./transformers";
import { PaymentSessionRequestDto, PaymentSessionResponseDto, PaymentActionsResponseDto, BalanceResponseDto, CheckSelfEmployedDtoResponse, TokenizedCardResponseDto } from "@/modules/payment/dto";
import { HttpException, HttpStatus, Logger } from "@nestjs/common";
import { } from "@/modules/payment/dto/paymentActions.dto";
import { errorHandler } from "../lib/utils";
import { createPaymentMethodBody } from "../lib/utils/createPaymentMethodBody";


export class Bank131 implements Bank {
    ROOT_URL: string;
    ky: (typeof ky)
    logger = new Logger(Bank131.name)
    constructor(
        private readonly configService: ConfigService,
        private readonly X_PARTNER_PROJECT: string,
        private readonly X_PARTNER_SIGN: string,
    ) {
        this.X_PARTNER_PROJECT = this.configService.get('X_PARTNER_PROJECT')
        this.X_PARTNER_SIGN = 'УТОЧНИТЬ ГДЕ ВЗЯТЬ И КАК ПОЛЬЗОВАТЬСЯ'
        this.ROOT_URL = this.configService.get('NODE_ENV') === 'production' ? 'https://bank131.ru/' : 'https://demo.bank131.ru/'
        this.ky.create({
            headers: this.getHeader(),
            prefixUrl: this.ROOT_URL,
            retry: {
                limit: 2,
                methods: ['POST'],
                statusCodes: [500, 502, 503, 504],
                backoffLimit: 5000
            },
        })
    }
    public async getBalance(): Promise<BalanceResponseDto> {
        this.logger.log('получение баланса')
        try {

            const body: BalanceRequest = {
                request_datetime: new Date().toISOString()
            }
            const balance = await ky.post(`${BALANCE}`, { json: body }).json<BalanceResponse>()
            return transformBalanceResponse(balance)
        } catch (err) {
            this.logger.error('ошибка при получении баланса', err)
            return errorHandler(err)
        }
    };


    public async checkSelfEmployed(taxId): Promise<CheckSelfEmployedDtoResponse> {
        this.logger.log('получение статуса пользователя ИНН = ', taxId)
        try {

            const maxRetries = 2;
            let retries = 0;
            const body: CheckSelfEmployedRequest = {
                tax_reference: `${taxId}`
            }
            const checkResponse = await ky.post(`${CHECK_SELF_EMPLOYED}`, {
                json: body,
                hooks: {
                    afterResponse: [
                        async (request, options, response) => {
                            const body = await response.json();
                            this.logger.debug('Запрос идентификатора запроса на проверку самозанятости')
                            if (body.status === 'pending') {
                                this.logger.debug('Запрос идентификатора запроса на проверку самозанятостиб status="pending"')
                                await this.delay(40000)
                                return ky(request, options)
                            }
                            retries = 0
                            return response
                        }
                    ]
                }
            }).json<CheckSelfEmployedResponse>()

            const requestStatusBody: EmployedStatusRequest = {
                request_id: checkResponse.request_id
            }

            const statusResponse = await ky.post(`${STATUS_SELF_EMPLOYED}`, {
                json: requestStatusBody,

            }).json<EmployedStatusResponse>()

            return statusSelfEmployedTransformer(statusResponse)
        } catch (err) {
            this.logger.error('ошибка при получении статуса пользователя', err)
            return errorHandler(err)
        }
    }

    public async confirmPayout(sessionId: string): Promise<PaymentActionsResponseDto> {
        this.logger.log('подтверждение выплаты')
        try {
            const body: PaymentConfirmRequest = {
                session_id: sessionId,
            }
            const response = await ky.post(`${CONFIRM_PAYMENT}`, { json: body }).json<PaymentConfirmResponse>()
            return transformPaymentActionsResponse(response)
        } catch (err) {
            this.logger.error('ошибка при подтверждении выплаты', err)
            return errorHandler(err)
        }
    }

    public async cancelPayout(sessionId: string): Promise<PaymentActionsResponseDto> {
        this.logger.log('отмена выплаты')
        try {
            const body: PaymentCancelRequest = {
                session_id: sessionId,
            }
            const response = await ky.post(`${CONFIRM_PAYMENT}`, { json: body }).json<PaymentCancelResponse>()
            return transformPaymentActionsResponse(response)
        } catch (err) {
            this.logger.error('ошибка при отмене выплаты', err)
            return errorHandler(err)
        }
    }
    public createSession(request: PaymentSessionRequestDto): Promise<PaymentSessionResponseDto> {
        this.logger.log('создание сессии')
        try {
            const paymentBody: PaymentMethod = createPaymentMethodBody(request)
            const requestBody: PaymentRequest = {
                payment_method: paymentBody,
                amount_details: {
                    amount: request.amount,
                    currency: 'rub'
                },
                fiscalization_details: {
                    professional_income_taxpayer: {
                        services: [
                            {
                                name: request.,
                                amount_details: {
                                    amount: request.amount,
                                    currency: 'rub'
                                }
                            },
                        ],
                        tax_reference: `${request.payer.payerTaxNumber}`,
                        payer_type: request.payer.payerType,
                        payer_tax_number: `${request.payer.payerTaxNumber}`,
                        payer_name: request.payer.payerName,
                        receipt: {
                            id: "Узнать получаем мы его или нет",
                            link: request.reciept.url
                        }
                    }

                },
            }


            const response = ky.post(`${CREATE_SESSION_WITH_FISCALIZATION}`, { json: requestBody }).json<PaymentResponseSuccess>()
            return response
        } catch (err) {
            this.logger.error('ошибка при создании сессии', err)
            return errorHandler(err)
        }
    }

    public async getTokenizeWidget(): Promise<TokenizedCardResponseDto> {
        this.logger.log('Получение токена')

        try {
            const body: RequestWidgetToken = {
                tokenize_widget: {
                    access: true
                }
            }

            const response = await ky.post(`${WIDGET_TOKEN}`, { json: body }).json<ResponseWidgetToken>()

            return response
        } catch (err) {
            this.logger.error('ошибка при получении токена', err)
            return errorHandler(err)
        }
    }

    private getHeader() {
        return {
            'X-PARTNER-PROJECT': this.X_PARTNER_PROJECT,
            "X-PARTNER-SIGN": this.X_PARTNER_SIGN,
            "Content-Type": "application/json"
        }
    }

    private async delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}