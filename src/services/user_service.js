const { User } = require('../database/db')
const AuthError = require('../exceptions/auth_error')
const UserDto = require('../dtos/user_dto')
const TokenService = require('./token_service')
const bcrypt = require('bcrypt')

class UserService {
    async registration(email, name, password) {
        await User.findOne({ where: { email } })
            .then(candidate => {
                if(candidate) {
                    throw AuthError.BadRequest(`Пользователь с таким ${email} уже существует`)
                }
            })

        const hash_password = await bcrypt.hash(password, 10)
        const user = await User.create({ email, name, password: hash_password })

        const userDto = new UserDto(user)

        const tokens = TokenService.generateTokens({ ...userDto })
        await TokenService.saveTokens(userDto.id, tokens.refreshToken)

        return { ...tokens, user: userDto }
    }
}

module.exports = new UserService()