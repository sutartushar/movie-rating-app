const Movies = require("../models/movies.models");

const createMovies = async (movieData) => {
  try {
    const movie = await Movies.create(movieData);
    return movie;
  } catch (error) {
    throw error;
  }
};

const updateMovies = async (movieId, userId, updatedData) => {
  try {
    const movie = await Movies.findOneAndUpdate(
      { _id: movieId, userId },
      { $set: updatedData },
      { new: true }
    );
    return movie;
  } catch (error) {
    console.error("Error updating movie:", error);
    throw error;
  }
};

const deleteMovie = async (movieId, userId) => {
  try {
    const movie = await Movies.findOneAndDelete({ _id: movieId, userId });
    return movie;
  } catch (error) {
    throw error;
  }
};

const getMovieById = async (movieId, userId) => {
  try {
    const movie = await Movies.findOne({ _id: movieId, userId });
    return movie;
  } catch (error) {
    console.error("Error fetching movie from database:", error);
    throw error;
  }
};

const listMovies = async (query, userId) => {
  try {
    const movie = await Movies.find({ ...query, userId });
    return movie;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createMovies,
  updateMovies,
  deleteMovie,
  getMovieById,
  listMovies,
};
