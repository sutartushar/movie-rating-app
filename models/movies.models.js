const mongoose = require("mongoose");

const moviesSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    trim: true,
  },
  director: {
    type: String,
    require: true,
    trim: true,
  },
  genre: {
    type: String,
    require: true,
    trim: true,
  },
  releaseYear: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const moviesModel = mongoose.model("Movies", moviesSchema);

module.exports = moviesModel;
