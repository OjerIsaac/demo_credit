import dotenv from 'dotenv';
dotenv.config();
import { Knex } from 'knex';

console.log("Service connected to " + process.env.MYSQL_DB + " db successfully");

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql',
    connection: {
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB
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
