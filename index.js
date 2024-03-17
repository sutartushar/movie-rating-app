require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const mongoose = require("mongoose");
const cors = require("cors");
const authRoute = require("./routes/auth.routes");
const movieRoute = require("./routes/movies.routes");
const reviewRouter = require("./routes/review.routes");
app.use(cors());
app.use(express.json());

//*user auth route
app.use("/api/users", authRoute);

//* movies route
app.use("/api/movies", movieRoute);

//* Ratings and Reviews routes
app.use("/api/movies", reviewRouter);

mongoose
  .connect(process.env.MONGODBURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(`failed to connect ${err} :(...`));
app.listen(port, () => {
  console.log(`Server is running on ${port} :)...`);
});

//? Routes-->middleware-->controllers-->services-->model
