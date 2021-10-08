const jwt = require('jsonwebtoken')
const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, JWT_EMAIL_SECRET } = require('../configs/env')
const { JWT_ACCESS_LIFETIME, JWT_REFRESH_LIFETIME, JWT_EMAIL_LIFETIME } = require('../configs/jwt_config')

const { Token } = require('../database/db')

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: JWT_ACCESS_LIFETIME })
        const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_LIFETIME })
        return {
            accessToken,
            refreshToken
        }
    }

    generateEmailToken(payload) {
        return jwt.sign(payload, JWT_EMAIL_SECRET, { expiresIn: JWT_EMAIL_LIFETIME })
    }

    async saveTokens(user_id, refreshToken) {
        const tokenData = await Token.findOne({ userId: user_id })
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        return await Token.create({ userId: user_id, refreshToken })
    }

    validateAccessToken(token) {
        try {
            return jwt.verify(token, JWT_ACCESS_SECRET)
        } catch (e) {
            return null
        }
    }

    validateRefreshToken(token) {
        try {
            return jwt.verify(token, JWT_REFRESH_SECRET)
        } catch (e) {
            return null
        }
    }

    validateEmailToken(token) {
        try {
            return jwt.verify(token, JWT_EMAIL_SECRET)
        } catch (e) {
            return null
        }
    }

    async removeToken(refreshToken) {
        await Token.destroy({ where: { refreshToken } })
    }

    async findToken(refreshToken) {
        return await Token.findOne({ where: { refreshToken } })
    }
}

module.exports = new TokenService()