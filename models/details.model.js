"use strict";
const db = require("../models/db-conn");
const path = require("path");

function getOneById(id) {
    let sql = "SELECT * FROM MENU WHERE id =? ;";
    const item = db.get(sql, id);
    return item;
};