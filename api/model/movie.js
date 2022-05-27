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
    directors: [
        {
            type: String,
            required: true,
            unique: false
        }
    ],
    actors: [
        {
            type: String,
            required: true,
            unique: false
        }
    ],
    releaseDate: {
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
        unique: false,
        required: true
    },
    poster: {
        type: Schema.Types.ObjectId,
        ref: 'Image',
        required: false
    },
    viewings: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Viewing',
            required: false
        }
    ]
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;