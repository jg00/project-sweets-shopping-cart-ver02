const express = require("express");
const router = express.Router();
const stripe = require("stripe")("sk_test_Ok17MK57yvmiPgTaGXrm2ern");
// const Product = require("../models/Product");

// api/donations/test
router.get("/test", (req, res) => {
  res.json({ name: "GET api/donations/test" });
});

//api/donations/charge
router.post("/charge", async (req, res) => {
  // console.log("to charge", req.body.stripeToken);
  // console.log("to charge", req.body.amount);  // undefined
  // console.log("to charge", req.body); // undefined

  const totalAmount = req.body.totalAmount;
  console.log(totalAmount);

  try {
    let { status } = await stripe.charges.create({
      amount: totalAmount,
      currency: "usd",
      description: "An example charge",
      source: "tok_visa",
      receipt_email: "tosomeemail@mail.com"
    });

    // original
    // let { status } = await stripe.charges.create({
    //   amount: 2000,
    //   currency: "usd",
    //   description: "An example charge",
    //   source: "tok_visa"
    // });

    res.json({ status });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
});

module.exports = router;
