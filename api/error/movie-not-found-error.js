module.exports = class MovieNotFoundError extends Error {
    constructor(id) {
        super(`Movie not found with id ${id}`);
        this.id = id;
    }
}