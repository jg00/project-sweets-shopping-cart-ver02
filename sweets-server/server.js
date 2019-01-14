const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
const products = require("./routes/products");
const users = require("./routes/users");
const auth = require("./routes/auth");
const donations = require("./routes/donations");
const checkout = require("./routes/checkout");
const carts = require("./routes/carts");

const db = require("./config/keys").mongoUrl;
mongoose
  .connect(
    db,
    { useNewUrlParser: true, useCreateIndex: true }
  )
  .then(() => console.log("Connected to database!"))
  .catch(err => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(require("body-parser").text());
app.use(cors());
app.use(express.static(`${__dirname}/public`));
app.use("/api/products", products);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/donations", donations);
app.use("/api/checkout", checkout);
app.use("/api/carts", carts);

app.listen(PORT, () => {
  console.log("Server started on port ${PORT}", PORT);
});
