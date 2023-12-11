import { Box, Button, Dialog, Typography } from "@mui/material";

const BookingSuccess = ({ changeError }) => {
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
            {"Access Denied! Please Try Again!"}
          </Typography>
          <div></div>
          <Button
            sx={{
              "&:hover": {
                borderBottom: "1px solid",
                borderBottomColor: "#6e24be",
                width: "30%",
                marginLeft: "auto",
                marginRight: "auto",
                color: "#6e24be",
                fontWeight: "bold",
              },
            }}
            onClick={() => changeError()}
          >
            OK!
          </Button>
        </div>
      </Box>
    </Dialog>
  );
};
export default BookingSuccess;
