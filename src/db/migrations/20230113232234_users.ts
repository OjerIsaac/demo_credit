import { Knex } from 'knex';

async function createUsersTable(knex: Knex, table: Knex.CreateTableBuilder) {
  table.increments('id').primary();
  table.string('full_name').notNullable();
  table.string('username').notNullable();
  table.string('email').unique().notNullable();
  table.string('wallet').notNullable();
  table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
  table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
}

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', table => createUsersTable(knex, table));
  console.log('Tables created!');
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users');
}