const express = require("express");
const route = express.Router();
const authToken = require("../middlewares/authToken");
const reviewController = require("../controllers/review.controllers");

//* create movies reviews
route.post("/:id/reviews", authToken, reviewController.rateAndReviewMovie);

//* delete movies reviews
route.delete(
  "/:movieId/reviews/:reviewId",
  authToken,
  reviewController.deleteReview
);
module.exports = route;
