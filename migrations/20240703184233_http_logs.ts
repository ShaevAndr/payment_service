import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('http_logs', function (table) {
        table.increments('id').primary();
        table.string('description').notNullable();
        table.string('method').notNullable();
        table.string('url').notNullable();
        table.jsonb('requestBody');
        table.jsonb('responseBody');
        table.integer('responseStatus').notNullable();
        table.integer('duration').notNullable();
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
}

