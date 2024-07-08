import { AmountDetails, Payment, PaymentMethod } from "."

export interface PaymentConfirmWebhook {
  type: string
  session: Session
}

export interface Session {
  id: string
  status: string
  created_at: string
  updated_at: string
  next_action: string
  payments: Payment[]
}

export interface Contact {
  email: string
}