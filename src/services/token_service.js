const jwt = require('jsonwebtoken')

const { Token } = require('../database/db')

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '15m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    async saveTokens(user_id, refreshToken) {
        const tokenData = await Token.findOne({ user_id })
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await Token.create({ user_id, refreshToken })
        return token
    }
}

module.exports = new TokenService()