import { AmountDetails, PaymentMethod } from "."

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

export interface Payment {
  id: string
  status: string
  created_at: string
  customer: Customer
  payment_method: PaymentMethod
  amount_details: AmountDetails
  metadata: string
}

export interface Customer {
  reference: string
  contacts: Contact[]
}

export interface Contact {
  email: string
}