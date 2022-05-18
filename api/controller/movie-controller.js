const MovieNotFoundError = require('../error/movie-not-found-error.js');
const Movie = require('../model/movie.js');

module.exports = {

    getMovies: async (req, res, next) => {
        const movies = await Movie.find({});
        res.status(200).json(movies);
    },
    
    getMovieById: async (req, res, next) => {
        const id = req.params.id;
        const movie = await Movie.findById(id);
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
        const movie = movies.find((movie) => movie.id === Number(req.params.id))

        if(!movie) {
        return res.status(404).json({success: false, msg: `The movie with the id you requested could not be found`})
        }
        const newMovies = movies.filter((movie) => movie.id !== Number(req.params.id))
        return res.status(200).json({success: true, data: newMovies})
    }
}