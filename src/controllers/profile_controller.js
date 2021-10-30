const profile_service = require('../services/profile_service')
const token_service = require('../services/token_service')

const file_error = require('../exceptions/file_error')

const ProfileDto = require('../dtos/profile_dto')
const ResumeDto = require('../dtos/resume_dto')
const ContactDto = require('../dtos/contact_dto')

class ProfileController {
    async edit(ctx) {
        const user_id = ctx.request.body['user'].id

        const profile_dto = new ProfileDto(ctx.request.body)
        profile_service.update_user_data(profile_dto, user_id)
            
        if(ctx.request.body['resume']) {
            const resume_dto = new ResumeDto(ctx.request.body['resume'])
            profile_service.update_resume(resume_dto, user_id)
        }

        if(ctx.request.body['contacts']) {
            ctx.request.body['contacts'].forEach(elem => {
                const contact_dto = new ContactDto(elem)
                profile_service.update_contact(contact_dto, user_id)
            })
        }

        ctx.body = "Ok"
        ctx.status = 200
    }

    async set_avatar(ctx) {
        if(!ctx.file) {
            throw file_error.IsNotExist('Отправленный аватар не найден')
        }
        const id = token_service.getIdInAccessTokenHeader(ctx.get('Authorization'))
        await profile_service.set_avatar(ctx.file.filename, id)
    }
}

module.exports = new ProfileController()