import { AmountDetails, AmountDetails2, Card, FiscalizationDetails, ParticipantDetails, PaymentMethod } from "."

export interface PaymentResponseSuccess {
    id: string
    status: string
    created_at: string
    payment_method: PaymentMethod
    amount_details: AmountDetails
    fiscalization_details: FiscalizationDetails
    metadata: string
    participant_details: ParticipantDetails
}

export interface PaymentResponseError {
    error: Error
    status: string
}

export interface Error {
    code: string
    description: string
}
