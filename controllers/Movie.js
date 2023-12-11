const jwt = require("jsonwebtoken");
const Movie = require("../models/Movies");
const Admin = require("../models/Admin");

const addMovie = async (req, res, next) => {
  const extractedToken = req.headers.authorization.split(" ")[1];
  if (!extractedToken || extractedToken.trim() === "") {
    return res.status(404).json({ message: "Token not found" });
  }
  let adminId;
  
  //verify token
  jwt.verify(extractedToken, process.env.JWT_SECRET, (err, decrypted) => {
    if (err) {
      return res.status(401).json({ message: "Invalid Token" });
    } else {
      adminId = decrypted.id;
    }
  });
  
  //create new movie
  const { title, description, releaseDate, posterUrl, featured, actors } =
  req.body;
  if (
    !title ||
    title.trim() === "" ||
    !description ||
    description.trim() === "" ||
    !posterUrl ||
    posterUrl.trim() === ""
  ) {
    return res.status(422).json({ message: `Invalid Inputs` });
  }
  await Movie.insertMany({title, description, releaseDate, posterUrl, featured, actors, admin:adminId});
  res.status(201).send("Movie Added!");
};

const getAllMovie = async (req, res, next) => {
  let movies;
  try {
    movies = await Movie.find();
  } catch (err) {
    return console.log(err);
  }

  if (!movies) {
    return res.status(500).json({ message: "Request failed" });
  }
  return res.status(200).json({movies});
};

const getMovieById = async (req, res, next) => {
  const id = req.params.id;
  let movie;

  try {
    movie = await Movie.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!movie) {
    return res.status(404).json({ message: "Invalid Movie Id" });
  }
  return res.status(200).json({ movie });
};

module.exports = { addMovie, getAllMovie, getMovieById };
