const mongoose = require("mongoose");
const admin = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minLength: 6,
      required: true,
    },
    addedMovies: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Movies",
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Admin", admin);