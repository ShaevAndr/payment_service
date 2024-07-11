import { IPaymentOrder, ISession } from "@/core/interfaces"
import { PaymentSessionResponseDto } from "../dto"
import { STATUS } from "../constants/statuses"

export const createSession = (bankResponse: PaymentSessionResponseDto): ISession => {
    const session: ISession = {
        session_id: bankResponse.session.id,
        status: STATUS[bankResponse.session.status]
    }
    if (bankResponse.status === 'error') {
        session.description = bankResponse.error.description
    }
    return session
}

export const createOrders = (bankResponse: PaymentSessionResponseDto, sessionId: string): IPaymentOrder[] => {
    const orders: Array<IPaymentOrder> = []
    for (const bankOrders of bankResponse.session.payments) {
        const order: IPaymentOrder = {
            status: STATUS[bankOrders.status],
            total_amount: bankOrders.payment_method[bankOrders.payment_method.type].amount,
            type: bankOrders.payment_method.type,
            payer_id: 111111,
            payer_type: bankOrders.fiscalization_details.professional_income_taxpayer.payer_type,
            payer_name: bankOrders.fiscalization_details.professional_income_taxpayer.payer_type,
            payer_tax_number: bankOrders.fiscalization_details.professional_income_taxpayer.payer_tax_number,
            recipient_tax_number: bankOrders.fiscalization_details.professional_income_taxpayer.tax_reference,
            recipient_bank_bik: bankOrders.payment_method.bank_account?.ru.bik || '',
            session_id: sessionId,
            description: ""
        }
        orders.push(order)
    }
    return orders
}