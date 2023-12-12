const { default: mongoose } = require("mongoose");
const User = require("../models/User");
const Booking = require("../models/Booking");
const bcrypt = require("bcryptjs");

const getAllUsers = async (req, res) => {
     const allUsers = await User.find();
     res.status(200).json({users: allUsers});
}
const signUp = async (req, res) => {
     const {name, email, password} = req.body;
     existingUser = await User.findOne({ email });
     if (existingUser) {
       return res.status(400).json({ message: "User Already Exists" });
     }
     if(!name || !email || !password){
          return res.status(400).json({message: "All fields are required!"});
     }
     // await user.insertMany({name,email,password});
     const hashedPassword = bcrypt.hashSync(password);
     await User.create({name, email, password: hashedPassword});
     res.status(200).send("Sign Up Complete!");
}
const login = async (req,res) => {
     const {email, password} = req.body;
     const user = await User.findOne({email:email});
     if(user){
          const isPasswordCorrect = bcrypt.compareSync(password, user.password);
          if (isPasswordCorrect) {
            const { email, name, _id } = user;
            return res.status(200).json({ email, name, _id });
          } else {
            return res.status(401).send("Login Failed! Please try again!");
          }
     }
     else{
          return res.status(401).send("Login Failed! Please try again!");
     }
}
const getUserById = async (req,res) => {
     const {id} = req.query;
     if(id){
          if(mongoose.Types.ObjectId.isValid(id)) {
               const user = await User.findById(id);
               if(user){
                    return res.status(200).json({user});
               }
          }
          else
          return res.status(200).send("Please input correct ID!");
     }
     else {
          return res.status(200).send("Invalid Parameter!");
     }
}
const updateUser = async (req,res) => {
     const {id} = req.query;
     if(id){
          if(mongoose.Types.ObjectId.isValid(id)) {
               const {name, email, password} = req.body;
               let hashedPassword;
               if(password){hashedPassword = bcrypt.hashSync(password);}
               await User.findByIdAndUpdate(id, {name, email, password: hashedPassword});
               return res.status(200).send("User Information Updated!");
          }
          else
          return res.status(200).send("Please input correct ID!");
     }
     else {
          return res.status(200).send("Invalid Parameter!");
     }
     
}
const deleteUser = async (req,res) => {
     const {id} = req.query;
     if(id){
          if(mongoose.Types.ObjectId.isValid(id)) {
               const user = await User.findByIdAndDelete(id);
                    return res.status(200).send(`User: ${user.name}, has been successfully removed from Database!`);
          }
          else
          return res.status(200).send("Please input correct ID!");
     }
     else {
          return res.status(200).send("Invalid Parameter!");
     }
}
const getUserBooking = async (req, res, next) => {
  const id = req.params.id;
  let bookings;
  try {
    bookings = await Booking.find({ user: id }).populate("user movie");
  } catch (err) {
    return console.log(err);
  }
  if (!bookings) {
    return res.status(500).json({ message: "Uexpected Error Occured." });
  }
  return res.status(201).json({ bookings });
};

module.exports = {getAllUsers, signUp, login, getUserById, updateUser, deleteUser, getUserBooking};