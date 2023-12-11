require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const errorHandlerMiddleware = require("./error-handlers/error-handler");
const notFoundMiddleware = require("./error-handlers/not-found");
const userRouter = require("./routes/user-route.js");
const adminRouter = require("./routes/admin-route");
const movieRouter = require("./routes/movie-route");
const bookingRouter = require("./routes/booking-route");
const path = require("path");
const url = require("url");
// const cors = require("cors");

app.use(express.static(path.resolve(__dirname, "./client/dist")));
app.use(express.json());

// app.use(cors());
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET", "POST", "PUT", "DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });



// Routes!!!
app.use("/api/v1/users", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/movies", movieRouter);
app.use("/api/v1/booking", bookingRouter);
app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

// Middlewares!!!
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);


const port = process.env.PORT || 3000;
app.listen(port, async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    console.log(`server is listening at port: ${port}`);
  } catch (error) {
    console.log(error);
  }
});
