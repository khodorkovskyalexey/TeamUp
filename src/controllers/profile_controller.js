const profile_service = require('../services/profile_service')
const token_service = require('../services/token_service')
const candidate_service = require('../services/candidate_service')

const file_error = require('../exceptions/file_error')

const ProfileDto = require('../dtos/profile_dto')
const ResumeDto = require('../dtos/resume_dto')
const ContactDto = require('../dtos/contact_dto')

class ProfileController {
    async getOwnProfile(ctx) {
        const user_id = ctx.request.user['id'];
        const profile_data = await findProfile(user_id);
        const candidates = await candidate_service.findAllProjects(user_id);

        ctx.body = { ...profile_data, candidates }
    }

    async getProfileById(ctx) {
        const user_id = ctx.params['user_id'];
        ctx.body = await findProfile(user_id);
    }

    async edit(ctx) {
        const user_id = ctx.request.user['id']

        const profile_dto = new ProfileDto(ctx.request.body)
        profile_service.update_user_data(profile_dto, user_id)
            
        if(ctx.request.body['resume']) {
            const resume_dto = new ResumeDto(ctx.request.body['resume'])
            profile_service.update_resume(resume_dto, user_id)
        }

        if(ctx.request.body['contacts']) {
            ctx.request.body['contacts'].forEach(elem => {
                if(elem.contact_name) {
                    const contact_dto = new ContactDto(elem)
                    if(contact_dto.url) {
                        profile_service.update_contact(contact_dto, user_id)
                    } else {
                        profile_service.delete_contact(contact_dto, user_id)
                    }
                }
            })
        }
        
        ctx.status = 200
    }

    async set_avatar(ctx) {
        if(!ctx.file) {
            throw file_error.IsNotExist('Отправленный аватар не найден')
        }
        const id = token_service.getIdInAccessTokenHeader(ctx.get('Authorization'))
        await profile_service.set_avatar(ctx.file.filename, id)
        
        ctx.status = 200
    }
}

async function findProfile(user_id) {
    const profile = await profile_service.get_user_data(user_id);
    const profile_dto = new ProfileDto(profile);
    const resume_dto = new ResumeDto(profile.resume);

    const contact_dto = profile.contacts.map(contact => new ContactDto(contact));

    return { ...profile_dto, avatar: profile.avatar, resume: resume_dto, contacts: contact_dto };
}

module.exports = new ProfileController()