import { Body, Controller, Post } from "@nestjs/common";

import { PaymentConfirmWebhook } from "../banks/bank131/interfaces";
import { WebhookService } from "./services/webhook.service";

@Controller()
export class PaymentController {
    constructor(
        private readonly webhookService: WebhookService
    ) { }

    @Post()
    public async confirmWebhookBank131(@Body() webhook: PaymentConfirmWebhook) {
        return await this.webhookService.updateSession(webhook)
    }
    @Post()
    public async compliteWebhook(@Body() webhook: PaymentConfirmWebhook) {
        return await this.webhookService.updateSession(webhook)
    }
}