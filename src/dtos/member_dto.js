module.exports = class MemberDto {
    role;

    constructor(model = {}) {
        this.role = model.role;
    }
}