const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

// api/user/test - get - test route
router.get("/test", (req, res) => {
  res.json({ name: "GET api/user/test" });
});

// api/user/register - post - add user
router.post("/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  User.findOne({ email: email }).then(user => {
    if (user)
      return res.json({
        error: {
          success: false,
          message: "User email already exits"
        }
      });

    const newUser = new User({
      email: email,
      password: password,
      name: name
    });

    bcrypt.hash(password, 10, (err, hash) => {
      if (err)
        return res.json({
          error: {
            success: false,
            message: "Unable to create user.  Check password."
          }
        });

      newUser.password = hash;
      newUser
        .save()

        .then(user =>
          res.json({
            // user: user,
            error: {
              success: true,
              message: null
            }
          })
        )
        .catch(err => {
          res.json({
            error: {
              success: false,
              message:
                "Unable to register new user.  Complete all required fields."
            }
          });
        });
    });
  });
});

module.exports = router;
