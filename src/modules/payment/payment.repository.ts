import { Injectable } from "@nestjs/common";
import { Knex } from "knex";
import { InjectConnection } from "nest-knexjs";

@Injectable()
export class PaymentRepository {
    constructor(
        @InjectConnection() private readonly knex: Knex
    ) { }

    public async getSessionId(transactionId: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
}