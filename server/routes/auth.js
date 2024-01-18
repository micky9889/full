const express = require("express");
const router = express.Router();
const User=require('../models/Users')

//import controllers
const { login, createRegister, currentUser } = require("../controllers/auth");

//import middleware
const { auth,adminCheck } = require("../middleware/auth");

//@route POST localhost:8000/api/regiter
router.post("/register", createRegister);

//@route GET localhost:8000/api/login public
router.post("/login", login);

//@route POST localhost:8000/api/current-user private
router.post("/current-user", auth, currentUser);

//@route POST localhost:8000/api/current-user private
router.post("/current-admin", auth, adminCheck,currentUser);

module.exports = router;
