const mongoose = require("mongoose");

const user = new mongoose.Schema({
     name: String,
     email: {
          type: String,
          required: [true, "Email is required!"],
          unique: true
     },
     password: {
          type: String,
          required: [true, "Password is required!"],
          minLength: 6
     },
     bookings: [{
          type: mongoose.Types.ObjectId,
          ref: 'Booking'
     }]
});

module.exports = mongoose.model("User", user);