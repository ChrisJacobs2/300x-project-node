"use strict";
const express = require("express");
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');

const app = express();
const path = require("path");

// database connection
const sqlite = require("better-sqlite3");
const db = new sqlite(path.join(__dirname, ".data", "demo.db"));

// Google OAuth credentials
const CLIENT_ID = '30979687573-vc5f7n2hv24cvad93klc84mlfci7gbd6.apps.googleusercontent.com';
const CLIENT_SECRET = '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';

// Configure session management
app.use(session({ secret: 'Big_Chungus_Ohh_Nah_Nah', resave: false, saveUninitialized: true }));

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Configure Google Strategy
passport.use(new GoogleStrategy({
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callbackURL: "http://localhost:8000/auth/google/callback",
  passReqToCallback: true
},
(req, accessToken, refreshToken, profile, done) => {
  // User information retrieved from Google
  const user = {
      id: profile.id,
      email: profile.emails[0].value,
      displayName: profile.displayName
  };
  
  // Add the user to the database if they don't already exist

  // Prepare SQL statement
  const sql = 'INSERT OR IGNORE INTO Users (userID, dateCreated, timeCreated, userEmail, userType) VALUES (?, ?, ?, ?, ?)';

  // Get current date and time, and other user data
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();
  const userType = 'customer'; // default user type. Admins must be promoted manually.
  let params = [user.id, date, time, user.email, userType];
  
  // Execute SQL statement
  const result = db.prepare(sql).run(params);
  console.log("User authenticated. SQL request result : ", result);
  
  // we could make an sql request for the user, but we already have the information
  return done(null, user);
}));

// Serialize and deserialize user data for session management
passport.serializeUser((user, done) => {
  done(null, { id: user.id, email: user.email }); 
});
passport.deserializeUser((userData, done) => {
  // Simulate fetching user data from your database
  const user = userData;  // Replace with actual user data retrieval
  done(null, user);
});

// Middleware to ensure user is authenticated
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
      return next();
  }
  res.redirect('/auth/google');
}

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// cookie parser
const cookieParser = require('cookie-parser');
app.use(cookieParser('Big_Chungus_ooh_nah_nah')); // super strong secret key

// uuid for generating unique user ids
const uuid = require('uuid');


// views
// USING EJS ENGINE
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static('public'));

// routes
const productsRouter = require("./routes/products.route");
app.use("/products", productsRouter);
const cartRouter = require("./routes/cart.route");
app.use("/cart", ensureAuthenticated, cartRouter);
const detailsRouter = require("./routes/details.route");
app.use("/details", ensureAuthenticated, detailsRouter);
const adminRouter = require("./routes/admin.route");
app.use("/admin", adminRouter);


// Home Page
app.get("/", (req, res) => {
  res.render("index", { title: 'Home Page' });
});

// Google authentication routes
// I guess I'll be eating 50 hot dogs at once.
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/'
}));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("App listening at http://localhost:" + PORT);
});

app.get('/user-info', ensureAuthenticated, (req, res) => {
  console.log("ID: ", req.user.id);
  res.send('User id printed to console');
});