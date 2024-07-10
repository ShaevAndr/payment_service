import { CheckSelfEmployedDtoResponse } from "@/modules/payment/dto";
import { EmployedStatusResponse } from "../interfaces";

export const statusSelfEmployedTransformer = (data: EmployedStatusResponse): CheckSelfEmployedDtoResponse => {
    switch (data.status) {
        case 'error':
            return {
                status: 'error',
                error: {
                    code: data.error.code,
                    description: data.error.description
                }
            }
        case 'ok':
            return {
                status: 'ok',
                details: {
                    isBind: data.is_linked,
                    isSelfEmployed: data.is_professional_income_taxpayer
                }
            }
        case 'pending':
            return {
                status: 'error',
                error: {
                    code: 'pending',
                    description: 'pending'
                }
            }
        default:
            return {
                status: 'error',
                error: {
                    code: 'Неизвестная ошибка',
                    description: 'Проверить логи'
                }
            }
    }
}