import { IPaymentOrder } from "@/core/interfaces";
import { Injectable, Logger } from "@nestjs/common";
import { Knex } from "knex";
import { InjectConnection } from "nest-knexjs";
import { CommonResponseDto } from "../dto/common.dto";

@Injectable()
export class OrdersRepository {
    logger = new Logger(OrdersRepository.name)
    constructor(
        @InjectConnection() private readonly knex: Knex
    ) { }

    async createOrder(orders: IPaymentOrder[]): Promise<CommonResponseDto> {
        try {
            await this.knex('payments')
                .insert(orders)
            return { status: 'ok' }
        } catch (e) {
            return this.generateError(e.message)
        }
    }

    async getByOrderId(orderId: string): Promise<CommonResponseDto & { order?: IPaymentOrder }> {
        try {
            const order = await this.knex
                .select()
                .from('payments')
                .where('payment_id', orderId)
            return order[0] ? { status: 'ok', order: order[0] } : this.generateError('ордер не найден')
        } catch (e) {
            return this.generateError(e.message)
        }
    }

    async updateOrder(orderId: string, update: Partial<IPaymentOrder>): Promise<CommonResponseDto> {
        try {
            const result = await this.knex
                .update(update)
                .from('payments')
                .where('payment_id', orderId)
            return result ? { status: 'ok' } : this.generateError('Платёж не найдена')
        } catch (e) {
            return this.generateError(e.message)
        }
    }

    private generateError(message: string): CommonResponseDto {
        this.logger.error('Ошибка в базе ордеров', message)
        return {
            status: 'error',
            error: {
                code: 'ошибка в базе данных',
                description: message
            }
        }
    }
}