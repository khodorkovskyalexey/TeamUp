module.exports = class ProjectInProfileDto {
    role;
    isOwner;
    project;
    owner;

    constructor(model) {
        this.role = model.role;
        this.isOwner = model.isOwner;
        this.project = {
            id: model?.project?.id,
            title: model?.project?.title,
            slogan: model?.project?.slogan,
        }
        this.owner = model?.owner;
    }
}