const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    name: {
        type: String,
        unique: false,
        required: true
    },
    genre: {
        type: String,
        unique: false,
        required: true
    },
    synopsis: {
        type: String,
        unique: false,
        required: true
    },
    director: {
        type: String,
        unique: true,
        required: true
    },
    yearOfRelease: {
        type: Date,
        unique: false,
        required: true
    },
    runtime: {
        type: Number,
        unique: false,
        required: true
    },
    certification: {
        type: String,
        unqiue: false,
        required: true
    }
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;