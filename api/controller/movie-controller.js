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
    }
}