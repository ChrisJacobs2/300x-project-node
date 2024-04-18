"use strict";
const db = require("../models/db-conn");
const path = require("path");

async function getOneById(id) {
    let sql = "SELECT * FROM MENU WHERE id = ?;";
    const item = await db.get(sql, id);
    return item;
}

module.exports = {
    getOneById,
};