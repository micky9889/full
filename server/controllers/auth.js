const User = require("../models/Users");
const bcrypt = require("bcryptjs"); //convert password
const jwt = require("jsonwebtoken"); //auth

//@route POST localhost:8000/api/register
//@desc route Register
//@access public
exports.createRegister = async (req, res) => {
  const { name, password } = req.body;
  try {
    //check user exist
    let user = await User.findOne({ name });
    if (user) {
      return res.status(400).json({ msg: "User already exist" });
    }
    user = new User({
      name,
      password,
    });

    //Encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    //payload return jsonwebtoken
    const payload = {
      user: {
        name: user.name,
        role: user.role,
      },
    };
    jwt.sign(payload, "jwtSecret", { expiresIn: 60 * 60 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    //check eror
    console.log(error.message);
    res.status(500).send("server Error");
  }
};

//@route POST localhost:8000/api/login
//@desc route Login
//@access Public
exports.login = async (req, res) => {
  const { name, password } = req.body;
  try {
    //check user
    // let user = await User.findOne({ name });//only compare
    let user = await User.findOneAndUpdate({ name }, { new: true }); //update login last-time
    if (!user) {
      return res.status(400).json({ msg: "Username Invaliid" });
    }

    //Compare Encrypt password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Password Invalid" });
    }

    //payload return jsonwebtoken
    const payload = {
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    };
    jwt.sign(payload, "jwtSecret", { expiresIn: 60 * 60 }, (err, token) => {
      if (err) throw err;
      res.json({ token ,payload});
    });
  } catch (error) {
    //check eror
    console.log(error.message);
    res.status(500).send("server Error");
  }
};

//@route POST localhost:8000/api/current-user private
exports.currentUser = async (req, res) => {
  try {
    const user = await User.findOne({ name: req.user.name }).select('-password').exec();
    res.json(user);
  } catch (err) {
    throw new Error(err);
  }
};
