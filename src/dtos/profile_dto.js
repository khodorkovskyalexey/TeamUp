module.exports = class ProfileDto {
    name;
    age;
    organization;
    avatar;

    constructor(model) {
        this.avatar = model.avatar
        this.name = model.name
        this.age = model.age
        this.organization = model.organization
    }
}