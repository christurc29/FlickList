const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/movies')

router.get('/:id', moviesController.getMovieTitle)

module.exports = router;