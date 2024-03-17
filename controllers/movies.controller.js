const moviesService = require("../services/movies.services");

const createMovie = async (req, res) => {
  try {
    const { title, director, genre, releaseYear, description } = req.body;
    const userId = req.user.id;
    const movie = await moviesService.createMovies({
      title,
      director,
      genre,
      releaseYear,
      description,
      userId,
    });
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const updatedData = req.body;

    const movie = await moviesService.updateMovies(id, userId, updatedData);

    //* console.log(" controller updatedData", updatedData);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json(movie);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const movie = await moviesService.getMovieById(id, userId);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json(movie);
  } catch (error) {
    console.error("Error fetching movie:", error);
    return res.status(500).json({ message: error.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const success = await moviesService.deleteMovie(id, userId);

    if (!success) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(204).send();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting movie", error: error.message });
  }
};

const listMovies = async (req, res) => {
  try {
    const { genre, releaseYear, director } = req.query;
    const userId = req.user.id;
    const query = {};

    if (genre) {
      query.genre = genre;
    }

    if (releaseYear) {
      query.releaseYear = releaseYear;
    }

    if (director) {
      query.director = director;
    }

    const movies = await moviesService.listMovies(query, userId);

    res.status(200).json(movies);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting movie", error: error.message });
  }
};

module.exports = {
  createMovie,
  updateMovie,
  deleteMovie,
  getMovieById,
  listMovies,
};
