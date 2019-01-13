const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  isAdmin: Boolean,
  cartId: { type: String, default: null },
  cartItems: { type: Array }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
