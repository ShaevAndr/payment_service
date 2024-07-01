export interface AmountDetails {
    amount: number //Значение суммы в минорных единицах валюты (в копейках). Если сумма платежа 100 рублей, передавайте 10000
    currency: string //Код валюты согласно ISO 4217. Регистр не важен. Варианты: rub, eur
}

export interface Card {
    type: string
    bank_card: BankCard
}

export interface BankCard {
    number: string
}

export interface PaymentMethod {
    type: string
    card: Card
}

export interface AmountDetails2 {
    amount: number
    currency: string
}

export interface FiscalizationDetails {
    professional_income_taxpayer: ProfessionalIncomeTaxpayer
}

export interface ProfessionalIncomeTaxpayer {
    tax_reference: string
    payer_type: string
    payer_tax_number: string
    payer_name: string
    services: Service[]
}

export interface Service {
    name: string
    amount_details: AmountDetails
}

export interface ParticipantDetails {
    recipient: Recipient
}

export interface Recipient {
    full_name: string
}
