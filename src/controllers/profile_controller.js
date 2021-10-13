const user_service = require('../services/user_service')
const profile_service = require('../services/profile_service')
const ProfileDto = require('../dtos/profile_dto')
const { User } = require('../database/db')

class ProfileController {
    async edit(ctx) {
        const profile_dto = new ProfileDto(ctx.request.body)
        const user_id = ctx.request.body.user.id
        await profile_service.update_user_profile(profile_dto, user_id)
        ctx.status = 200
    }
}

module.exports = new ProfileController()