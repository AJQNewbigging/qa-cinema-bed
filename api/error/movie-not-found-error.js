const NotFoundError = require('./not-found-error.js');
module.exports = class MovieNotFoundError extends NotFoundError {
    constructor(id) {
        super(`Movie not found with id ${id}`);
        this.id = id;
    }
}