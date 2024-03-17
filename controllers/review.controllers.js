const reviewMovies = require("../services/review.services");

const rateAndReviewMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, text } = req.body;
    const userId = req.user.id;

    const review = await reviewMovies.rateAndReviewMovies({
      movieId: id,
      rating,
      text,
      userId,
    });

    res.status(201).json(review);
  } catch (error) {
    console.error("Error submitting review:", error);
    res
      .status(500)
      .json({ message: "Error submitting review", error: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { movieId, reviewId } = req.params;
    const userId = req.user.id;

    console.log(
      "Deleting review with movieId:",
      movieId,
      "and reviewId:",
      reviewId,
      "by userId:",
      userId
    );

    const review = await reviewMovies.deleteReview(movieId, reviewId, userId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    console.log("review", review);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting review:", error);
    res
      .status(500)
      .json({ message: "Error deleting review", error: error.message });
  }
};

module.exports = { rateAndReviewMovie, deleteReview };
