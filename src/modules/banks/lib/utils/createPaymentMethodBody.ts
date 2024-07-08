import { PaymentSessionRequestDto } from "@/modules/payment/dto";
import { PaymentMethod } from "../../interfaces";

export const createPaymentMethodBody = (request: PaymentSessionRequestDto): PaymentMethod => {

    switch (request.paymentType) {
        case 'card_tokens':
            return {
                type: 'card',
                tokenize_card: {
                    number_hash: request.details.cardTokens!.numberHash,
                    expiration_date_hash: request.details.cardTokens!.expirationDateHash,
                    cardholder_name_hash: request.details.cardTokens!.cardholderNameHash,
                    security_code_hash: request.details.cardTokens!.securityCodeHash
                }
            }
        case 'bank_account':
            return {
                type: 'bank_account',
                bank_account: {
                    system_type: 'ru',
                    ru: {
                        bik: request.details.bankAccount!.bik,
                        account: request.details.bankAccount!.bankAccount,
                        full_name: request.details.bankAccount!.fullName,
                        description: request.details.bankAccount.description
                    }
                }
            }
        default:
            throw new Error('unknown payment type')
    }
}