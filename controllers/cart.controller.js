"use strict";

const express = require("express");
const app = express();

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const model = require("../models/cart.model");

// TODO: finish implementing. We want this to get all CartProducts for a given cartId (the cookes.userId)
// The cookie is included in the req object, by the cookie-parser middleware. It is accessed via
// req.cookies.userId
function getAllById(req, res, next) {
  
  const user = req.user.id;
  const userId = "1";
  let cart_items = model.getAllById(userId);
  // console.log("cart_items: ", cart_items);
  try {
    res.render("cart", { cart_items: cart_items, title: 'All Products' });
    // res.render("cart");
    // res.json(model.getAll());
  } catch (err) {
    console.error("Error while getting menu ", err.message);
    next(err);
  }
}

// renders the cart page with all items in the cart
function getAll(req, res, next) {
  
  const user = req.user.id;
  
  // If there's no cart associated with the user, create one
  if (!(model.checkCart(user))) {
    console.log("User ", user, " has no cart. Creating one now...")
    const response = model.createNewCart(user);
    console.log("SQL response: ", response);
  } else {
    console.log("User ", user, " just checked their cart.")
  }

  let cart_items = model.getAllById(user);
  try {
    res.render("cart", { cart_items: cart_items, title: 'All Products' });
    // res.render("cart");
    // res.json(model.getAll());
  } catch (err) {
    console.error("Error while getting cart ", err.message);
    next(err);
  }
  
}


// for admins, they probably should have a separate MVC setup.
function update(req, res, next) {
  let id = parseInt(req.body.id);
  let quantity = parseInt(req.body.quantity);
  if (id && quantity) {
    let params = [quantity, id];
    try {
      model.update(params);
      res.sendStatus(203);
    } catch (err) {
      console.error("Error while creating menu ", err.message);
      next(err);
    }
  }
}



function deleteById(req, res, next) {
  let id = req.params.id;
  try {
    model.deleteById(id);
    res.sendStatus(204);
  } catch (err) {
    console.error("Error while deleting cartproduct ", err.message);
    next(err);
  }
}

module.exports = {
  getAllById,
  getAll,
  deleteById,
  update,
};
