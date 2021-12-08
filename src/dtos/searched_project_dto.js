module.exports = class SearchedProjectDto {
    id;
    title;
    slogan;
    looking_for;
    owner;

    constructor(model) {
        this.id = model.id;
        this.title = model.title;
        this.slogan = model.slogan;
        this.looking_for = model.looking_for;
        this.owner = {
            id: model.user?.id,
            name: model.user?.name,
        };
    }
}