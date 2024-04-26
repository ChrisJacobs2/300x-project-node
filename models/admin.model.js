"use strict";
const db = require("../models/db-conn");
const path = require("path");

async function adminGetAllByProductID(productID) {
    let sql = "SELECT * FROM Products WHERE productID =?;";
    const data = await db.all(sql, productID);
    return data;
}

async function adminGetAllByCategory(categoryID) {
    let sql = "SELECT * FROM Products WHERE categoryID =? ORDER BY productName;";
    const data = await db.all(sql, category);
    return data;
};

async function adminCreateNew(params) {
    let sql =
        'INSERT INTO Products ("productID","productName","productDescription","productImageURL","productPrice","categoryID","featuredProduct") ' +
        "VALUES(?, ?, ?, ?, ?, ?, ?);";
    const item = await db.run(sql, params);
    return item;
};

module.exports = {
    adminGetAllByProductID,
    adminGetAllByCategory,
    adminCreateNew,
};