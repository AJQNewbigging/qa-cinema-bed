const express = require('express');

const movieController = require('../controller/movie-controller.js');
const router = express.Router();

router.get('/', movieController.getMovies);
router.get('/:id', movieController.getMovieById);
router.post('/', movieController.createMovie);
router.put('/:id', movieController.updateMovie);
router.delete('/:id', movieController.deleteMovie);

module.exports = router;