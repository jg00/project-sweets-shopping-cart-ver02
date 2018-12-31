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
    if (user) return res.send("User email already exits");

    const newUser = new User({
      email: email,
      password: password,
      name: name
    });

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return res.json({ error: "Unable to create user", err });

      newUser.password = hash;
      newUser
        .save()
        .then(user => res.json(user))
        .catch(err => {
          res.json({
            error: "Db error - Unable to save/register new user",
            err
          });
        });
    });
  });
});

module.exports = router;
