"use strict";

const express = require("express");
const app = express();

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const model = require("../models/details.model");

/* async function getOneById(req, res) {
    try {
        const productId = req.params.id;
        const product = await detailsModel.getOneById(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.render("details", { product });
    } catch (error) {
        console.error("Error fetching product details:", error);
        res.status(500).json({ error: "Internal server error" });
    }
} */

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

