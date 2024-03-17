const express = require("express");
const route = express.Router();
const moviesController = require("../controllers/movies.controller");
const authToken = require("../middlewares/authToken");

//* create movies
route.post("/", authToken, moviesController.createMovie);

//* update movies
route.put("/:id", authToken, moviesController.updateMovie);

//* delete movie
route.delete("/:id", authToken, moviesController.deleteMovie);

//* get details of a single movie
route.get("/:id", authToken, moviesController.getMovieById);

//*List Movies
route.get("/", authToken, moviesController.listMovies);

module.exports = route;
