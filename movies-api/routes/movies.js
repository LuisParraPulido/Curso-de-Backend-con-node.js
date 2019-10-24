const express = require('express');
const joi = require('@hapi/joi');
const MoviesService = require('../services/movies');

const {
  movieIdSchema,
  createMovieSchema,
  updateMovieSchema
} = require('../utils/schemas/movies')

const validationHandler = require('../utils/middleware/validationHandler')

const cacheResponse = require('../utils/cacheResponse');
const { SIXTY_MINUTES_IN_SECONDS, FIVE_MINUTES_IN_SECONDS } = require('../utils/time');

function moviesApi(app) {
  const router = express.Router();
  app.use('/api/movies', router);

  const moviesService = new MoviesService();

  router.get('/', async function(req, res, next) {
    cacheResponse(res, FIVE_MINUTES_IN_SECONDS)
    const { tags } = req.query;

    try {
      const movies = await moviesService.getMovies({ tags });
      // throw new Error('Error getting movies');

      res.status(200).json({
        data: movies,
        message: 'movies listed'
      })
    } catch (err) {
      next(err);
    }
  })

  router.get('/:movieId', validationHandler(joi.object({ movieId: movieIdSchema}), 'params'), async function(req, res, next) {
    cacheResponse(res, SIXTY_MINUTES_IN_SECONDS)

    const { movieId } = req.params;
    try {
      const movies = await moviesService.getMovie({ movieId });

      res.status(200).json({
        data: movies,
        message: 'movie retrieved'
      })
    } catch (err) {
      next(err);
    }
  })

  router.post('/', validationHandler(createMovieSchema), async function(req, res, next) {
    const { body: movie } = req;
    try {
      const createMovieId = await moviesService.createMovie({ movie });

      res.status(201).json({
        data: createMovieId,
        message: 'movies created'
      })
    } catch (err) {
      next(err);
    }
  })

  router.put('/:movieId', validationHandler(joi.object({ movieId: movieIdSchema}), 'params'), validationHandler(updateMovieSchema), async function(req, res, next) {
    const { movieId } = req.params;
    const { body: movie } = req;
    try {
      const updateMovieId = await moviesService.updateMovie({
        movieId,
        movie
      });

      res.status(200).json({
        data: updateMovieId,
        message: 'movies update'
      })
    } catch (err) {
      next(err);
    }
  })

  router.delete('/:movieId', validationHandler(joi.object({ movieId: movieIdSchema}), 'params'), async function(req, res, next) {
    const { movieId } = req.params;
    try {
      const deleteMovieId = await moviesService.deleteMovie({ movieId });

      res.status(200).json({
        data: deleteMovieId,
        message: 'movies deleted'
      })
    } catch (err) {
      next(err);
    }
  })

  router.patch('/:movieId', async function(req, res, next) {
    const { movieId } = req.params;
    const { body: movie } = req;
    try {
      const changeMovieId = await moviesService.changeMovie({ 
        movieId,
        movie
      });

      res.status(200).json({
        data: changeMovieId,
        message: 'movies change'
      })
    } catch (err) {
      next(err);
    }
  })
}


module.exports = moviesApi;