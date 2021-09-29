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
        const token = await Token.create({ userId: user_id, refreshToken })
        return token
    }

    validateAccessToken(token) {
        
    }

    validateRefreshToken(token) {
        
    }

    async removeToken(refreshToken) {
        await Token.destroy({ where: { refreshToken } })
            .then(res => {
                return res
            })
    }

    async findToken(refreshToken) {
        
    }
}

module.exports = new TokenService()