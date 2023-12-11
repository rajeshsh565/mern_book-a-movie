const express = require("express");
const movieRouter = express.Router();

const {
  addMovie,
  getAllMovie,
  getMovieById,
} = require("../controllers/Movie");

movieRouter.get("/", getAllMovie);
movieRouter.post("/add", addMovie);
movieRouter.get("/:id", getMovieById);

module.exports = movieRouter;
