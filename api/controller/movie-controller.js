const fs = require('fs');

const MovieNotFoundError = require('../error/movie-not-found-error.js');
const Movie = require('../model/movie.js');
const Image = require('../model/image.js');
const Viewing = require('../model/viewing.js');

module.exports = {

    getMovies: async (req, res, next) => {
        var movies = [];
        const order = req.query.order && req.query.order == "desc" ? -1 : 1;
        console.log(req.query.poster);
        if (req.query.poster && req.query.poster === "true") {
            movies = await Movie.find({}).populate(['poster','viewings']).sort({ releaseDate: order });
        } else {
            movies = await Movie.find({}).populate(['viewings']).sort({ releaseDate: order });
        }
        res.status(200).json(movies);
    },
    
    getMovieById: async (req, res, next) => {
        const id = req.params.id;
        var movie = {};
        if (req.query.poster && req.query.poster === "true") {
            movie = await Movie.findById(id).populate(['poster', 'viewings']);
        } else {
            movie = await Movie.findById(id).populate(['viewings']);
        }
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
        var movie = Movie.findById(id);

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

            try {
                await poster.save();

                movie = await Movie.updateOne({_id: id}, {
                    poster: poster
                });
                fs.unlinkSync(file.path);

                return res.status(200).json(movie);
            } catch (error) {
                next(error);
            }
        }

        next(new MovieNotFoundError(id));
    },

    addViewing: async (req, res, next) => {
        const id = req.params.id;
        const movie = Movie.findById(id);

        if (movie) {
            const viewing = new Viewing(req.body);
            try {
                await viewing.save();

                await Movie.updateOne({_id: id}, {
                    $push: { viewings: [ viewing ] }
                });
                res.status(200).json(viewing);
            } catch (error) {
                next(error);
            }
            return;
        }
        next(new MovieNotFoundError(id));
    },

    findWhatsOn: async (req, res, next) => {
        var movies = [];
        if (req.query.poster && req.query.poster === "true") {
            movies = await Movie.find({ releaseDate: { $lte: new Date() } })
            .populate(['poster'])        
            .sort({ releaseDate: 1 });
        } else {
            movies = await Movie.find({ releaseDate: { $lte: new Date() } })
            .sort({ releaseDate: 1 });
        }
        res.status(200).json(movies);
    },

    findNewReleases: async (req, res, next) => {
        var movies = [];
        if (req.query.poster && req.query.poster === "true") {
            movies = await Movie.find({ releaseDate: { $gt: new Date() } })
            .populate(['poster'])        
            .sort({ releaseDate: 1 });
        } else {
            movies = await Movie.find({ releaseDate: { $gt: new Date() } })
            .sort({ releaseDate: 1 });
        }
        res.status(200).json(movies);
    }

}