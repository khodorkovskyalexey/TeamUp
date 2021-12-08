module.exports = class SearchedUserDto {
    id;
    name;
    avatar;
    profession;

    constructor(model) {
        this.id = model.id;
        this.name = model.name;
        this.avatar = model.avatar;
        this.profession = model.resume?.profession;
    }
}