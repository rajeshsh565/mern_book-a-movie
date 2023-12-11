import { Box, Button, Dialog, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";



const Success = ({ movieSuccess, updateSuccess}) => {
     const navigate = useNavigate();
     const navigateMe = (path) => {
          navigate(path);
     }
  return (
    <Dialog PaperProps={{ style: { borderRadius: 30 } }} open={true}>
      <Box sx={{ padding: "20px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5">
            {movieSuccess ? "Movie Successfully Added!" : `Movie Addition Failed! Check console for Server related errors!`}
          </Typography>
          {movieSuccess && <Button
            sx={{
                 width:"70%",
                 marginLeft:"auto",
                 marginRight:"auto",
                 marginTop:"25px",
                 marginBottom:"5px",
              "&:hover": {
                borderBottom: "1px solid",
                borderBottomColor: "#6e24be",
                color: "#6e24be",
                fontWeight: "bold"
              },
            }}
            onClick={() => {navigateMe("/movies")}}
          >
            {"View All Movies"}
          </Button>}
          {!movieSuccess && <Button
            sx={{
                 width:"70%",
                 marginLeft:"auto",
                 marginRight:"auto",
                 marginTop:"25px",
                 marginBottom:"5px",
              "&:hover": {
                borderBottom: "1px solid",
                borderBottomColor: "#6e24be",
                color: "#6e24be",
                fontWeight: "bold"
              },
            }}
            onClick={() => {updateSuccess(); navigateMe("/add");}}
          >
            {"Retry"}
          </Button>}
        </div>
      </Box>
    </Dialog>
  );
};
export default Success;
