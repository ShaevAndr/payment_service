import type { Knex } from "knex";


exports.up = function (knex) {
    return knex.schema
        .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
        .createTable('statuses', function (table) {
            table.integer('id').primary();
            table.enu('name', ['created', 'in_progress', 'accepted', 'cancelled', 'error']).notNullable();
        })
        .then(() => {
            return knex('statuses').insert([
                { id: 1, name: 'created' },
                { id: 2, name: 'in_progress' },
                { id: 3, name: 'accepted' },
                { id: 4, name: 'cancelled' },
                { id: 5, name: 'error' }
            ]);
        }).
        then(() => {
            return knex.schema.createTable('sessions', function (table) {
                table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
                table.string('session_id').notNullable().unique();
                table.integer('status').unsigned().notNullable();
                table.timestamp('created_at').defaultTo(knex.fn.now());
                table.timestamp('updated_at').defaultTo(knex.fn.now());
                table.string('description');
                table.foreign('status').references('id').inTable('statuses');
            })
        })
        .then(() => {
            return knex.schema.createTable('payments', function (table) {
                table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
                table.string('payment_id').notNullable().unique();
                table.integer('status').unsigned().references('id').inTable('statuses');
                table.decimal('amount').notNullable();
                table.string('type').notNullable();
                table.string('card_hash').nullable();
                table.string('recipient_bank_bik').nullable();
                table.string('recipient_tax_number').notNullable();
                table.string('payer_id').notNullable();
                table.string('payer_type').notNullable();
                table.string('payer_name').notNullable();
                table.string('payer_tax_number').notNullable();
                table.timestamp('created_at').defaultTo(knex.fn.now());
                table.timestamp('updated_at').defaultTo(knex.fn.now());
                table.uuid('session').notNullable();
                table.string('fiscalization_reciept_url').nullable();
                table.foreign('session').references('id').inTable('sessions');
            });
        })
        .then(() => {
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
        })
}
export async function down(knex: Knex): Promise<void> {
}

