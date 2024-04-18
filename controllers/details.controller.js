"use strict";

const express = require("express");
const app = express();

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const model = require("../models/details.model");

async function getOneById(req, res) {
    try {
        const productId = req.params.id;
        const product = await productsModel.getOneById(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching product details:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    getOneById,
};
