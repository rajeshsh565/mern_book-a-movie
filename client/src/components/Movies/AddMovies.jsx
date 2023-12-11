import { Button, Checkbox, Dialog, FormLabel, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { addMovie } from '../../Api-Helpers/api-helpers'
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useNavigate } from 'react-router-dom';
import Success from './Success';

const labelProps={
    mt:1,
    mb:1,
}
const AddMovies = () => {
  const [inputs, setInputs] = useState({title:"",description:"",posterUrl:"",releaseDate:"",featured:false});
  const handleChange=(e)=>{
        setInputs((prevState) =>({...prevState,[e.target.name]:e.target.value}))
    }
    const [actors, setActors] = useState([]);
    const [actor,setActor]=useState();
    const [movieSuccess, setMovieSuccess] = useState();
    const [displaySuccess, setDisplaySuccess] = useState(false);
    const navigate = useNavigate();

    const navigateMe= () =>{
      navigate("/");
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        addMovie({inputs,actors}).then((res)=>{console.log(res); if(res){setMovieSuccess(true)}}).catch((err)=>{console.log(err); setMovieSuccess(false);})
        setDisplaySuccess(true);
        if(movieSuccess){
          navigate("/movies")
        }
      }

    const updateSuccess = () => {
      setDisplaySuccess(!displaySuccess);
    }

  return (
          <div>
            <form onSubmit={handleSubmit}>
              <Box
                minWidth={"500px"}
                width={"50%"}
                padding={10}
                margin="auto"
                display={"flex"}
                flexDirection="column"
                boxShadow={"10px 10px 20px #ccc"}
              >
                <Typography
                  textAlign={"center"}
                  variant="h5"
                  fontFamily={"vardana"}
                  fontWeight={"bold"}
                  marginBottom={3}
                >
                  {" "}
                  Add New Movie
                </Typography>

                <FormLabel sx={{ labelProps }}>Title</FormLabel>
                <TextField
                  value={inputs.title}
                  onChange={handleChange}
                  name="title"
                  variant="standard"
                  margin="normal"
                />

                <FormLabel sx={{ labelProps }}>Description</FormLabel>
                <TextField
                  value={inputs.description}
                  onChange={handleChange}
                  name="description"
                  variant="standard"
                  margin="normal"
                />

                <FormLabel sx={{ labelProps }}>Poster Url</FormLabel>
                <TextField
                  value={inputs.posterUrl}
                  onChange={handleChange}
                  name="posterUrl"
                  variant="standard"
                  margin="normal"
                />

                <FormLabel type={"date"} sx={{ labelProps }}>
                  Release Date
                </FormLabel>
                <TextField
                  type={"date"}
                  value={inputs.releaseDate}
                  onChange={handleChange}
                  name="releaseDate"
                  variant="standard"
                  margin="normal"
                />

                <FormLabel sx={{ labelProps }}>Actor(s)</FormLabel>
                <Box display={"flex"}>
                  <TextField
                    value={actor}
                    name="actor"
                    onChange={(e) => setActor(e.target.value)}
                    variant="standard"
                    margin="normal"
                  />

                  <Button
                    sx={{ marginBottom: 3 }}
                    onClick={() => {
                      setActors([...actors, actor]);
                      setActor("");
                    }}
                  >
                    <AddBoxIcon fontSize="medium"></AddBoxIcon>
                  </Button>
                  <Box
                    sx={{ width: "400px", height: "100px", overflow: "auto" }}
                  >
                    {actors.map((actor) => {
                      return (
                        <span
                          style={{
                            fontWeight: "bold",
                            textTransform: "capitalize",
                            fontStyle: "italic",
                          }}
                        >
                          {actor + ", "}
                        </span>
                      );
                    })}
                  </Box>
                  <Button
                    onClick={() => setActors([])}
                    sx={{
                      width: "10%",
                      height: "25px",
                      marginTop: 8,
                      marginLeft: 1,
                      bgcolor: "#fff",
                      "&:hover": { bgcolor: "fff", fontWeight: "bold" },
                    }}
                  >
                    Clear Actors
                  </Button>
                </Box>

                <FormLabel sx={{ labelProps }}>Featured</FormLabel>
                <Checkbox
                  checked={inputs.featured}
                  onClick={(e) => {
                    setInputs((prevState) => ({
                      ...prevState,
                      featured: e.target.checked,
                    }));
                  }}
                  name="featured"
                  sx={{ mr: "auto" }}
                ></Checkbox>

                <Button
                  type="submit"
                  variant="container"
                  sx={{
                    width: "30%",
                    margin: "auto",
                    bgcolor: "#2b2b42",
                    ":hover": { bgcolor: "#121217" },
                    color: "white",
                  }}
                >
                  {" "}
                  Add new Movie{" "}
                </Button>
                <Button
                  onClick={navigateMe}
                  sx={{
                    marginTop: 2,
                    borderRadius: 3,
                    "&:hover": {
                      width: "30%",
                      marginLeft: "auto",
                      marginRight: "auto",
                      borderBottom: "2px solid",
                      borderBottomColor: "#6e24be",
                      color: "#6e24be",
                      fontWeight: "bold",
                    },
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </form>
            {displaySuccess && <Success movieSuccess={movieSuccess} updateSuccess={updateSuccess}></Success>}
          </div>
  );
}

export default AddMovies
