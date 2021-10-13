const { User } = require('../database/db')

class ProfileService {
    async update_user_data(profileDto, id) {
        const res = await User.update(profileDto, { where: { id } })
        console.log(res)
    }
}

module.exports = new ProfileService()