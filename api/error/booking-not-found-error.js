const NotFoundError = require('./not-found-error.js');

module.exports = class BookingNotFoundError extends NotFoundError {
    constructor(id) {
        super(`Booking not found with this id ${id}`)
        this.id = id;
    }
}