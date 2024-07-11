import { ISession, ISessionWithOrders } from "@/core/interfaces";
import { Injectable, Logger } from "@nestjs/common";
import { Knex } from "knex";
import { InjectConnection } from "nest-knexjs";
import { CommonResponseDto } from "../dto/common.dto";

@Injectable()
export class SessionRepository {
    logger = new Logger(SessionRepository.name)
    constructor(
        @InjectConnection() private readonly knex: Knex
    ) { }

    async createSession(session: ISession): Promise<CommonResponseDto & { sessionId?: string }> {
        try {
            const sessions = await this.knex('sessions')
                .insert(session)
                .returning('id')

            return { status: 'ok', sessionId: sessions[0] }
        } catch (e) {
            return this.generateError(e.message)
        }
    }

    async getBySessionId(sessionIds: string[]): Promise<CommonResponseDto & { sessions?: ISessionWithOrders[] }> {
        try {
            const sessionsWithOrders = await this.knex('sessions')
                .whereIn('id', sessionIds)
                .join('payments', 'sessions.id', '=', 'payments.session')
                .select('sessions.*', 'payments.*')

            return sessionsWithOrders.length ? { status: 'ok', sessions: sessionsWithOrders } : this.generateError('Сессия не найдена')
        } catch (e) {
            return this.generateError(e.message)
        }
    }

    async getSessionById(sessionId: string): Promise<CommonResponseDto & { session?: ISession }> {
        try {
            const session = await this.knex
                .select()
                .from('sessions')
                .where('session_id', sessionId).then(data => data)
            return session[0] ? { status: 'ok', session: session[0] } : this.generateError('Сессия не найдена')
        } catch (e) {
            return this.generateError(e.message)
        }
    }

    async updateSession(sessionId: string, update: Partial<ISession>): Promise<CommonResponseDto> {
        try {

            const result = await this.knex
                .update(update)
                .from('sessions')
                .where('session_id', sessionId)
            return result ? { status: 'ok' } : this.generateError('Сессия не найдена')
        } catch (e) {
            return this.generateError(e.message)
        }
    }

    private generateError(message: string): CommonResponseDto {
        this.logger.error('Ошибка в базе сессий', message)
        return {
            status: 'error',
            error: {
                code: 'ошибка в базе данных',
                description: message
            }
        }
    }
}