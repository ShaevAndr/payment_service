import { CreateSessionResponse, PaymentCancelResponse, PaymentConfirmResponse } from "@/modules/bank131/interfaces"
import { BalanceResponse } from "@/modules/bank131/interfaces/balance"
import { ResponseWidgetToken } from "@/modules/bank131/interfaces/widgetTocken"


export abstract class Bank {
    ROOT_URL: string
    createSession: (amount: number, metadata: string) => Promise<CreateSessionResponse>
    getBalance: () => Promise<BalanceResponse>
    linkSelfEmployed: () => any
    getTokenizedCard: () => string
    getPaymentNotification: () => any
    confirmPayment: (sessionId: string) => Promise<PaymentConfirmResponse>
    cancelPayment: (sessionId: string) => Promise<PaymentCancelResponse>
    getCheck: () => any
    getWidgetToken: (sessionId: string) => Promise<ResponseWidgetToken>

}