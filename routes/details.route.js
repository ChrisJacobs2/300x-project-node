"use strict";
const express = require("express");
const router = express.Router();
const detailsController = require("../controllers/details.controller");

router.get("/item/:id", detailsController.getOneById);

module.exports = router;