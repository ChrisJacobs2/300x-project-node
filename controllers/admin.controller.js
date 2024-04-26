"use strict";

const express = require("express");
const app = express();

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const model = require("../models/admin.model");

function renderAddProductPage(req, res) {
    res.render("admin"); // Renders the addProduct.ejs file
}

/* function adminCreateNew(req, res, next) {
    let productID = parseInt(req.body.productID);
    let productName = req.body.productName;
    let productDescription = req.body.productDescription;
    let productImageURL = req.body.productImageURL;
    let productPrice = parseFloat(req.body.productPrice);
    let categoryID = parseInt(req.body.categoryID);
    let featuredProduct = req.body.featuredProduct === 'true' || req.body.featuredProduct === true ? 1 : 0;
    if (productID && productName && productDescription && productImageURL && productPrice && categoryID && featuredProduct) {
        let params = [productID, productName, productDescription, productImageURL, productPrice, categoryID, featuredProduct];
        try {
            model.adminCreateNew(params);
            // res.redirect('/menu/all');
        } catch (err) {
            console.error("Error while creating menu ", err.message);
            next(err);
        }
    }
} */

async function adminCreateNew(req, res, next) {
    let productID = parseInt(req.body.productID);
    let productName = req.body.productName;
    let productDescription = req.body.productDescription;
    let productImageURL = req.body.productImageURL;
    let productPrice = parseFloat(req.body.productPrice);
    let categoryID = parseInt(req.body.categoryID);
    let featuredProduct = req.body.featuredProduct === 'true' || req.body.featuredProduct === true ? 1 : 0;
    if (productID && productName && productDescription && productImageURL && productPrice && categoryID && featuredProduct) {
        let params = [productID, productName, productDescription, productImageURL, productPrice, categoryID, featuredProduct];
        try {
            await model.adminCreateNew(params);
            //res.redirect('/menu/all');
        } catch (err) {
            console.error("Error while creating menu ", err.message);
            next(err);
        }
    }
}

module.exports = {
    renderAddProductPage,
    adminCreateNew,
};