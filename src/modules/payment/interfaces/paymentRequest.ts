import { AmountDetails2, FiscalizationDetails, ParticipantDetails, PaymentMethod } from "."

export interface PaymentRequest {
    fiscalization_details: FiscalizationDetails
    payment_method: PaymentMethod
    amount_details: AmountDetails2
    metadata: string
    participant_details: ParticipantDetails
}