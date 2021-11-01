module.exports = class ContactDto {
    contact_name;
    url;

    constructor(model) {
        this.contact_name = model.contact_name;
        this.url = model.url;
    }
}