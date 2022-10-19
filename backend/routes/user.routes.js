const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../model/User.model");

require("dotenv").config();

const userManage = express.Router();

userManage.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 6, async function (err, hash) {
    if (err) {
      return res.send("please login again");
    }
    const user = new UserModel({
      name,
      email,
      password: hash,
    });
    await user.save();
    return res.send("Sign up successfull");
  });
});

userManage.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email: email });
  if (!user) {
    return res.send("Entered Wrong Credential");
  }
  const hash_password = user.password;
  const user_id = user._id;
  bcrypt.compare(password, hash_password, function (err, result) {
    // console.log(result);
    if (result) {
      let token = jwt.sign({ email, user_id }, process.env.SECRET_KEY);
      return res.send({ message: "Login Successfull", token: token });
    } else {
      return res.send("Entered Wrong Credential");
    }
  });
});

module.exports = userManage;
