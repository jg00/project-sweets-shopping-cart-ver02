const express = require("express");
const app = express();
// const stripe = require("stripe")("sk_test_Ok17MK57yvmiPgTaGXrm2ern");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
const products = require("./routes/products");
const users = require("./routes/users");
const auth = require("./routes/auth");
const donations = require("./routes/donations");

const db = require("./config/keys").mongoUrl;
mongoose
  .connect(
    db,
    { useNewUrlParser: true, useCreateIndex: true }
  )
  .then(() => console.log("Connected to database!"))
  .catch(err => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(require("body-parser").text());
app.use(cors());
app.use(express.static(`${__dirname}/public`));
app.use("/api/products", products);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/donations", donations);

app.listen(PORT, () => {
  console.log("Server started on port ${PORT}", PORT);
});
