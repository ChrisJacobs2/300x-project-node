"use strict";
const express = require("express");
const router = express.Router();

const productscontroller = require("../controllers/details.controller");

router.get("/item/:id", detailscontroller.getOneById);

module.exports = router;