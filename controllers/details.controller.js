"use strict";

const express = require("express");
const app = express();

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const model = require("../models/details.model");

async function getOneById(req, res, next) {
    let id = req.params.id;
    try {
        let product = await model.getOneById(id); // Await the result
        console.log("Product retrieved:", product); // Log the retrieved product
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.render("details", { product: product }); // Pass product as an object
    } catch (err) {
        console.error("Error while getting product details ", err.message);
        next(err);
    }
}

module.exports = {
    getOneById,
};