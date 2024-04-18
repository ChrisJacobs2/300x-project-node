"use strict";
const express = require("express");
const app = express();
const path = require("path");


const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// cookie parser
const cookieParser = require('cookie-parser');
app.use(cookieParser('Big_Chungus_ooh_nah_nah')); // super strong secret key

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
  res.render("index", { title: 'Home Page' });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("App listening at http://localhost:" + PORT);
});
