const profile_service = require('../services/profile_service')
const ProfileDto = require('../dtos/profile_dto')
const ResumeDto = require('../dtos/resume_dto')
const ContactDto = require('../dtos/contact_dto')
class ProfileController {
    async edit(ctx) {
        const user_id = ctx.request.body['user'].id

        const profile_dto = new ProfileDto(ctx.request.body)
        await profile_service.update_user_data(profile_dto, user_id)
        
        if(ctx.request.body['resume']) {
            const resume_dto = new ResumeDto(ctx.request.body['resume'])
            await profile_service.update_resume(resume_dto, user_id)
        }

        if(ctx.request.body['contact']) {
            ctx.request.body['contact'].forEach(elem => {
                const contact_dto = new ContactDto(elem)
                profile_service.update_contact(contact_dto, user_id)
            })
            
        }

        ctx.status = 200
    }
}

module.exports = new ProfileController()