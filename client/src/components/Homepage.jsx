import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MovieItem from "./Movies/MovieItem";
import { Link } from "react-router-dom";
import { getAllMovies } from "../Api-Helpers/api-helpers";

const Homepage = () => {
  const [movies, setmovies] = useState();
  useEffect(() => {
    getAllMovies()
      .then((data) => setmovies(data.movies))
      .catch((err) => console.log(err));
  },[]);
  return (
    <Box width={"100%"} height={"100%"} margin={"auto"} marginTop={2}>
      <Box margin={"auto"} width={"70%"} height={"40vh"} padding={2}>
        <img
          src="https://static.tnn.in/thumb/msid-100476872,thumbsize-94826,width-1280,height-720,resizemode-75/100476872.jpg"
          alt="movie-banner"
          width={"100%"}
          height={"100%"}
        />
      </Box>
      <Box padding={5} margin={"auto"}>
        <Typography variant="h4" textAlign={"center"}>
          Latest Release
        </Typography>
      </Box>
      <Box
        display="flex"
        margin="auto"
        width="80%"
        justifyContent={"center"}
        flexWrap="wrap"
      >
        {movies &&
          movies
            .slice(0, 4)
            .map((movie, index) => (
              <MovieItem
                id={movie._id}
                title={movie.title}
                posterUrl={movie.posterUrl}
                releaseDate={movie.releaseDate}
                key={index}
              />
            ))}
      </Box>
      <Box display="flex" padding={5} margin="auto">
        <Button
          LinkComponent={Link}
          to="/movies"
          variant="outlined"
          sx={{
            margin: "auto",
            color: "#2b2d32",
            "&:hover": {
              bgcolor: "#6e24be",
              color: "#fff",
              fontWeight: "medium",
              borderColor: "#000",
            },
          }}
        >
          View All Movies
        </Button>
      </Box>
    </Box>
  );
};

export default Homepage;
