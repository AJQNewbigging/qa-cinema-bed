const NotFoundError = require('./not-found-error.js');
module.exports = class ViewingNotFoundError extends NotFoundError {
    constructor(id) {
        super(`Viewing not found with id ${id}`);
        this.id = id;
    }
}