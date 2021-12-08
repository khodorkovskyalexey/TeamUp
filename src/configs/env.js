require('dotenv').config()

module.exports = {
    PORT: process.env.PORT,

    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_USERNAME: process.env.DATABASE_USERNAME,

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    JWT_EMAIL_SECRET: process.env.JWT_EMAIL_SECRET,

    API_URL: process.env.API_URL,
    CLIENT_URL: process.env.CLIENT_URL,

    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,

    AVATAR_FOLDER_PATH: process.env.AVATAR_FOLDER_PATH,
}