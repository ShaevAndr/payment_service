import { AmountDetails, FiscalizationDetails, ParticipantDetails, PaymentMethod } from "."

export interface PaymentResponseSuccess {
    id: string
    status: string
    created_at: string
    payment_method: PaymentMethod
    amount_details: AmountDetails
    fiscalization_details: FiscalizationDetails
    metadata: string
    participant_details: ParticipantDetails
    error?: Error
}

export interface PaymentResponseError {
    status: string
    error?: Error
}

