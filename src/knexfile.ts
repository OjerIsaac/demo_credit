import dotenv from 'dotenv';
dotenv.config();
import { Knex } from 'knex';

console.log("Service connected to " + process.env.POSTGRES_DB + " successfully");

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.POSTGRES_HOST,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB
    },
    migrations: {
      extension: 'ts',
      directory: 'db/migrations',
      tableName: 'migrations_history',
    },
    seeds: {
      extension: 'ts',
      directory: 'db/seeds',
    },
  },
};

export default config;
