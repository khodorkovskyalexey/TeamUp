const { User, Resume, Contact } = require('../database/db')
const { AVATAR_FOLDER_PATH } = require('../configs/env')

class ProfileService {
    async update_user_data(profileDto, id) {
        await User.update(profileDto, { where: { id } })
    }

    async update_resume(resumeDto, id) {
        await Resume.update(resumeDto, { where: { userId: id } })
    }

    async update_contact(contact_data, id) {
        await Contact.findOne({ where: { userId: id, contact_name: contact_data.contact_name } })
            .then(contact => {
                if(contact) {
                    contact.url = contact_data.url
                    contact.save()
                } else {
                    Contact.create({ ...contact_data, userId: id })
                }
            })
    }

    async get_avatar(id) {
        const user_from_db = await User.findByPk(id, { attributes: ['avatar'] })
        return AVATAR_FOLDER_PATH + '/' + user_from_db.avatar
    }

    async set_avatar(avatar, id) {
        const avatar_path = AVATAR_FOLDER_PATH + '/' + avatar
        await User.findByPk(id)
            .then(user => {
                if(user.avatar !== avatar_path) {
                    user.avatar = avatar_path
                    user.save()
                }
            })
    }
}

module.exports = new ProfileService()