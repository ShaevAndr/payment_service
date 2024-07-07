import type { Knex } from "knex";

exports.up = function (knex) {
    return knex.schema
        .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
        .createTable('payment_statuses', function (table) {
            table.integer('id').primary();
            table.enu('name', ['created', 'in_progress', 'accepted', 'cancelled', 'error']).notNullable();
        })
        .then(() => {
            return knex('payment_statuses').insert([
                { id: 1, name: 'created' },
                { id: 2, name: 'in_progress' },
                { id: 3, name: 'accepted' },
                { id: 4, name: 'cancelled' },
                { id: 5, name: 'error' }
            ]);
        })
        .then(() => {
            return knex.schema.createTable('payment_orders', function (table) {
                table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
                table.integer('status').unsigned().references('id').inTable('payment_statuses').onDelete('CASCADE');
                table.decimal('total_amount').notNullable();
                table.integer('payer_id').notNullable();
                table.string('payer_type').notNullable();
                table.string('payer_name').notNullable();
                table.bigInteger('payer_tax_number').notNullable();
                table.bigInteger('recipient_tax_number').notNullable();
                table.bigInteger('recipient_bank_bik').notNullable();
                table.timestamp('created_at').defaultTo(knex.fn.now());
                table.timestamp('updated_at').defaultTo(knex.fn.now());
                table.integer('session_id').notNullable();
                table.string('fiscalization_reciept_url');
            });
        })
        .then(() => {
            return knex.schema.createTable('order_descriptions', function (table) {
                table.increments('id').primary();
                table.string('name').notNullable();
                table.integer('order_number').notNullable();
                table.uuid('order').references('id').inTable('payment_orders').onDelete('CASCADE');
            });
        });
};

exports.down = function (knex) {
};