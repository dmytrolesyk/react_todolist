module.exports = {
  ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.BASE_URL || 'http://localhost',
  PORT: process.env.PORT || 3008,
  MONGODB_USER: process.env.MONGODB_USER || 'dmytro',
  MONGODB_PASSWORD: process.env.MONGODB_PASSWORD || 'database123',
  MONGODB_DB_NAME: process.env.MONGODB_DB_NAME || 'todolist',
  JWT_SECRET: process.env.JWT_SECRET || 'secret',
}
