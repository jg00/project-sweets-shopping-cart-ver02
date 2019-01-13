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
        error: {
          success: false,
          message: "User email not found. Please register."
        }
      });

    if (user) {
      console.log("who is ths", user);
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
              isAdmin: persistedUser.isAdmin,
              cartId: user.cartId,
              cartItems: user.cartItems
            },
            error: {
              success: true,
              message: "User Logged In"
            }
          });
        } else {
          // password dont match
          res.json({
            error: {
              success: false,
              message: "Password incorrect"
            }
          });
        }
      });
    }
  });
});

/* ORIGINAL VERSION THAT WORKS
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
        error: {
          success: false,
          message: "User email not found."
        }
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
            },
            error: {
              success: true,
              message: "User Logged In"
            }
          });
        } else {
          // password dont match
          res.json({
            error: {
              success: false,
              message: "Password incorrect"
            }
          });
        }
      });
    }
  });
});

*/

// api/auth/updateusercartid
router.post("/updateusercartid", (req, res) => {
  const email = req.body.email;
  // const password = req.body.password;
  // const name = req.body.name;
  // const isAdmin = req.body.isAdmin;
  const cartid = req.body.cartId;
  console.log("cartid ", req.body);

  User.findOneAndUpdate(
    {
      email: email
    },
    { $set: { cartId: cartid } },
    { safe: true, upsert: true, new: true },
    function(err, user) {
      if (err) {
        res.json({
          error: {
            success: false,
            message: "User cartid was not updated."
          }
        });
      } else {
        res.json({
          user: user,
          error: {
            success: true,
            message: "User cartid updated in the database."
          }
        });
      }
    }
  );
});

module.exports = router;
