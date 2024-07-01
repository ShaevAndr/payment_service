export interface PaymentConfirm {
    session_id: string,
    confirm_information?: ConfirmInformation //Объект с информацией для подтверждения операции по номинальному счету
}

interface ConfirmInformation {
    transfer_details: TransferDetails //Информация о переводе
}

interface TransferDetails {
    payment_method: CardPaymentMethod,  //Способ получения выплаты
    customer: NominalPaymentParticipant,    //Информация о плательщике
    recipient: NominalPaymentParticipant,   //Информация о получателе
    purpose: string,    //Назначение выплаты в следующем формате: <описание>; card:<маска карты>
    amount: AmountDetails   //Сумма
}

interface NominalPaymentParticipant {
    account_number: string	//Номер счета
    name: string	//ФИО или наименование
    bank_name: string	//Наименование банка
    bik: string	//БИК банка
    correspondent_account_number: string    //Номер корреспондентского счета
}

interface CardPaymentMethod {
    type: string //Тип передачи данных карты. Возможные варианты: bank_card, encrypted_card, tokenized_card
    bank_card?: BankCard   //Карта в открытом виде
    encrypted_card?: EncryptedCard //Карта с шифрованными полями(токенизированная)
    tokenized_card?: TokenizedCard //	Токенизированный номер карты
    brand?: string, //Информация о карте. Возвращается в уведомлениях, нужна для отображения пользователям
    last4?: string  //Информация о карте. Возвращается в уведомлениях, нужна для отображения пользователям
}

interface AmountDetails {
    amount: number  //Значение суммы в минорных единицах валюты (в копейках). Если сумма платежа 100 рублей, передавайте 10000
    currency: string    //Код валюты согласно ISO 4217. Регистр не важен. Варианты: rub, eur
}

interface BankCard {
    number: string
    expiration_month?: string
    expiration_year?: string
    security_code?: string
    cardholder_name?: string
}

interface EncryptedCard {
    number_hash: string
    expiration_date_hash?: string
    security_code_hash?: string
    cardholder_name_hash?: string
}

interface TokenizedCard {
    token: string
}