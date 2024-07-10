import { AcquiringPayment, Payment, PaymentMethod } from "@/modules/banks/bank131/interfaces";
import { CommonResponseDto } from "../common.dto";
import { Error } from "../common.dto";

export class PaymentSessionResponseDto extends CommonResponseDto {
    session?: Session
    payment?: PaymentMethod
}

class Session {
    id: string
    status: 'created' | 'in_progress' | 'accepted' | 'cancelled' | 'error'
    created_at: string //	Дата создания в формате ISO 8601
    updated_at: string	//Дата обновления в формате ISO 8601
    payments?: Array<Payment>	//Список выплат, которые проводились в рамках этой сессии
    acquiring_payments?: Array<AcquiringPayment>	//Список платежей, которые проводились в рамках этой сессии
    next_action?: string	//Метка, указывающая на действия для успешного прохождения транзакции. Возможные значения: confirm, capture
    error?: Error	//Описание ошибки
}