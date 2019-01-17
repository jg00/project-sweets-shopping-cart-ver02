const express = require("express");
const router = express.Router();
const stripe = require("stripe")("sk_test_yfSYgR85Qwqw9Nhj81cZsEKj");

// api/checkout/test
router.get("/test", (req, res) => {
  res.json({ name: "GET api/checkout/test" });
});

//api/checkout/charge
router.post("/charge", (req, res) => {
  /*
    Note: Amount should be calculated on server side based on prices of items retrieved from the database.
    For now we are just sending price from client side.
*/

  const token = req.body.stripeToken;

  stripe.customers
    .create({
      email: req.body.token.card.email,
      source: token
    })
    .then(customer =>
      stripe.charges.create({
        amount: req.body.totalAmount,
        currency: "usd",
        description: "Chocolates",
        source: "tok_visa"
      })
    )
    .then(result => {
      res.json(result);
    });
});

module.exports = router;
