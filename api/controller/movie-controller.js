const fs = require('fs');

const MovieNotFoundError = require('../error/movie-not-found-error.js');
const Movie = require('../model/movie.js');
const Image = require('../model/image.js');

module.exports = {

    getMovies: async (req, res, next) => {
        const movies = await Movie.find({});
        res.status(200).json(movies);
    },
    
    getMovieById: async (req, res, next) => {
        const id = req.params.id;
        const movie = await Movie.findById(id).populate(['poster']);
        if (movie) {
            res.status(200).json(movie);
            return;
        }
        next(new MovieNotFoundError(id));
    },

    createMovie: async (req, res, next) => {
        const movie = new Movie(req.body);
        try {
            await movie.save();
            res.status(200).json(movie);
        } catch (error) {
            next (error);
        }
    },

    updateMovie: async (req, res, next) => {
        const id = req.params.id;
        const updates = req.body;
        const movie = await Movie.updateOne({_id: id}, updates);

        if (movie) {
            res.status(200).json(movie);
            return;
        }
        next(new MovieNotFoundError(id));
    },

    deleteMovie: async (req, res, next) => {
        const filter = { _id: req.params.id };

        const movie = await Movie.findOneAndDelete(filter);
        if (movie) {
            return res.status(200).json(movie);
        }
        next(new MovieNotFoundError(id));
    },

    addPoster: async (req, res, next) => {
        const id = req.params.id;
        const movie = Movie.findById(id);

        if (movie) {
            var file = req.file;
            var img = fs.readFileSync(file.path);
            var encoded = img.toString('base64');
            var poster = new Image();
            poster.name = req.body.name;
            poster.img = {
                data: new Buffer.from(encoded, 'base64'),
                contentType: file.mimetype
            }
            await poster.save();

            await Movie.updateOne({_id: id}, {
                poster: poster
            });
            fs.unlinkSync(file.path);

            return res.status(200).contentType(movie.poster.img.contentType).send(movie.poster.img.data);
        }

        next(new MovieNotFoundError(id));
    }
}