import { CommonResponseDto } from "@/modules/payment/dto/common.dto"
import { HttpException } from "@nestjs/common"

export const errorHandler = (err: Error): CommonResponseDto => {
    if (err instanceof HttpException) {
        return {
            status: 'error',
            error: {
                code: 'Ошибка запроса',
                description: err.message
            }
        }
    }
    return {
        status: 'error',
        error: {
            code: 'Ошибка сервера',
            description: err.message
        }
    }
}