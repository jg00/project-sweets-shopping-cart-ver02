const express = require("express");
const router = express.Router();
// const stripe = require("stripe")("sk_test_Ok17MK57yvmiPgTaGXrm2ern"); // old
const stripe = require("stripe")("sk_test_yfSYgR85Qwqw9Nhj81cZsEKj");

// api/donations/test
router.get("/test", (req, res) => {
  res.json({ name: "GET api/donations/test" });
});

//api/donations/charge
router.post("/charge", async (req, res) => {
  const totalAmount = req.body.totalAmount;

  try {
    let { status } = await stripe.charges.create({
      amount: totalAmount,
      currency: "usd",
      description: "An example charge",
      source: "tok_visa",
      receipt_email: "tosomeemail@mail.com"
    });

    res.json({ status });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
});

module.exports = router;
