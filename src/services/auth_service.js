const bcrypt = require('bcrypt')
const { User } = require('../database/db')
const AuthError = require('../exceptions/auth_error')
const UserDto = require('../dtos/user_dto')
const token_service = require('./token_service')

class UserService {
    async activate(token) {
        const tokenData = token_service.validateEmailToken(token)
        if(!tokenData) {
            throw AuthError.BadRequest(`Ссылка недействительна!`)
        }

        const { email, name, hash_password } = tokenData

        /**
         * Надо вынести в отдельную функцию или мидлвар
         */
        await User.findOne({ where: { email } })
            .then(candidate => {
                if(candidate) {
                    throw AuthError.BadRequest(`Пользователь уже существует`)
                }
            })

        const user = await User.create({ email, name, password: hash_password })
        await user.createResume()

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
        await token_service.removeToken(refreshToken)
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw AuthError.UnauthorizedError()
        }
        const userData = token_service.validateRefreshToken(refreshToken)
        const tokenFromDb = await token_service.findToken(refreshToken)
        if (!userData || !tokenFromDb) {
            throw AuthError.UnauthorizedError()
        }

        const user = await User.findByPk(userData.id)
        return await generateResponse(user)
    }
}

async function generateResponse(user) {
    const userDto = new UserDto(user)
    const tokens = token_service.generateTokens({ ...userDto })
    await token_service.saveTokens(userDto.id, tokens.refreshToken)
    return { ...tokens, user: userDto }
}

module.exports = new UserService()