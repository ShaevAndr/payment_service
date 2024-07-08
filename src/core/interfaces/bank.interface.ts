import { TokenizedCardResponseDto, BalanceResponseDto, CheckSelfEmployedDtoResponse, PaymentSessionRequestDto, PaymentActionsResponseDto, PaymentSessionResponseDto } from "@/modules/payment/dto"


export abstract class Bank {
    ROOT_URL: string
    getBalance: () => Promise<BalanceResponseDto>
    checkSelfEmployed: (taxId: number) => Promise<CheckSelfEmployedDtoResponse>
    confirmPayment: (sessionId: string) => Promise<PaymentActionsResponseDto>
    cancelPayment: (sessionId: string) => Promise<PaymentActionsResponseDto>

    createSession: (request: PaymentSessionRequestDto) => Promise<PaymentSessionResponseDto>
    linkSelfEmployed: () => any
    getTokenizeWidget: () => Promise<TokenizedCardResponseDto>
    getPaymentNotification: () => any
    getCheck: () => any

}