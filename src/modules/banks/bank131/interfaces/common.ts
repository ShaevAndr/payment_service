// Объект с деталями выписки.
export interface AccountStatement {
    date_from: string; // Начальная дата периода для формирования выписки.
    date_to: string; // Конечная дата периода для формирования выписки.
    account_number: string; // Номер банковского счёта.
}
// Объект со всеми данными платежа.
export interface AcquiringPayment {
    id: string; // Уникальный идентификатор платежа.
    status: Status; // Статус платежа.
    created_at: string; // Дата и время создания платежа.
    payment_details: string; // Детали платежа.
    amount_details: AmountDetails; // Детали суммы.
    amounts?: Amounts; // Суммы, связанные с платежом.
    finished_at?: string; // Дата и время завершения платежа.
    customer: string; // Информация о клиенте.
    recurrent?: boolean; // Рекуррентный платеж.
    participant_details?: string; // Детали участника.
    refunds?: string; // Возвраты, связанные с платежом.
    customer_interaction?: string; // Взаимодействие с клиентом.
    metadata?: string; // Метаданные.
    error?: string; // Ошибки, связанные с платежом.
}
export type Status = 'succeeded' | 'in_progress' | 'pending' | 'failed'

// Объект с настройками виджета платежной формы: для проведения платежей банковской картой.
export interface AcquiringWidgetMetadata {
    session_id: string; // Идентификатор сессии.
    show_recurrent_checkbox?: boolean; // Показывать флажок рекуррентного платежа.
    success_return_url?: string; // URL возврата при успешной оплате.
    failure_return_url?: string; // URL возврата при неудачной оплате.
    success_on_hold?: boolean; // Успешное удержание.
}

export interface PaymentMethod {
    type: string	//Тип способа получения выплаты.Возможные варианты: card, bank_account, wallet, tax, recurrent
    card?: CardPaymentMethod	//Банковская карта получателя
    bank_account?: BankAccountPaymentMethod	//Банковский счет получателя
    wallet?: WalletPaymentMethod	//Электронный кошелек получателя
    tax?: TaxPaymentMethod	//Выплата в налоговую
    recurrent?: RecurrentToken	//Выплата с использованием рекуррентного токена
    tokenize_card?: TokenizeCard	//Выплата с использованием токенизированного номера карты
}

export interface TokenizeCard {
    number_hash: string
    expiration_date_hash: string
    cardholder_name_hash: string
    security_code_hash: string
}

// Объект суммы.
export interface AmountDetails {
    amount: number; // Сумма.
    currency: Currency; // Валюта.
}

export type Currency = 'rub' | 'euro'

// Объект c информацией о комиссии за транзакцию.
export interface Amounts {
    fee: number; // Комиссия.
}

// Информация о балансе счета.
export interface BalanceDetails {
    current_balance: number; // Текущий баланс в копейках.
}

// Объект с описанием банковского счета получателя выплаты.
export interface BankAccountPaymentMethod {
    system_type: SystemType; // Тип системы.
    ru?: BankAccountRU; // Детали банковского счета в России.
    faster_payment_system?: boolean; // Быстрая платежная система.
    faster_payment_system_verification?: string; // Проверка быстрой платежной системы.
}

export type SystemType = 'ru' | 'faster_payment_system' | 'faster_payment_system_verification'

// Объект с данными банковского счета в российском банке (в регионе ru).
export interface BankAccountRU {
    bik: string; // БИК банка.
    account: string; // Номер счета.
    token?: string; // Токен.
    full_name: string; // Полное имя владельца счета.
    description: string; // Описание.
    inn?: string; // ИНН.
    kpp?: string; // КПП.
    is_fast?: boolean; // Быстрый ли счет.
}

// Объект с информацией о токене банковского счета.
export interface BankAccountRUInfo {
    created_at: string; // Дата и время создания.
    finished_at: string; // Дата и время завершения.
    masked_account: string; // Замаскированный номер счета.
}

// Объект карты в открытом виде (можно использовать, если у вас есть PCI DSS).
export interface BankCard {
    number: string; // Номер карты.
    expiration_month?: string; // Месяц истечения срока действия.
    expiration_year?: string; // Год истечения срока действия.
    security_code?: string; // Код безопасности.
    cardholder_name?: string; // Имя держателя карты.
}

// Объект с данными банковской карты для токенизации.
export interface CardElements {
    ref: string; // Ссылка.
    type: string; // Тип.
    card_number: string; // Номер карты.
}

// Объект с данными банковской карты получателя выплаты.
export interface CardPaymentMethod {
    type: string; // Тип платежного метода.
    bank_card?: BankCard; // Банковская карта.?
    encrypted_card?: string; // Зашифрованная карта.
    tokenized_card?: string; // Токенизированная карта.
    brand?: string; // Бренд карты.
    last4?: string; // Последние 4 цифры номера карты.
}

// Объект с данными о токенизированной банковской карте.
export interface CardTokenInfo {
    number_hash: string; // Хэш номера карты.
    brand: string; // Бренд карты.
    last4: string; // Последние 4 цифры номера карты.
}

// Объект с информацией для подтверждения операции по номинальному счету.
export interface ConfirmInformation {
    transfer_details: string; // Детали перевода.
}

// Объект с информацией о контрагенте.
export interface Contragent {
    name?: string; // Наименование контрагента.
    inn?: string; // ИНН контрагента.
    kpp?: string; // КПП контрагента.
    account_number: string; // Номер счета контрагента.
    bank_bik: string; // БИК банка контрагента.
    bank_name?: string; // Наименование банка контрагента.
}

// Объект с информацией о контрагенте.
export interface CounterParty {
    kpp?: string; //	КПП контрагента
    inn?: string	//ИНН контрагента
    name: string	//Наименование контрагента
    account_number: string	//Номер счета контрагента
    bank_code: string	//БИК банка контрагента
}

// Данные о пользователе (получателе выплаты или отправителе платежа) в вашей системе. Например, логин, по которому вы сможете идентифицировать пользователя, и его контактная информация.
export interface Customer {
    reference: string; // Уникальный идентификатор клиента
    contacts?: CustomerContact[]; // Контактные данные клиента
}

// Контакты пользователя (получателя выплаты или отправителя платежа).
export interface CustomerContact {
    email?: string; // Адрес электронной почты клиента
    phone?: string; // Номер телефона клиента
}

// Объект, описывающий взаимодействие с пользователем.
export interface CustomerInteraction {
    type: string; // Тип взаимодействия с клиентом
    redirect?: CustomerInteractionRedirect; // Информация о перенаправлении взаимодействия
    inform?: CustomerInteractionInform; // Информация о уведомлении клиента
}

// Объект с информацией о способе платежа.
export interface CustomerInteractionInform {
    qr?: QRInformInteraction; // Данные для информирования через QR-код
}

// Объект с данными для редиректа (перенаправления пользователя).
export interface CustomerInteractionRedirect {
    url: string; // URL для перенаправления
    base_url: string; // Базовый URL
    method: "GET" | "POST"; // HTTP метод для запроса
    qs?: { [key: string]: string }; // Параметры строки запроса
    params?: { [key: string]: any }; // Параметры запроса
}

// Объект с маскированным счетом пользователя.
export interface Data {
    masked_account: string; // Зашифрованный номер счета
}

// Карта с шифрованными полями (токенизированная). Передается при проведении выплаты или оплаты через виджет.
export interface EncryptedCard {
    number_hash: string; // Хэш номера карты
    expiration_date_hash?: string; // Хэш срока действия карты (опционально)
    security_code_hash?: string; // Хэш кода безопасности карты (опционально)
    cardholder_name_hash?: string; // Хэш имени владельца карты (опционально)
}

// Объект с описанием ошибки.
export interface Error {
    code: string; // Код ошибки
    description: string; // Описание ошибки
}

// Объект с данными пользователя Системы быстрых платежей.
export interface FasterPaymentSystem {
    phone: string; // Номер телефона для быстрого платежной системы
    bank_id: string; // Идентификатор банка
    description: string; // Описание системы быстрых платежей
}

// Объект с данными для проверки регистрации пользователя в Системе быстрых платежей.
export interface FasterPaymentSystemVerification {
    phone: string; // Номер телефона для проверки быстрой платежной системы
    bank_id: string; // Идентификатор банка для проверки
}

// Объект с данными для фискализации.
export interface FiscalizationDetails {
    professional_income_taxpayer: ProfessionalIncomeTaxpayer; // Детали фискализации для налогоплательщика
}

// Объект с данными чека, созданного при фискализации.
export interface FiscalizationReceipt {
    id: string; // Идентификатор чека
    link?: string; // Ссылка на чек
}

// Объект с описанием услуги, за которую отправляется выплата, для фискализации. В одном объекте может содержаться не более 6 услуг.
export interface FiscalizationService {
    name: string; // Наименование услуги фискализации
    amount_details: AmountDetails; // Детали суммы
    quantity?: number; // Количество услуг
}

// Объект с информацией о внутреннем переводе.
export interface InternalTransferInfo {
    type: string; // Тип внутреннего перевода
    transfer_from_nominal_account?: TransferFromNominalAccount; // Данные о переводе с номинального счета
    transfer_from_bank_account?: TransferFromBankAccount; // Данные о переводе с банковского счета
}

// Объект с информацией об оплате через платежные системы.
export interface InternetBanking {
    type: string; // Тип интернет-банкинга
    sber_pay: SberPay; // Данные о платеже через Сбербанк онлайн
}

// Информация о взимаемой комиссии. Количество объектов соответствует количеству применяемых комиссий.
export interface MerchantFee {
    amount: number; // Сумма комиссии в копейках
    currency: string; // Валюта комиссии
}

// Данные о плательщике и получателеле выплаты c номинального счета.
export interface NominalPaymentParticipant {
    account_number?: string; // Номер счета участника
    name?: string; // Наименование участника
    bank_name?: string; // Наименование банка участника
    bik?: string; // БИК банка участника
    correspondent_account_number?: string; // Номер корреспондентского счета участника
}

// Объект с количеством непрочитанных самозанятыми оповещений из ФНС.
export interface NotificationCountInformation {
    tax_reference: string; // Налоговая ссылка
    count?: number; // Количество уведомлений
}

// Объект с общей информацией самозанятыми оповещений из ФНС.
export interface NotificationInformation {
    tax_reference: string; // Налоговая ссылка
    notifications?: Notifications[]; // Уведомления
}

// Массив с подробной информацией об оповещениях, которые ФНС рассылает самозанятым.
export interface Notifications {
    id: string; // Идентификатор уведомления
    title: string; // Заголовок уведомления
    message: string; // Текст уведомления
    status: 'NEW' | 'ACKNOWLEDGED' | 'ARCHIVED'; // Статус уведомления
    created_at: string; // Время создания уведомления
}

// Массив с данными для уведомления ФНС о статусе оповещений для самозанятых.
export interface NotificationsList {
    message_id_list?: string[]; // Список идентификаторов уведомлений
    tax_reference: string; // Налоговая ссылка
}

// Данные участника выплаты — отправителя или получателя. Набор необходимых данных зависит от способа получения выплаты.
export interface Participant {
    full_name?: string; // Полное имя участника
    first_name?: string; // Имя участника
    last_name?: string; // Фамилия участника
    middle_name?: string; // Отчество участника
    company_name?: string; // Название компании участника
    reference?: string; // Уникальный идентификатор участника
    tax_reference?: string; // Налоговая ссылка участника
    beneficiary_id?: string; // Идентификатор получателя
    country_iso3?: string; // Код страны по ISO-3166-1 alpha-3
    account?: string; // Номер счета участника
}

// Данные об участниках выплаты.
export interface ParticipantDetails {
    sender?: Participant; // Отправитель
    recipient?: Participant; // Получатель
}

// Объект со всеми данными выплаты.
export interface Payment {
    id: string; // Идентификатор платежа
    status: Status; // Статус платежа
    created_at: string; // Время создания платежа
    payment_method: PaymentMethod; // Метод платежа
    amount_details: AmountDetails; // Детали суммы платежа
    amounts?: Amounts; // Суммы
    finished_at?: string; // Время завершения платежа
    customer?: Customer; // Клиент
    fiscalization_details?: FiscalizationDetails; // Детали фискализации
    participant_details?: ParticipantDetails; // Детали участника
    refunds?: Refund[]; // Возвраты
    metadata?: { [key: string]: any }; // Дополнительные метаданные
    error?: Error; // Ошибка платежа
}

// Объект с описанием способа проведения платежа.
export interface PaymentDetails {
    type: string; // Тип деталей платежа
    card?: CardPaymentMethod; // Детали платежа картой
    recurrent?: RecurrentTokenInfo; // Информация о регулярном платеже
    internal_transfer?: InternalTransferInfo; // Информация о внутреннем переводе
    faster_payment_system?: FasterPaymentSystem; // Информация о системе быстрых платежей
    wallet?: WalletPaymentMethod; // Детали платежа через кошелек
}

// Объект с описанием способа получения выплаты.

// Параметры для проведения платежа.
export interface PaymentOptions {
    return_url?: string; // URL, на который нужно перенаправить пользователя после проведения платежа. URL должен быть валидным.
    recurrent?: boolean; // Нужно ли провести платеж с помощью сохраненного токена
    expiration_at?: string; // Время истечения опций платежа.  Формат: ГГГГ-ММ-ДД ЧЧ:ММ:СС
}

// Контейнер с данными о всех операциях, которые проводились в рамках одной платежной сессии.
export interface PaymentSession {
    id: string; // Идентификатор сессии
    status: 'created' | 'in_progress' | 'accepted' | 'cancelled' | 'error'; // Статус сессии: created, in_progress, accepted, cancelled, error
    created_at: string; // Дата создания в формате ISO 8601
    updated_at: string; // Дата обновления в формате ISO 8601
    payments?: Payment[]; // Список выплат в рамках сессии
    acquiring_payments?: AcquiringPayment[]; // Список платежей в рамках сессии
    next_action?: 'confirm' | 'capture'; // Метка следующего действия: confirm, capture
    error?: Error; // Описание ошибки при наличии
}

// Объект с данными для фискализации самозанятого.
export interface ProfessionalIncomeTaxpayer {
    services: FiscalizationService[]; // Список оказанных услуг (не более 6)
    tax_reference: string; // ИНН самозанятого
    receipt?: FiscalizationReceipt; // Фискальный чек, возвращаемый в уведомлениях
    payer_type?: 'legal' | 'individual' | 'foreign'; // Тип плательщика: legal, individual, foreign
    payer_tax_number?: string; // ИНН плательщика (для legal)
    payer_name?: string; // Имя или название плательщика (для legal)
}

// Объект с информацией о публичном токене.
export interface PublicToken {
    token: string; // Токен
}

// Объект с информацией о публичном токене.
export interface PublicTokenInfo {
    token: string; // Токен
    created_at: string; // Дата создания в формате ISO 8601
    finished_at: string; // Дата завершения в формате ISO 8601
    is_active: boolean; // Можно ли проводить операции по токену: true — можно, false — нельзя
}

// Объект, в котором содержится QR-код для оплаты по СБП
export interface QRInformInteraction {
    content: string; // Ссылка на QR-код
    img: string; // Содержимое QR-кода
}

// Объект с информацией о рекуррентном токене.
export interface RecurrentToken {
    token: string; // Токен
}

// Объект с информацией о рекуррентном токене. Подробнее о рекуррентных платежах и настройках токена здесь.
export interface RecurrentTokenInfo {
    token: string; // Токен
    created_at: string; // Дата создания в формате ISO 8601
    finished_at: string; // Дата завершения в формате ISO 8601
    is_active: boolean; // Можно ли проводить операции по токену: true — можно, false — нельзя
    initiator?: string; // Вид рекуррентного платежа: merchant, client
}

// Объект с информацией о возврате.
export interface Refund {
    id: string; // Уникальный идентификатор возврата
    status: 'in_progress' | 'accepted' | 'declined' | 'error'; // Статус возврата: in_progress, accepted, declined, error
    amount_details: AmountDetails; // Данные о сумме возврата
    created_at: string; // Дата создания
    finished_at?: string; // Дата завершения
    is_chargeback?: boolean; // Флаг чарджбэка
}

// Информация для оплаты через SberPay.
export interface SberPay {
    phone?: string; // Номер телефона для отправки PUSH или SMS
    channel: 'app' | 'web_mobile' | 'web'; // Канал приема оплаты через SberPay: app, web_mobile, web
}

// Объект с настройками виджета для привязки самозанятого к Банку 131.
export interface SelfEmployedWidgetMetadata {
    tax_reference: string; // ИНН самозанятого
}

// Объект с данными для платежей в налоговую.
export interface TaxDetails {
    period?: string; // Период (для расширенного набора параметров)
    kbk?: string; // Код бюджетной классификации (для расширенного набора параметров)
    oktmo?: string; // Общероссийский классификатор территорий муниципальных образований (для расширенного набора параметров)
    payment_reason?: string; // Основание платежа (для расширенного набора параметров)
    document_number?: string; // Номер документа (для расширенного набора параметров)
    document_date?: string; // Дата документа (для расширенного набора параметров)
}

// Объект с данными для уплаты налогов с расширенным набором полей.
export interface TaxFull {
    uin: string; // Уникальный идентификатор начисления
    description: string; // Назначение выплаты
    tax_details: string; // Данные о платеже в налоговую
    payer: TaxRuPayer; // Данные отправителя для платежа в налоговую
    payee: TaxRuPayee; // Данные получателя для платежа в налоговую
}

// Объект с данными для уплаты налогов.
export interface TaxPaymentMethod {
    type: 'tax_short' | 'tax_full'; // Тип налога или способ оплаты: tax_short, tax_full
    tax_full: TaxFull; // Данные для платежей в налоговую с расширенным набором параметров
    tax_details?: TaxDetails; // Данные для платежей в налоговую с минимальным набором полей
}

// Объект с данными для описания периода, за который нужно перечислить платеж в налоговую.
export interface TaxPeriod {
    type: 'month' | 'quarter'; // Тип периода: month, quarter
    number: number; // Номер периода (месяц или квартал)
    year: string; // Год, 4 цифры (например, 2021)
}

// Объект с данными получателя для платежей в налоговую с расширенными параметрами.
export interface TaxRuPayee {
    bik: string; // БИК банка получателя
    account: string; // Номер счета
    account_eks: string; // Единый казначейский счет
    name: string; // Наименование получателя
    inn: string; // ИНН получателя (10 цифр)
}

// Объект с данными отправителя для платежей в налоговую с расширенными параметрами.
export interface TaxRuPayer {
    kpp: string; // КПП отправителя (9 цифр)
    inn: string; // ИНН отправителя (10 цифр)
}

// Объект с токеном и токенизированным номером карты.
export interface TokenizeData {
    number: TokenizeNumber; // Данные о токене
}

// Объект с токенизированным номером карты.
export interface TokenizedCard {
    token: string; // Токен токенизированной карты
}

// Объект с данными токенизированной карты.
export interface TokenizeInfo {
    masked_card_number: string; // Маскированный номер карты
    card_network: string; // Платежная система карты
    card_type: string; // Тип карты
}

// Объект с токеном и данными токенизированной карты.
export interface TokenizeNumber {
    token: string; // Токен
    info: TokenizeInfo; // Данные о карте
}

// Объект с настройками для виджета токенизации.
export interface TokenizeWidgetMetadata {
    access: boolean; // Может ли этот публичный ключ использовать виджет токенизации
}

// Объект с информацией по балансу.
export interface TotalBalance {
    opening: number; // Входящий остаток по счёту на дату начала выписки
    closing: number; // Исходящий остаток по счёту на дату окончания выписки
}

// Объект с информацией по движению средств.
export interface TotalTurnover {
    debet: number; // Сумма списаний по счёту за период выписки
    credit: number; // Сумма пополнений по счёту за период выписки
}

// Массив со списком транзакций.
export interface Transactions {
    amount: number; // Сумма транзакции (неотрицательное значение)
    base_amount?: number; // Сумма операции в валюте (заполняется для валютных операций)
    currency: string; // Валюта операции
    payment_date: Date; // Дата операции
    bank_system_id: string; // Идентификатор платежа
    transaction_id?: string; // Идентификатор транзакции (для API)
    session_id?: string; // Идентификатор сессии (для API)
    purpose: string; // Назначение платежа
    counter_party: CounterParty; // Информация о плательщике
    type: string; // Тип транзакции: credit (пополнение), debet (списание)
}

// Объект с информацией о переводе.
export interface TransferDetails {
    payment_method: CardPaymentMethod; // Способ получения выплаты
    customer: NominalPaymentParticipant; // Информация о плательщике
    recipient: NominalPaymentParticipant; // Информация о получателе
    purpose: string; // Назначение выплаты (в формате: <описание>; card:<маска карты>)
    amount: AmountDetails; // Сумма
}

// Объект с информацией о переводе с расчетного счета.
export interface TransferFromBankAccount {
    description: string; // Описание перевода с расчетного счета
}

// Объект с информацией о переводе с номинального счета.
export interface TransferFromNominalAccount {
    description: string; // Описание перевода с номинального счета
}

// Данные о вашем балансе (счете обеспечения) для отправки выплат.
export interface WalletDetails {
    id: string; // Идентификатор баланса
    amount_details: AmountDetails; // Детали суммы
}

// Объект с данными электронного кошелька.
export interface WalletPaymentMethod {
    type: string; // Тип кошелька
    yoomoney?: YooMoneyWalletPaymentMethod; // Данные кошелька ЮMoney, если тип - yoomoney
}

// Объект с данными кошелька ЮMoney (Яндекс.Деньги).
export interface YooMoneyWalletPaymentMethod {
    account: string; // Номер кошелька ЮMoney, 11–20 цифр
    description?: string; // Назначение платежа для ЮMoney, до 128 символов
}