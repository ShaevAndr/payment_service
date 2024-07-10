import { PaymentSessionResponseDto } from "@/modules/payment/dto";
import { CreateSessionResponse, PaymentResponseSuccess } from "../interfaces";

export const newSessionTransformer = (response: CreateSessionResponse): PaymentSessionResponseDto => {
    if (response.status === 'error') {
        return {
            status: 'error',
            error: {
                code: response.error?.code,
                description: response.error?.description
            }
        }
    }
    return {
        status: 'ok',
        session: {
            id: response.session?.id,
            status: response.session?.status,
            created_at: response.session.created_at,
            updated_at: response.session.updated_at,
            payments: response.session.payments
        }

    }
}