const express = require('express');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

const movieController = require('../controller/movie-controller.js');
const router = express.Router();

router.get('/', movieController.getMovies);
router.get('/:id', movieController.getMovieById);
router.post('/', movieController.createMovie);
router.put('/:id', movieController.updateMovie);
router.delete('/:id', movieController.deleteMovie);
router.post('/:id/add-poster', upload.single('img'), movieController.addPoster);
router.get('/find/whats-on', movieController.findWhatsOn);
router.get('/find/new-releases', movieController.findNewReleases);

module.exports = router;