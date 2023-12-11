require("dotenv").config();
const Movies = require("./models/Movies");
const connectDB = require("./db/connect");
const express = require("express");
const app = express();
const users = require("./users.json");

const start = async () =>{
     try {
          await connectDB(process.env.MONGODB_URI);
          await Movies.deleteMany();
          await Movies.create(users);
          console.log("population success");
          process.exit(0);
     } catch (error) {
          console.log(error);
          process.exit(1);
     }
}
start();