import { Controller } from "@nestjs/common";

import { PaymentConfirmWebhook } from "../banks/bank131/interfaces";

@Controller()
export class PaymentController {
    constructor(
        private readonly webhookService: WebhookService
    ) { }

    public async confirmWebhookBank131(webhook: PaymentConfirmWebhook): Promise<TokenizedCardResponseDto> {
        return await this.webhookService.updateSession(webhook)
    }

    public async compliteWebhook(webhook: PaymentConfirmWebhook): Promise<TokenizedCardResponseDto> {
        return await this.webhookService.updateSession(webhook)
    }
}