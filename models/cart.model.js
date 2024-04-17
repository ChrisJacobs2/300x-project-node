"use strict";
const db = require("../models/db-conn");
const path = require("path");

function getSelection() {
    let sql = "SELECT * FROM Products;";
    const data = db.all(sql);
    return data;
};

module.exports = {
    getSelection,
};