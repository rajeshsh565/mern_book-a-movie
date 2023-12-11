const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  signUp,
  login,
  getUserById,
  updateUser,
  deleteUser,
  getUserBooking,
} = require("../controllers/User");

router.route("/").get(getAllUsers);
router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);
router.route("/bookings/:id").get(getUserBooking);

module.exports = router;
