/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv/config');

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  entities: ['dist/**/*.entity.js'],
  synchronize: true,
  migrations: ['dist/**/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
