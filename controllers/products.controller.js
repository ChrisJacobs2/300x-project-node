"use strict";

const express = require("express");
const app = express();

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const model = require("../models/products.model");

function getAll(req, res, next) {
  let products = model.getAll();
  try {

    res.render("products", { products: products, title: 'All Products' });
    // res.json(model.getAll());
  } catch (err) {
    console.error("Error while getting products ", err.message);
    next(err);
  }
}

function getAllByCategory(req, res, next) {
  let category = req.params.category;
  let products = model.getAllByCategory(category);
  let catName = model.getCategoryName(category);
  let title = catName.categoryName + ' Products';
  try {

    res.render("products", { products: products, title: title });
    // res.json(model.getAll());
  } catch (err) {
    console.error("Error while getting products ", err.message);
    next(err);
  }
}

function getOneById(req, res, next) {
  let id = req.params.id;
  try {
    let meal = model.getOneById(id);
    res.render("item-details", { meal: meal, title: 'Meal #' + id });
    //res.json(model.getOneById(req.params.id));
  } catch (err) {
    console.error("Error while getting menu ", err.message);
    next(err);
  }
}


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


function searchByName(req, res, next) {
  let term = req.query.term;
  let meals = [];
  if (term) {
    let searchTerm = '%' + term + '%';
    meals = model.search(searchTerm);
  }
  else {
    meals = model.getAll();
  }
  try {
    res.render("menu-all", { meals: meals, title: '' + term + ' Meals' });
  } catch (err) {
    console.error("Error while getting menu ", err.message);
    next(err);
  }
}

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
  getAll,
  getAllByCategory,
  getOneById,
  createNew,
  searchByName,
  deleteById,
  update,
};
