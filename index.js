const express = require("express");
const moongose = require("mongoose");
require("dotenv").config();

const app = express();

const personRoutes = require("./routes/personRoutes");

const DB_USER = process.env.USER;
const DB_PASSWORD = process.env.PASSWORD;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use("/person", personRoutes);

moongose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@crudcluster.pduiq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(3000);
    console.log("MongoDB connected!");
  })
  .catch((err) => console.log(err));
