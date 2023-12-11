const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");

const addAdmin = async (req, res, next) => {
  const { email, password } = req.body;

  // if(!email && email.trim() === "" &&
  //     !password && password.trim() === "") {
  //     return res.status(422).json({ message: "Invalid Inputs"})
  // }

  let existingAdmin;
  
  existingAdmin = await Admin.findOne({ email });

  if (existingAdmin) {
    return res.status(400).json({ message: "Admin Already Exists" });
  }

  let admin;
  const hashedPassword = bcrypt.hashSync(password);
    admin = new Admin({ email, password: hashedPassword });
    admin = await admin.save();
  if (!admin) {
    return res.status(400).json({ message: "Unable to create admin" });
  }
  return res.status(201).json({ message: "Admin created", admin: admin, token: token });
};

const adminLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(400).json({ message: "Invalid Inputs" });
  }
  let existingAdmin;
    existingAdmin = await Admin.findOne({ email });
  if (!existingAdmin) {
    return res.status(401).json({ message: "Admin not found" });
  }
  const isPasswordCorrect = bcrypt.compareSync(
    password,
    existingAdmin.password
  );

  if (!isPasswordCorrect) {
    return res.status(401).json({ message: "Incorrect Password! Authorization Failed." });
  }
  const token = jwt.sign({ id: existingAdmin._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return res
    .status(200)
    .json({
      message: "Authentication Successful",
      token,
      _id: existingAdmin._id,
    });
};
const getAdmins = async (req, res) => {
  let admins;
    admins = await Admin.find();
  if (!admins) {
    return res.status(400).json({ message: "cannot get admin" });
  }
  return res.status(200).json({ admins });
};
const getAdminByID = async (req, res, next) => {
  const id = req.params.id;
  let admin;
    admin = await Admin.findById(id).populate("addedMovies");
  if (!admin) {
    return console.log("Cannot find Admin");
  }
  return res.status(200).json({ admin });
};

module.exports = { addAdmin, adminLogin, getAdmins, getAdminByID };
