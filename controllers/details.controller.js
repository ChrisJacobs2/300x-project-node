"use strict";

const express = require("express");
const app = express();

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const model = require("../models/details.model");

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

module.exports = {
    getOneById,
};
