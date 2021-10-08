const bcrypt = require('bcrypt')
const { User } = require('../database/db')
const AuthError = require('../exceptions/auth_error')
const UserDto = require('../dtos/user_dto')
const TokenService = require('./token_service')
const email_service = require('./email_service')

class UserService {
    async registration(email, name, password) {
        await User.findOne({ where: { email } })
            .then(candidate => {
                if(candidate) {
                    throw AuthError.BadRequest(`Пользователь с почтой ${email} уже существует`)
                }
            })

        const hash_password = await bcrypt.hash(password, 10)
        const user = await User.create({ email, name, password: hash_password })

        await email_service.sendActivationMail(email, "https://github.com/")

        return await generateResponse(user)
    }

    async login(email, password) {
        const user = await User.findOne({ where: { email } })
        if(!user) {
            throw AuthError.BadRequest(`Пользователь с почтой ${email} не найден`)
        }

        //проверка пароля
        await bcrypt.compare(password, user.password)
            .then(result => {
                if(!result) {
                    throw AuthError.BadRequest('Пароль неверный')
                }
            })

        return await generateResponse(user)
    }

    async logout(refreshToken) {
        await TokenService.removeToken(refreshToken)
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw AuthError.UnauthorizedError()
        }
        const userData = TokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await TokenService.findToken(refreshToken)
        if (!userData || !tokenFromDb) {
            throw AuthError.UnauthorizedError()
        }

        const user = await User.findByPk(userData.id)
        return await generateResponse(user)
    }
}

async function generateResponse(user) {
    const userDto = new UserDto(user)
    const tokens = TokenService.generateTokens({ ...userDto })
    await TokenService.saveTokens(userDto.id, tokens.refreshToken)
    return { ...tokens, user: userDto }
}

module.exports = new UserService()