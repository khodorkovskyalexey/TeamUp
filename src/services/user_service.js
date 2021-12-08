const { User, Resume } = require('../database/db');
const SearchedUserDto = require('../dtos/searched_user_dto');

class UserService {
    async findAll(options = {}) {
        const users = await User.findAll({ attributes: ['id', 'name', 'avatar'], include: {
            model: Resume,
            attributes: ['profession'],
        }, ...options });
        return users.map(user => new SearchedUserDto(user));
    }
}

module.exports = new UserService();