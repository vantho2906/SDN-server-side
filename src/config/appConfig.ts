import dotenv from 'dotenv';

dotenv.config();

const AppConfig = {
  MONGO_DB_URI:
    process.env.MONGO_DB_URI || 'mongodb://localhost:27017/LAST_ASM',
  PORT: parseInt(process.env.PORT) || 5000,
  JWT_SECRET: process.env.JWT_SECRET || '!@#$',
  JWT_EXPIRE: parseInt(process.env.JWT_EXPIRE) || 1000 * 60 * 60 * 24,
};

export default AppConfig;
