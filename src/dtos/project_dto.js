module.exports = class ProjectDto {
    title;
    description;
    looking_for;
    slogan;
    contacts;

    constructor(model) {
        this.title = model.title
        this.description = model.description
        this.looking_for = model.looking_for
        this.slogan = model.slogan
        this.contacts = model.contacts
    }
}