import { PaymentConfirmWebhook } from "@/modules/banks/bank131/interfaces";
import { Injectable } from "@nestjs/common";
import { Knex } from "knex";
import { InjectConnection } from "nest-knexjs";

@Injectable()
export class SessionRepository {
    constructor(
        @InjectConnection() private readonly knex: Knex
    ) { }

    async getSessionById(id: string): Promise<string> {

        const session = await this.knex
            .select('*')
            .from('sessions')
            .where('id', id)
            .first()

        return session
    }

    async getBySessionId(sessionId: string): Promise<string> {
        const session = await this.knex
            .select()
            .from('sessions')
            .where('session_id', sessionId)
            .first()
        return session
    }

    async updateSession(sessionId: string, webhook: PaymentConfirmWebhook): Promise<void> {
        await this.knex
            .update({ status: webhook.session.status })
            .from('sessions')
            .where('session_id', sessionId)
    }
}