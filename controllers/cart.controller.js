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

// TODO: Fix
function createNew(req, res, next) {
  let id = parseInt(req.body.id);
  let name = req.body.name;
  let category = req.body.category;
  let subcategory = req.body.subcategory;
  let price = parseFloat(req.body.price);
  let cost = parseFloat(req.body.cost);
  if (id && name && category && subcategory && price && cost) {
    let params = [id, name, category, subcategory, price, cost];
    try {
      model.createNew(params);
     res.redirect('/menu/all');
    } catch (err) {
      console.error("Error while creating menu ", err.message);
      next(err);
    }
  }
}
// TODO: Fix
function update(req, res, next) {
  let id = parseInt(req.body.id);
  let name = req.body.name;
  let category = req.body.category;
  let subcategory = req.body.subcategory;
  let price = parseFloat(req.body.price);
  let cost = parseFloat(req.body.cost);
  if (id && name && category && subcategory && price && cost) {
    let params = [name, category, subcategory, price, cost, id,];
    try {
      model.update(params);
      res.render("menu-all", { meals: model.getAll(), title: 'All Meals' });
    } catch (err) {
      console.error("Error while creating menu ", err.message);
      next(err);
    }
  }
}


// TODO: Fix
function deleteById(req, res, next) {
  let id = req.params.id;
  try {
    model.deleteById(id);
    res.render("menu-all", { meals: model.getAll(), title: 'Meal #' + id });
  } catch (err) {
    console.error("Error while getting menu ", err.message);
    next(err);
  }
}

module.exports = {
  getAllById,
  getAll,
  createNew,
  deleteById,
  update,
};
