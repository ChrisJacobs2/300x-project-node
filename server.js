"use strict";
const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true })); // used for auth
app.use(express.json());


//views
// USING EJS ENGINE
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

//routes
const productsRouter = require("./routes/products.route");
app.use("/products", productsRouter);


//Home Page
app.get("/", (req, res) => {
  res.render("index", { title: 'Home Page', user: req.user });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("App listening at http://localhost:" + PORT);
});
