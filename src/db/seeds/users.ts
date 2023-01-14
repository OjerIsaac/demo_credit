import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        { full_name: 'user1', username: 'users11', email: 'user1@example.com', wallet: '1000', password: '$2b$10$JFCihzzFX5dnBcC0gYgExOjQRokVca33PtBYOSSaR0u7QZ3N/tISy' }, // password
        { full_name: 'user2', username: 'users22', email: 'user2@example.com', wallet: '1000', password: '$2b$10$JFCihzzFX5dnBcC0gYgExOjQRokVca33PtBYOSSaR0u7QZ3N/tISy' }, // password
        { full_name: 'user3', username: 'users33', email: 'user3@example.com', wallet: '1000', password: '$2b$10$JFCihzzFX5dnBcC0gYgExOjQRokVca33PtBYOSSaR0u7QZ3N/tISy' } // password
    ]);
};
