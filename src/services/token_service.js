const jwt = require('jsonwebtoken')
const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = require('../configs/env')
const { JWT_ACCESS_LIFETIME, JWT_REFRESH_LIFETIME } = require('../configs/jwt_config')

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

    async saveTokens(user_id, refreshToken) {
        const tokenData = await Token.findOne({ userId: user_id })
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        return await Token.create({ userId: user_id, refreshToken })
    }

    validateAccessToken(token) {
        return jwt.verify(token, JWT_ACCESS_SECRET)
    }

    validateRefreshToken(token) {
        return jwt.verify(token, JWT_REFRESH_SECRET)
    }

    async removeToken(refreshToken) {
        await Token.destroy({ where: { refreshToken } })
    }

    async findToken(refreshToken) {
        return await Token.findOne({ where: { refreshToken } })
    }
}

module.exports = new TokenService()