import React, { useEffect, useState } from "react";
import {
  AppBar,
  Autocomplete,
  Box,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Toolbar,
} from "@mui/material";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import { getAllMovies } from "../Api-Helpers/api-helpers";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "../store";

const Header = () => {
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = localStorage.getItem("userId") ? true: false;
  const [value, setvalue] = useState(false);
  const [movies, setmovies] = useState([]);
  useEffect(() => {
    getAllMovies()
      .then((data) => {
        setmovies(data.movies);
      })
      .catch((err) => console.log(err));
  }, []);
  const updateTabValue = () => {
    setvalue(false);
  }
  const logout = (isAdmin) => {
    dispatch(isAdmin ? adminActions.logout() : userActions.logout());
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#2b2d42" }}>
      <Toolbar>
        <Box width={"20%"}>
          <IconButton LinkComponent={Link} to="/">
            <TheaterComedyIcon />
          </IconButton>
        </Box>
        <Box width={"30%"} margin={"auto"}>
          <Autocomplete
            freeSolo
            options={movies && movies.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                sx={{ input: { color: "white" } }}
                variant="standard"
                {...params}
                placeholder="Search Movies"
              />
            )}
          />
        </Box>
        <Box display={"flex"}>
          <Tabs
            value={value}
            indicatorColor="secondary"
            textColor="secondary"
            onChange={(e, val) => {
              setvalue(val);
            }}
          >
            <Tab value="one" LinkComponent={Link} to="/movies" label="Movies" textColor="white"/>
            
            {!isAdminLoggedIn && !isUserLoggedIn && (
              <Tab value="two" LinkComponent={Link} to="/auth" label="Auth"/>
            )}
            {!isAdminLoggedIn && !isUserLoggedIn && (
              <Tab
                value="three"
                LinkComponent={Link}
                to="/admin"
                label="Admin"
              />
            )}
            {isUserLoggedIn && (
              <Tab
                value="four"
                LinkComponent={Link}
                to="/user"
                label="Profile"
              />
            )}
            {isUserLoggedIn && (
              <Tab
                value="five"
                onClick={() => {logout(false); setvalue(false)}}
                LinkComponent={Link}
                to="/"
                label="Logout"
              />
            )}
            {isAdminLoggedIn && (
              <Tab
                value="six"
                LinkComponent={Link}
                to="/add"
                label="Add Movies"
              />
            )}
            {isAdminLoggedIn && (
              <Tab value="seven" LinkComponent={Link} to="/user-admin" label="Profile" />
            )}
            {isAdminLoggedIn && (
              <Tab
                value="eight"
                onClick={() => {logout(true); setvalue(false)}}
                LinkComponent={Link}
                to="/"
                label="Logout"
              />
            )}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
