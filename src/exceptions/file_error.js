module.exports = class FileError extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static IsNotExist(message) {
        return new FileError(404, message)
    }
}