import { PaymentActionsResponseDto } from '@modules/payment/dto'
import { PaymentConfirmResponse } from "../../interfaces";

export const transformPaymentActionsResponse = (response: PaymentConfirmResponse): PaymentActionsResponseDto => {
    return response.status === 'error'
        ?
        {
            status: 'error',
            error: {
                code: response.error.code,
                description: response.error.description
            }
        }
        :
        { status: 'ok' }
}