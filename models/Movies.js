const mongoose = require("mongoose");

const movies = new mongoose.Schema({
     title:{
          type: String,
          required: [true, "Please provide Movie Title."]
     },
     description:{
          type: String,
          required: [true, "Please provide Movie Description."]
     },
     actors:[{
          type: String,
          required: [true, "Please provide Names of the Actors involved."]
     }],
     releaseDate:{
          type: Date,
          required: [true, "Please provide Movie Release Date."]
     },
     posterUrl:{
          type: String,
          default: "https://i.ibb.co/pRG7g5n/undraw-netflix-q00o.png"
     },
     featured: {
          type: Boolean,
          default: false
     },
     bookings:[{
          type: mongoose.Types.ObjectId,
          ref: "Booking"
     }],
     admin:{
          type: mongoose.Types.ObjectId,
          ref: "Admin"
     }
})
module.exports = mongoose.model("Movies", movies);