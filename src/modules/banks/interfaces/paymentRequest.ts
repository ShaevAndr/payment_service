import { AmountDetails, FiscalizationDetails, ParticipantDetails, PaymentMethod } from "."

export interface PaymentRequest {
    fiscalization_details?: FiscalizationDetails
    payment_method?: PaymentMethod
    amount_details?: AmountDetails
    metadata?: string
    participant_details?: ParticipantDetails
}