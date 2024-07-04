import { Bank } from "@/core/interfaces/bank.interface";
import { CreateSessionRequest, CreateSessionResponse, PaymentCancelRequest, PaymentCancelResponse, PaymentConfirmRequest, PaymentConfirmResponse } from "./interfaces";
import { HttpService } from "../http/http.service";
import { ConfigService } from "@nestjs/config";
import { RequestWidgetToken, ResponseWidgetToken } from "./interfaces/widgetTocken";
import { BALANCE, CONFIRM_PAYMENT, CREATE_SESSION, WIDGET_TOKEN } from "./lib";
import { BalanceRequest, BalanceResponse } from "./interfaces/balance";

export class Bank131 implements Bank {
    ROOT_URL: string;
    constructor(
        private readonly http: HttpService,
        private readonly configService: ConfigService,
        private readonly X_PARTNER_PROJECT: string,
        private readonly X_PARTNER_SIGN: string,
        private readonly headers: Record<string, string>
    ) {
        this.X_PARTNER_PROJECT = this.configService.get('X_PARTNER_PROJECT')
        this.X_PARTNER_SIGN = 'УТОЧНИТЬ ГДЕ ВЗЯТЬ И КАК ПОЛЬЗОВАТЬСЯ'
        this.ROOT_URL = this.configService.get('NODE_ENV') === 'production' ? 'https://bank131.ru/' : 'https://demo.bank131.ru/'
        this.headers = this.getHeader()
    }
    public async getWidgetToken(sessionId: string): Promise<ResponseWidgetToken> {
        const body: RequestWidgetToken = {
            acquiring_widget: {
                session_id: sessionId
            }
        }

        return await this.http.post<ResponseWidgetToken>(`${this.ROOT_URL}${WIDGET_TOKEN}`, body, { headers: this.headers })
    };

    public async createSession(amount: number, metadata: string): Promise<CreateSessionResponse> {
        const body: CreateSessionRequest = {
            amount_details: {
                amount,
                currency: "rub"
            },
            metadata
        }
        return await this.http.post<CreateSessionResponse>(`${this.ROOT_URL}${CREATE_SESSION}`, body, { headers: this.headers })
    }

    public async getBalance(): Promise<BalanceResponse> {
        const body: BalanceRequest = {
            request_datetime: new Date().toISOString()
        }

        return await this.http.post<BalanceResponse>(`${this.ROOT_URL}${BALANCE}`, body, { headers: this.headers })
    };

    linkSelfEmployed: () => any;

    getTokenizedCard: () => string;

    getPaymentNotification: () => any;

    async confirmPayment(sessionId: string): Promise<PaymentConfirmResponse> {
        const body: PaymentConfirmRequest = {
            session_id: sessionId,
        }
        return await this.http.post<PaymentConfirmResponse>(`${this.ROOT_URL}${CONFIRM_PAYMENT}`, body, { headers: this.headers })
    }

    public async cancelPayment(sessionId: string): Promise<PaymentCancelResponse> {
        const body: PaymentCancelRequest = {
            session_id: sessionId,
        }
        return await this.http.post<PaymentCancelResponse>(`${this.ROOT_URL}${CONFIRM_PAYMENT}`, body, { headers: this.headers })
    }

    getCheck: () => any;

    private getHeader() {
        return {
            'X-PARTNER-PROJECT': this.X_PARTNER_PROJECT,
            "X-PARTNER-SIGN": this.X_PARTNER_SIGN,
            "Content-Type": "application/json"
        }
    }
}