const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// api/auth/test - get - test route
router.get("/test", (req, res) => {
  res.json({ name: "GET api/auth/test" });
});

// api/auth - post - login a user
router.post("/", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const isAdmin = req.body.isAdmin;

  User.findOne({ email: email }).then(user => {
    // if (!user) return res.send("User email not found.");
    if (!user)
      return res.json({
        success: false,
        message: "User email not found."
      });

    if (user) {
      // console.log("who is ths", user);
      let persistedUser = user;

      // check for the password
      bcrypt.compare(password, persistedUser.password, (error, result) => {
        // password match
        if (result) {
          // create a token
          const token = jwt.sign(
            //   { username: persistedUser.username },
            {
              email: persistedUser.email,
              name: persistedUser.name,
              isAdmin: persistedUser.isAdmin
            },
            "well well well"
          );

          // send back the token to the user
          console.log("server - ", token);
          res.json({
            token: token,
            userData: {
              email: persistedUser.email,
              name: persistedUser.name,
              isAdmin: persistedUser.isAdmin
            }
          });
        } else {
          // password dont match
          res.json({
            success: false,
            message: "Password incorrect"
          });
        }
      });
    }
  });
});

module.exports = router;
