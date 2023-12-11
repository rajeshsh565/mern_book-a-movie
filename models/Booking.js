const mongoose = require("mongoose");

const booking = new mongoose.Schema({
     movie:{
          type: mongoose.Types.ObjectId,
          ref: "Movies"
     },
     date:{
          type: Date,
          require: [true, "Date of Booking is required."]
     },
     seatNumber:{
          type: Number,
          required: [true, "Seat Number is required."]
     },
     user:{
          type: mongoose.Types.ObjectId,
          ref: "User"
     }
})

module.exports = mongoose.model("Booking", booking);