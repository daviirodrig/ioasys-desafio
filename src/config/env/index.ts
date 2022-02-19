require('dotenv/config');
export default {
  nodeEnv: process.env.NODE_ENV || 'local',
  port: parseInt(process.env.PORT, 10) || 3000,
  jwtSecret: process.env.JWT_SECRET,

  dbHost: process.env.DB_HOST || 'localhost',
  dbPort: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
  dbUser: process.env.POSTGRES_USER,
  dbPass: process.env.POSTGRES_PASSWORD,
  dbName: process.env.POSTGRES_DB,
};
