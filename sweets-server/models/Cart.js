const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  cartItems: { type: Array }
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
