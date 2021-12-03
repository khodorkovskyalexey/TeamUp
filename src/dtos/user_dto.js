module.exports = class UserDto {
    email;
    id;
    name;
    avatar;

    constructor(model) {
        this.email = model.email;
        this.id = model.id;
        this.name = model.name;
        this.avatar = model.avatar;
    }
}