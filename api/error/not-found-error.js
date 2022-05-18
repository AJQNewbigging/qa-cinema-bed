module.exports = class NotFoundError extends Error {
    constructor(message) {
        super(`Item not found: ${message}`);
        this.name = "Error: not found";
    }
}