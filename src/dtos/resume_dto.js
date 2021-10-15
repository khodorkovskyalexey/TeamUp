module.exports = class ResumeDto {
    profession;
    about_me;
    skills;

    constructor(model) {
        this.profession = model.profession;
        this.about_me = model.about_me;
        this.skills = model.skills;
    }
}