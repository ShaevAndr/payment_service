import { ConfirmInformation, PaymentSession, Error } from "."

export interface PaymentConfirmRequest {
    session_id: string
    confirm_information?: ConfirmInformation
}

export interface PaymentConfirmResponse {
    status: 'error' | 'ok',
    session: PaymentSession,
    error: Error
}

export interface PaymentCancelRequest {
    session_id: string
}

export interface PaymentCancelResponse {
    status: 'error' | 'ok',
    session: PaymentSession,
    error: Error
}

