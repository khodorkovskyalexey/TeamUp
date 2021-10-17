module.exports = class ProfileDto {
    name;
    age;
    organization;

    constructor(model) {
        this.name = model.name
        this.age = model.age
        this.organization = model.organization
    }
}