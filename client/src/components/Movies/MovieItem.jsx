import { Button, Card, CardActions, CardContent, Typography} from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { styled } from "@mui/material/styles"
// import Button, { ButtonProps } from "@mui/material/Button";

// const CustomButton =
//   styled(Button)<ButtonProps>(({ theme }) => ({
//     color: theme.palette.getContrastText(purple[500]),
//     backgroundColor: purple[500],
//     "&:hover": {
//       backgroundColor: purple[700],
//     },
//   }));


const MovieItem = ({title, releaseDate, posterUrl, id}) => {
  return (
    <Card
      sx={{
        width: 250,
        margin: 2,
        height: 500,
        borderRadius: 5,
        ":hover": { boxShadow: "10px 10px 20px #ccc" },
      }}
    >
      <img height={"60%"} width="100%" src={posterUrl} alt={title} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" fontWeight={"bolder"}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {new Date(releaseDate).toDateString()}
          </Typography>
        </CardContent>
      </div>
      <CardActions>
        <Button
          LinkComponent={Link}
          to={`/booking/${id}`}
          fullWidth
          sx={{
            margin: "auto",
            borderRadius:7,
            "&:hover": {
              color: "#6e24be",
              borderBottom: "2px solid",
              borderBottomColor: "#6e24be",
              bgcolor: "#fff",
              fontWeight: "bold"
            },
          }}
          size="small"
          className="Button"
        >
          Book
        </Button>
      </CardActions>
    </Card>
  );
}
 
export default MovieItem