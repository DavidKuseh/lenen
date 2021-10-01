import { clean } from 'knex-cleaner';

export function seed(knex) {
  return clean(knex, {
    mode: 'truncate',
    ignoreTables: ['knex_migrations', 'knex_migrations_lock'],
  });
}