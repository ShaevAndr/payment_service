import { PaymentConfirmWebhook } from "@/modules/banks/bank131/interfaces";
import { Injectable } from "@nestjs/common";
import { SessionRepository } from "../repositories/session.repository";
import { STATUS } from "../constants/statuses";

@Injectable()
export class WebhookService {
    constructor(
        private readonly sessionRepository: SessionRepository
    ) { }
    public async updateSession(webhook: PaymentConfirmWebhook): Promise<void> {
        await this.sessionRepository.updateSession(webhook.session.id, { status: STATUS[webhook.session.status] })
    }
}