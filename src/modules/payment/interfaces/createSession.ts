import { AmountDetails } from "."

export interface CreateSession {
    amount_details: AmountDetails
    metadata: string
}