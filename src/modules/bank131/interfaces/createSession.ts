import { AmountDetails, Amounts, Customer, ParticipantDetails, Payment, PaymentDetails, RecurrentTokenInfo, Refund } from "."

export interface CreateSessionRequest {
    amount_details: AmountDetails
    metadata: string
}

export interface CreateSessionResponse {
    status: 'error' | 'ok'
    session?: PaymentSession
    error?: Error
}

interface PaymentSession {
    id: string	                                //Идентификатор сессии
    status: PaymentStatus	                            //Статус.Возможные значения: created, in_progress, accepted, cancelled, error
    created_at: string	                        //Дата создания в формате ISO 8601
    updated_at: string	                        //Дата обновления в формате ISO 8601
    payments?: Array<Payment>                    //Список выплат, которые проводились в рамках этой сессии
    acquiring_payments?: Array<AcquiringPayment> //Список платежей, которые проводились в рамках этой сессии
    next_action?: 'confirm' | 'capture'                       //Метка, указывающая на действия для успешного прохождения транзакции.Возможные значения: confirm, capture
    error?: Error
}

interface Error {
    code: string	    //Код ошибки
    description: string	//Описание ошибки
}

interface AcquiringPayment {
    id: string	                            //Уникальный идентификатор платежа
    status: string	                        //Статус платежа. Возможные варианты: succeeded, in_progress, pending, failed
    created_at: string	                    //Дата создания в формате ISO 8601
    payment_details: PaymentDetails 	    //Платежные данные
    amount_details: AmountDetails	        //Сумма
    amounts: Amounts	                    //Комиссия за операцию
    finished_at: string	                    //Дата завершения в формате ISO 8601
    customer: Customer	                    //Данные пользователя (отправителя платежа)
    recurrent: RecurrentTokenInfo	        //Данные для проведения повторного платежа
    participant_details: ParticipantDetails	//Данные об участниках
    refunds: Array<Refund>	                //Список возвратов
    customer_interaction: Customer	        //Данные для взаимодействия с пользователем
    metadata: object	                    //Дополнительная информация. Любые данные, которые вам необходимы для проведения операции. Возвращаются в ответах и вебхуках
    error: Error
}

type PaymentStatus = 'created' | 'in_progress' | 'accepted' | 'cancelled' | 'error'