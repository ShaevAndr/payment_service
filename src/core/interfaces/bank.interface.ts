import { CreateSessionResponse, PaymentCancelResponse, PaymentConfirmResponse } from "@/modules/banks/interfaces"
import { ResponseWidgetToken } from "@/modules/banks/interfaces/widgetTocken"
import { CheckSelfEmployedDtoResponse, CreateSessionRequestDto, PaymentActionsResponseDto } from "@/modules/payment/dto"
import { BalanceResponseDto } from "@/modules/payment/dto/getBalance.dto"


export abstract class Bank {
    ROOT_URL: string
    getBalance: () => Promise<BalanceResponseDto>
    checkSelfEmployed: (taxId: number) => Promise<CheckSelfEmployedDtoResponse>
    confirmPayment: (sessionId: string) => Promise<PaymentActionsResponseDto>
    cancelPayment: (sessionId: string) => Promise<PaymentActionsResponseDto>

    createSession: (request: CreateSessionRequestDto) => Promise<CreateSessionResponse>
    linkSelfEmployed: () => any
    getTokenizedCard: () => string
    getPaymentNotification: () => any
    getCheck: () => any
    getWidgetToken: (sessionId: string) => Promise<ResponseWidgetToken>

}