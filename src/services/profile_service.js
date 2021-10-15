const { User, Resume, Contact } = require('../database/db')

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
}

module.exports = new ProfileService()