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

// uuid for generating unique user ids
const uuid = require('uuid');


//views
// USING EJS ENGINE
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

//routes
const productsRouter = require("./routes/products.route");
app.use("/products", productsRouter);
const cartRouter = require("./routes/cart.route");
app.use("/cart", cartRouter);
const detailsRouter = require("./routes/details.route");
app.use("/details", detailsRouter);


// Create a cookie for the user if it doesn't have one yet. This is used to identify them.
// If we end up using google auth, I'll eat 50 hot dogs AT ONCE. 
app.use((req, res, next) => {
  const userId = req.cookies.userId;
  if (!userId) {
    const newUserId = uuid.v4(); // Generate a new unique user ID
    res.cookie('userId', newUserId, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true }); // Set maxAge for 7 days
  }
  next(); // Pass control to the next middleware or route
});


//Home Page
app.get("/", (req, res) => {
  res.render("index", { title: 'Home Page' });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("App listening at http://localhost:" + PORT);
});
