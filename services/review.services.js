const Review = require("../models/review.models");

const rateAndReviewMovies = async (reviewData) => {
  try {
    const review = await Review.create(reviewData);
    return review;
  } catch (error) {
    throw error;
  }
};

const deleteReview = async (movieId, reviewId, userId) => {
  try {
    const review = await Review.findOneAndDelete({
      _id: reviewId,
      userId: userId,
      movieId: movieId,
    });
    return review;
  } catch (error) {
    throw error;
  }
};

module.exports = { rateAndReviewMovies, deleteReview };
